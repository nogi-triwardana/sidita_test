import { attendancesListService } from "@/services";
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys";

export const useAttendancesList = (params: TParams, enabled?: boolean | undefined) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.lists(params),
    queryFn: attendancesListService,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled
  });

  return {
    attendancesData: data?.data?.data ?? [],
    attendancesIsLoading: isLoading,
    attendancesRefetch: refetch,
  }
};

export const useAttendanceDetail = (params: TParams, enabled?: boolean | undefined) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.lists(params),
    queryFn: attendancesListService,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: enabled,
  });

  return {
    attendanceDetailData: data?.data?.data ?? null,
    attendanceDetailIsLoading: isLoading,
    attendanceDetailRefetch: refetch,
  }
};