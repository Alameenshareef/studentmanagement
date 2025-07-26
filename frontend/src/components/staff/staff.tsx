import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import StaffList from "./staffList"
import StaffForm from "./staffForm"
import PermissionManager from "./permissionManager"
import { getAllStaff } from "@/api/staff"
import type { StaffType } from "@/lib/type"
import { toast } from "sonner"


export default function Staff() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isPermissionOpen, setIsPermissionOpen] = useState(false)
  const [editingStaff, setEditingStaff] = useState<StaffType | undefined>(undefined)
  const [managingPermissions, setManagingPermissions] = useState<StaffType | undefined>(undefined)
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStaff = async () => {
    setLoading(true)
    try {
      const res = await getAllStaff()
      setStaff(res.data.reverse())
    } catch (err: any) {
      throw new Error(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await import("@/api/staff").then(m => m.deleteStaff(id))
      setStaff((prev) => prev.filter((member: { _id: string }) => member._id !== id))
      fetchStaff()
    } catch (err: any) {
      toast(" Failed to delete staff")
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (staffMember: any) => {
    setIsFormOpen(true)
    setEditingStaff({ ...staffMember, _id: staffMember._id || "" })
  }

  const handleManagePermissions = (staffMember: any) => {
    setManagingPermissions({ ...staffMember, _id: staffMember._id || "" })
    setIsPermissionOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingStaff(undefined)
  }

  const handlePermissionClose = () => {
    setIsPermissionOpen(false)
    setManagingPermissions(undefined)
    fetchStaff()
  }

  const handleFormSaved = () => {
    fetchStaff()
    setIsFormOpen(false)
    setEditingStaff(undefined)
  }


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingStaff(undefined)
                setIsFormOpen(true)
              }}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingStaff ? "Edit Staff" : "Add New Staff"}
              </DialogTitle>
            </DialogHeader>
            <StaffForm staff={editingStaff} onClose={handleFormClose} onSave={handleFormSaved} />
          </DialogContent>
        </Dialog>
      </div>

      <StaffList
        staff={staff}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onManagePermissions={handleManagePermissions}
      />

      <Dialog open={isPermissionOpen} onOpenChange={setIsPermissionOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
          </DialogHeader>
          {managingPermissions && (
            <PermissionManager
              staff={{ ...managingPermissions, _id: managingPermissions?._id || "" }}
              onClose={handlePermissionClose}
              onSave={fetchStaff}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
