import { TWorklogsListService } from "@/@types/services";
import axiosInstance from "@/config/api";

export const worklogsListService = async ({
  queryKey: [ , params]
}: TWorklogsListService) => {
  const response = await axiosInstance.get('/worklogs', { params });

  return response;
};
