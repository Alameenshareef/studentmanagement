import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {  Shield, Save, X, Loader2, CheckCircle2, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { updateStaffPermissions } from "@/api/staff"

interface PermissionsFlat {
  studentCreate: boolean
  studentRead: boolean
  studentUpdate: boolean
  studentDelete: boolean
}

interface StaffType {
  _id: string
  name: string
  permissions?: PermissionsFlat
}

interface PermissionManagerProps {
  staff: StaffType
  onClose: () => void
  onSave?: () => void
}

const PERMISSION_KEYS = [
  { 
    key: "studentCreate", 
    label: "Create Students", 
    description: "Add new student records to the system",
    icon: Plus,
    color: "text-emerald-600 bg-emerald-50"
  },
  { 
    key: "studentRead", 
    label: "View Students", 
    description: "Access and view student information",
    icon: Eye,
    color: "text-blue-600 bg-blue-50"
  },
  { 
    key: "studentUpdate", 
    label: "Edit Students", 
    description: "Modify existing student records",
    icon: Edit,
    color: "text-amber-600 bg-amber-50"
  },
  { 
    key: "studentDelete", 
    label: "Delete Students", 
    description: "Remove student records from the system",
    icon: Trash2,
    color: "text-red-600 bg-red-50"
  },
] as const

export default function PermissionManager({ staff, onClose, onSave }: PermissionManagerProps) {
  if (!staff) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white border-slate-200 shadow-xl">
          <CardContent className="p-6 text-center">
            <p className="text-slate-500">No staff member selected</p>
          </CardContent>
        </Card>
      </div>
    )
  }
  const [permissions, setPermissions] = useState<PermissionsFlat>({
    studentCreate: false,
    studentRead: false,
    studentUpdate: false,
    studentDelete: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (staff?.permissions) {
      setPermissions(staff.permissions)
    }
  }, [staff])

  const handleChange = (key: keyof PermissionsFlat, checked: boolean) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await updateStaffPermissions(staff._id, permissions)
      toast.success("Permissions updated successfully")
      if (onSave) onSave()
      onClose()
    } catch (err: any) {
      const msg = err?.response?.data?.message || err.message || "Failed to update permissions"
      setError(msg)
       toast.error("Update failed", { description: msg })
    } finally {
      setLoading(false)
    }
  }

  const getActivePermissionsCount = () => {
    return Object.values(permissions).filter(Boolean).length
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white border-slate-200 shadow-xl">
        <CardContent className="p-5">
          {error && (
            <Alert variant="destructive" className="mb-5 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-5">
            {/* Permissions Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <h3 className="text-base font-semibold text-slate-800">Student Management Permissions</h3>
              </div>

              <div className="grid gap-3">
                {PERMISSION_KEYS.map(({ key, label, description, icon: Icon, color }) => (
                  <Card key={key} className={`border-2 transition-all duration-200 ${
                    permissions[key] 
                      ? 'border-indigo-200 bg-indigo-50/50 shadow-sm' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}>
                    <CardContent className="p-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <Checkbox
                              id={key}
                              checked={permissions[key]}
                              onCheckedChange={(checked) =>
                                handleChange(key, checked as boolean)
                              }
                              className="data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                            />
                            <Label 
                              htmlFor={key} 
                              className="text-sm font-semibold text-slate-800 cursor-pointer flex items-center gap-2"
                            >
                              {label}
                              {permissions[key] && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                              )}
                            </Label>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed ml-5">
                            {description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Summary Section */}
            <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-sm font-medium text-slate-700">Permission Summary</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PERMISSION_KEYS.map(({ key, label }) => (
                  permissions[key] && (
                    <Badge 
                      key={key} 
                      variant="secondary" 
                      className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs px-2 py-0.5"
                    >
                      {label}
                    </Badge>
                  )
                ))}
                {getActivePermissionsCount() === 0 && (
                  <span className="text-xs text-slate-500 italic">No permissions assigned</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-slate-200">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1 font-medium text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-colors"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading}
                onClick={handleSubmit}
                className="flex-1 font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Permissions
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}