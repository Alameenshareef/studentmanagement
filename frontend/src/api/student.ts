import { bearerInstance } from "../lib/axios";

export const createStudent = (data: any) => bearerInstance.post("/students", data);
export const updateStudent = (studentId: string, data: any) => bearerInstance.put(`/students/${studentId}`, data);
export const deleteStudent = (studentId: string) => bearerInstance.delete(`/students/${studentId}`);
export const getStudent = (studentId: string) => bearerInstance.get(`/students/${studentId}`);
export const getAllStudents = () => bearerInstance.get("/students"); 