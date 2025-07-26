import instance from "../lib/axios";
export const registerUser = async (formData: any) => {
  const res = await instance.post(`/auth/register`, formData);
  return res.data;
};

export const loginUser = async (formData: any) => {
  const res = await instance.post(`/auth/login`, formData);
  return res.data;
};