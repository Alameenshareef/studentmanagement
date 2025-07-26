import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, UserCog } from "lucide-react"

interface DashboardStatsProps {
    studentCount: number
    staffCount: number
    userRole: string
}

export default function DashboardStats({ studentCount, staffCount, userRole }: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="transition-all duration-300 hover:shadow-lg border border-blue-100 bg-gradient-to-br from-blue-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                    <CardTitle className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                        Your Role
                    </CardTitle>
                    <div className="p-2 rounded-full bg-blue-100">
                        <UserCog className="w-5 h-5 text-blue-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-blue-900 capitalize">
                        {userRole.replace("_", " ")}
                    </div>
                    <p className="text-xs text-blue-500 mt-1">Current access level</p>
                </CardContent>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg border border-green-100 bg-gradient-to-br from-green-50 to-white">
                <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                    <CardTitle className="text-sm font-semibold text-green-800 uppercase tracking-wide">
                        Total Students
                    </CardTitle>
                    <div className="p-2 rounded-full bg-green-100">
                        <Users className="w-5 h-5 text-green-600" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-green-900">
                        {studentCount.toLocaleString()}
                    </div>
                    <p className="text-xs text-green-500 mt-1">Active student records</p>
                </CardContent>
            </Card>

            {userRole === "SuperAdmin" && (
                <Card className="transition-all duration-300 hover:shadow-lg border border-purple-100 bg-gradient-to-br from-purple-50 to-white">
                    <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
                        <CardTitle className="text-sm font-semibold text-purple-800 uppercase tracking-wide">
                            Total Staff
                        </CardTitle>
                        <div className="p-2 rounded-full bg-purple-100">
                            <UserCheck className="w-5 h-5 text-purple-600" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-purple-900">
                            {staffCount.toLocaleString()}
                        </div>
                        <p className="text-xs text-purple-500 mt-1">Active staff members</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}