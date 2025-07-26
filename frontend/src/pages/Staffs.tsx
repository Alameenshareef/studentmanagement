import { useState, useEffect } from "react";
import Staff from "@/components/staff/staff";
import { useAuth } from "@/hooks/useAuth";

export default function Staffs() {
    const { user } = useAuth();
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        if (user !== undefined) {
            setUserLoading(false);
        }
    }, [user]);

    if (userLoading) {
        return <div className="p-6 text-center">Loading...</div>;
    }

    if (user?.role !== "SuperAdmin") {
        return (
            <div className="p-6 text-center text-red-500">
                Access denied. Only SuperAdmin can view staff list.
            </div>
        );
    }

    return (
        <div>
            <Staff />
        </div>
    );
}
