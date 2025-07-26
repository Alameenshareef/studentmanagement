import { bearerInstance } from "../lib/axios";

export const createStaff = (data: {
  name: string;
  email: string;
  password: string;
}) => bearerInstance.post("/staff", data);

export const updateStaff = (staffId: string, staffData: any) => bearerInstance.put(`/staff/${staffId}`, staffData);

export const deleteStaff = (staffId: string) => bearerInstance.delete(`/staff/${staffId}`);

export const getStaff = (staffId: string) => bearerInstance.get(`/staff/${staffId}`);

export const getAllStaff = () => bearerInstance.get("/staff");

export const updateStaffPermissions = (staffId: string, permissions: any) => bearerInstance.put(`/staff/permission/${staffId}`, permissions)

export const getCurrentStaff = () => bearerInstance.get(`/staff/current`);
