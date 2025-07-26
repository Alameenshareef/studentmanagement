import { useState, useEffect } from "react"
import StudentForm from "@/components/student/studentForm"
import StudentList from "@/components/student/studentList"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { getAllStudents, deleteStudent } from "@/api/student"
import { useNavigate } from "react-router-dom";
import RequireAuth from "@/components/auth/requireAuth"
import { useAuth } from "@/hooks/useAuth";
import { getStaff, getCurrentStaff } from "@/api/staff";

interface Student {
  _id: string
  name: string
  email: string
  phone: string
  grade: string
  age: number
  address: string
}

interface Permissions {
  studentCreate?: boolean;
  studentRead?: boolean;
  studentUpdate?: boolean;
  studentDelete?: boolean;
}

export default function Students() {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState<Permissions>({});
  const [permissionsLoaded, setPermissionsLoaded] = useState(false);

  const canCreate = user?.role === "SuperAdmin" || !!permissions.studentCreate;
  const canRead = user?.role === "SuperAdmin" || !!permissions.studentRead;
  const canUpdate = user?.role === "SuperAdmin" || !!permissions.studentUpdate;
  const canDelete = user?.role === "SuperAdmin" || !!permissions.studentDelete;
  const hasAnyStudentPermission = canCreate || canRead || canUpdate || canDelete;

  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPermissions() {
      if (!user) return;
      try {
        if (user.role === "SuperAdmin") {
          const res = await getStaff(user.id);
          setPermissions(res.data.permissions || {});
        } else {
          const res = await getCurrentStaff();
          setPermissions(res.data.data.permissions || {});
        }
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setPermissionsLoaded(true);
      }
    }
    fetchPermissions();
  }, [user]);

  useEffect(() => {
    if (permissionsLoaded && canRead) {
      fetchStudents();
    }
  }, [permissionsLoaded, canRead]);


  const fetchStudents = async () => {
    setLoading(true)
    try {
      const res = await getAllStudents()

      const mapped = res.data.map((s: any) => ({
        _id: s._id,
        name: s.name,
        grade: s.grade,
        age: s.age,
        email: s.contactInfo?.email || "",
        phone: s.contactInfo?.phone || "",
        address: s.contactInfo?.address || "",
      }))
      setStudents(mapped.reverse())
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    }

  }, [navigate]);

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  const handleFormSave = () => {
    fetchStudents()
    setIsFormOpen(false)
    setEditingStudent(null)
  }

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      await deleteStudent(id)
      fetchStudents()
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  if (!permissionsLoaded) {
    return <div className="p-6 text-center">Loading permissions...</div>;
  }


  if (!hasAnyStudentPermission) {
    return <div className="p-6 text-center text-red-500">Access denied. You do not have permission to view or manage students.</div>;
  }

  return (
    <RequireAuth>
      <div className="space-y-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          {canCreate && (
            <Dialog open={isFormOpen} onOpenChange={(open) => {
              setIsFormOpen(open)
              if (!open) setEditingStudent(null)
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>
                    {editingStudent ? "Edit Student" : "Add New Student"}
                  </DialogTitle>
                </DialogHeader>
                <StudentForm
                  student={editingStudent}
                  onClose={handleFormClose}
                  onSave={handleFormSave}
                />
              </DialogContent>
            </Dialog>
          )}
        </div>

        {canRead && (
          <StudentList
            students={students}
            loading={loading}
            onEdit={canUpdate ? handleEdit : undefined}
            onDelete={canDelete ? handleDelete : undefined}
            canUpdate={canUpdate}
            canDelete={canDelete}
          />
        )}
      </div>
    </RequireAuth>
  )
}