import { apiKeyInstance } from "../lib/axios";
export const registerUser = async (formData: any) => {
    const res = await apiKeyInstance.post(`/auth/register`, formData);
    return res.data;
};

export const loginUser = async (formData: any) => {
    const res = await apiKeyInstance.post(`/auth/login`, formData);
    return res.data;
};