import axiosInstance from "@/config/api";

export const projectsListService = async () => {
  const response = await axiosInstance.get('/projects');

  return response;
};

export const projectCreateService = async (payload: any) => {
  const response = await axiosInstance.post('/projects', payload);

  return response;
};

export const projectUpdateService = async ({ data, id }: any) => {
  const response = await axiosInstance.put(`/projects/${id}`, data);

  return response;
};

export const projectDeleteService = async (id?: number | null) => {
  const response = await axiosInstance.delete(`/projects/${id}`);

  return response;
};