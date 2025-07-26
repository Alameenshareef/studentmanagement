import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Mail, Lock, UserPlus, Save, X, Loader2, Shield } from "lucide-react"
import { toast } from "sonner"
import { createStaff, updateStaff } from "@/api/staff"

type StaffType = {
  _id?: string
  name: string
  email: string
  password?: string
  role: string
}

interface StaffFormProps {
  staff?: any
  onClose: () => void
  onSave: () => void
}

export default function StaffForm({ staff, onClose, onSave }: StaffFormProps) {
  const [formData, setFormData] = useState<Omit<StaffType, "_id" | "role">>({
    name: "",
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || "",
        email: staff.email || "",
        password: "",
      })
    }
  }, [staff])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const staffData: StaffType = {
        ...formData,
        password: formData.password || "",
        role: "Staff",
      }

      if (staff) {
        if (!formData.password) {
          delete staffData.password
        }
        await updateStaff(staff._id!, staffData)
        toast.success("Staff updated successfully")
        onSave()
      } else {
        await createStaff({
          name: formData.name,
          email: formData.email,
          password: formData.password || "",
        })
        toast.success("Staff created successfully")
        onSave()
      }

      onClose()
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Operation failed"
      setError(msg)
       toast.error("Error", { description: msg })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white border-slate-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-lg border-b border-slate-200">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            {staff ? "Edit Staff Member" : "Add New Staff Member"}
          </CardTitle>
          <p className="text-slate-600 text-sm mt-1">
            {staff ? "Update staff member information below" : "Fill in the details to create a new staff member"}
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          {error && (
            <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter staff member's full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="border-slate-300 focus:border-purple-500 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="staff@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-slate-300 focus:border-purple-500 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-colors"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Security Information</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-slate-500" />
                  Password
                  {staff && (
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full ml-2">
                      (leave empty to keep current)
                    </span>
                  )}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={staff ? "••••••••" : "Enter a secure password"}
                  value={formData.password}
                  onChange={handleChange}
                  required={!staff}
                  className="border-slate-300 focus:border-purple-500 focus:ring-purple-500 bg-slate-50 focus:bg-white transition-colors"
                />
                {!staff && (
                  <p className="text-xs text-slate-500 mt-1">
                    Password should be at least 8 characters long with letters and numbers
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-slate-200">
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
                className="flex-1 font-medium bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    {staff ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Staff
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Create Staff
                      </>
                    )}
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