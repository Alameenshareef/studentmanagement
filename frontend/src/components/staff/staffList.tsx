import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Settings, Mail } from "lucide-react"

type PermissionSet = {
  studentCreate: boolean
  studentRead: boolean
  studentUpdate: boolean
  studentDelete: boolean
}

interface Staff {
  _id: string | undefined
  name: string
  email: string
  role: string
  permissions?: {
    students: PermissionSet
  }
}

interface StaffListProps {
  staff: Staff[]
  loading: boolean
  onEdit: (staff: Staff) => void
  onDelete: (id: string) => void
  onManagePermissions: (staff: Staff) => void
}

export default function StaffList({
  staff = [],
  loading,
  onEdit,
  onDelete,
  onManagePermissions,
}: StaffListProps) {
  
  console.log('Staff data:', staff.length > 0 ? staff[0] : 'No staff data');
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
            <CardHeader className="pb-3">
              <div className="h-5 bg-slate-300 rounded-lg w-3/4"></div>
              <div className="h-4 bg-slate-300 rounded-md w-1/2 mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="h-4 bg-slate-300 rounded-md"></div>
                <div className="h-4 bg-slate-300 rounded-md w-2/3"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-slate-300 rounded-md w-16"></div>
                  <div className="h-8 bg-slate-300 rounded-md w-20"></div>
                  <div className="h-8 bg-slate-300 rounded-md w-12"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (staff.length === 0) {
    return (
      <div className="text-center mt-20">
        <p className="text-slate-500 text-lg font-medium">No staff members found</p>
        <p className="text-slate-400 text-sm mt-2">Add your first staff member to get started</p>
      </div>
    )
  }

  const getPermissionBadges = (member: any) => {
    const badges: string[] = []
    
    console.log('Member permissions:', member.permissions)
    
    let perms = null
    if (member.permissions?.students) {
      perms = member.permissions.students
    } else if (member.permissions) {
      perms = member.permissions
    }
    
    console.log('Parsed perms:', perms)
    
    if (perms?.studentCreate) badges.push("Create")
    if (perms?.studentRead) badges.push("Read")
    if (perms?.studentUpdate) badges.push("Edit")
    if (perms?.studentDelete) badges.push("Delete")
    
    console.log('Permission badges:', badges)
    return badges
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'teacher':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'staff':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPermissionBadgeColor = (perm: string) => {
    switch (perm.toLowerCase()) {
      case 'create':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
      case 'read':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
      case 'edit':
        return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
      case 'delete':
        return 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {staff.map((member: any) => {
        const permissionBadges = getPermissionBadges(member)

        return (
          <Card 
            key={member._id} 
            className="hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 bg-white border-slate-200 hover:border-slate-300 group"
          >
            <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
              <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
                {member.name}
              </CardTitle>
              <Badge 
                variant="secondary" 
                className={`w-fit text-xs font-semibold px-3 py-1 ${getRoleBadgeColor(member.role)}`}
              >
                {member.role.replace("_", " ").toUpperCase()}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4 mb-5">
                <div className="flex items-center text-sm text-slate-600 break-all">
                  <Mail className="w-4 h-4 mr-3 text-slate-500" />
                  <span className="font-medium">{member.email}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 mb-2">Student Permissions:</p>
                  <div className="flex flex-wrap gap-2">
                    {permissionBadges.length > 0 ? (
                      permissionBadges.map((perm) => (
                        <Badge 
                          key={perm} 
                          variant="outline" 
                          className={`text-xs font-medium px-2 py-1 transition-colors ${getPermissionBadgeColor(perm)}`}
                        >
                          {perm}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic bg-slate-50 px-3 py-1 rounded-full">
                        No permissions assigned
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(member)}
                  aria-label={`Edit ${member.name}`}
                  className="flex-1 font-medium text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onManagePermissions(member)}
                  aria-label={`Manage permissions for ${member.name}`}
                  className="flex-1 font-medium text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-1" />
                  Permissions
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(member._id)}
                  aria-label={`Delete ${member.name}`}
                  className="font-medium text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors px-3"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}