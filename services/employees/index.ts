import axiosInstance from "@/config/api";

export const employeesListService = async () => {
  const response = await axiosInstance.get('/employees');

  return response;
};

export const createEmployeeService = async (payload: any) => {
  const response = await axiosInstance.post('/employees', payload);

  return response;
};

export const deleteEmployeeService = async (id: number) => {
  const response = await axiosInstance.delete(`/employees/${id}`);

  return response;
};