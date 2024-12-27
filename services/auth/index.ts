import axiosInstance from "@/config/api";

export const registerService = async (payload: any) => {
  const res = await axiosInstance.post('/auth/register', payload);

  return res;
}

export const loginService = async (payload: any) => {
  const res = await axiosInstance.post('/auth/login', payload);

  return res;
}