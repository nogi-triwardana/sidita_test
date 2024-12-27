import { projectsListService } from "@/services";
import { useQuery } from "@tanstack/react-query"

export const useProjectList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: projectsListService,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    projectsData: data?.data?.data ?? [],
    projectsIsLoading: isLoading,
    projectsRefetch: refetch,
  }
}