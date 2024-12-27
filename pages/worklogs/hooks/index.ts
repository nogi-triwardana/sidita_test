import { worklogsListService } from "@/services";
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "./query-keys";

export const useWorklogsList = (params: TParams) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.lists(params),
    queryFn: worklogsListService,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    worklogsData: data?.data?.data ?? [],
    worklogsIsLoading: isLoading,
    worklogsRefetch: refetch,
  }
}