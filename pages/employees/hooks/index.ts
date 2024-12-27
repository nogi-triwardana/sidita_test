import { employeesListService } from "@/services";
import { useQuery } from "@tanstack/react-query"

export const useEmployeeList = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [],
    queryFn: employeesListService,
  });

  return {
    employeesData: data?.data?.data ?? [],
    employeesIsLoading: isLoading,
    employeesRefetch: refetch,
  }
}