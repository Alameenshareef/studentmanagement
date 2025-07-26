import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Phone, GraduationCap, Calendar, MapPin, Save, X, Loader2 } from "lucide-react"
import { createStudent, updateStudent } from "@/api/student"

interface StudentFormProps {
  student?: any
  onClose: () => void
  onSave?: () => void
}

export default function StudentForm({ student, onClose, onSave }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    age: "",
    address: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        phone: student.phone || "",
        grade: student.grade || "",
        age: student.age?.toString() || "",
        address: student.address || "",
      })
    }
  }, [student])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const studentData = {
        name: formData.name,
        grade: formData.grade,
        age: Number.parseInt(formData.age),
        contactInfo: {
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      }
      if (student && student._id) {
        await updateStudent(student._id, studentData)
        if (onSave) onSave()
      } else {
         await createStudent(studentData)
        if (onSave) onSave()
      }
      onClose()
    } catch (err: any) {
      setError(err.message || "Operation failed")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white border-slate-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b border-slate-200">
          <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            {student ? "Edit Student" : "Add New Student"}
          </CardTitle>
          <p className="text-slate-600 text-sm mt-1">
            {student ? "Update student information below" : "Fill in the details to create a new student record"}
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
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-500" />
                  Full Name
                </Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="Enter student's full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                    Grade
                  </Label>
                  <Input 
                    id="grade" 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange} 
                    required 
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                    placeholder="e.g., 10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-500" />
                    Age
                  </Label>
                  <Input 
                    id="age" 
                    name="age" 
                    type="number" 
                    value={formData.age} 
                    onChange={handleChange} 
                    required 
                    className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                    placeholder="Enter age"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
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
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="student@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-500" />
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  Address
                </Label>
                <Input 
                  id="address" 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  required 
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500 bg-slate-50 focus:bg-white transition-colors"
                  placeholder="Enter full address"
                />
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
                className="flex-1 font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {student ? "Update Student" : "Create Student"}
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