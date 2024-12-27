import axiosInstance from "@/config/api";
import { TAattendanceDetailService, TAattendanceListService } from "@/@types/services";

export const checkinService = async (payload: any) => {
  const response = await axiosInstance.post('/attendances/check-in', payload);

  return response;
};

export const permitService = async (payload: any) => {
  const response = await axiosInstance.post('/attendances/check-in', payload);

  return response;
};

export const checkoutService = async (payload: any) => {
  const id = payload?.id;
  const response = await axiosInstance.put(`/attendances/check-out/${id}`, payload);

  return response;
};

export const attendancesListService = async ({
  queryKey: [ , params]
}: TAattendanceListService) => {
  const response = await axiosInstance.get('/attendances', { params });

  return response;
};

export const attendanceDetailService = async ({ 
  queryKey: [ , params]
}: TAattendanceDetailService) => {
  const response = await axiosInstance.get('/attendances', {
    params
  });

  return response;
};

