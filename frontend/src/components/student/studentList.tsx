import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Mail, Phone, MapPin, GraduationCap } from "lucide-react"

interface Student {
  _id: string
  name: string
  email: string
  phone: string
  grade: string
  age: number
  address: string
}

interface StudentListProps {
  students: Student[]
  loading: boolean
  onEdit?: (student: Student) => void
  onDelete?: (id: string) => void
  canUpdate?: boolean
  canDelete?: boolean
}

export default function StudentList({ students = [], loading, onEdit, onDelete, canUpdate, canDelete }: StudentListProps) {
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
                <div className="h-4 bg-slate-300 rounded-md w-3/4"></div>
                <div className="flex gap-2 mt-4">
                  <div className="h-8 bg-slate-300 rounded-md w-16"></div>
                  <div className="h-8 bg-slate-300 rounded-md w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <Card className="bg-white border-slate-200">
        <CardContent className="text-center py-12">
          <div className="text-center">
            <p className="text-slate-500 text-lg font-medium">No students found</p>
            <p className="text-slate-400 text-sm mt-2">Add your first student to get started</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getGradeBadgeColor = (grade: string) => {
    const gradeNum = parseInt(grade)
    if (gradeNum <= 5) return 'bg-green-100 text-green-800 border-green-200'
    if (gradeNum <= 8) return 'bg-blue-100 text-blue-800 border-blue-200'
    if (gradeNum <= 10) return 'bg-purple-100 text-purple-800 border-purple-200'
    return 'bg-orange-100 text-orange-800 border-orange-200'
  }

  const getAgeCategory = (age: number) => {
    if (age <= 10) return 'Child'
    if (age <= 15) return 'Teen'
    if (age <= 18) return 'Youth'
    return 'Adult'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {students.map((student) => (
        <Card 
          key={student._id} 
          className="hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 bg-white border-slate-200 hover:border-slate-300 group"
        >
          <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
              {student.name}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge 
                variant="secondary" 
                className={`text-xs font-semibold px-3 py-1 ${getGradeBadgeColor(student.grade)}`}
              >
                <GraduationCap className="w-3 h-3 mr-1" />
                Grade {student.grade}
              </Badge>
              <Badge 
                variant="outline" 
                className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-700 border-slate-200"
              >
                {getAgeCategory(student.age)} • {student.age}y
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="space-y-3 mb-5">
              <div className="flex items-center text-sm text-slate-600 break-all">
                <Mail className="w-4 h-4 mr-3 text-slate-500 flex-shrink-0" />
                <span className="font-medium">{student.email}</span>
              </div>
              <div className="flex items-center text-sm text-slate-600">
                <Phone className="w-4 h-4 mr-3 text-slate-500 flex-shrink-0" />
                <span className="font-medium">{student.phone}</span>
              </div>
              <div className="flex items-start text-sm text-slate-600">
                <MapPin className="w-4 h-4 mr-3 text-slate-500 flex-shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{student.address}</span>
              </div>
            </div>
            {(canUpdate || canDelete) && (
              <div className="flex gap-2">
                {canUpdate && onEdit && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onEdit(student)}
                    className="flex-1 font-medium text-blue-600 border-blue-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                )}
                {canDelete && onDelete && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onDelete(student._id)}
                    className="font-medium text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors px-3"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}