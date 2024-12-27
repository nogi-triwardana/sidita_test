import { QueryFunctionContext } from "@tanstack/react-query";
import { queryKeys as attendanceQueryKeys } from "@/pages/attendances/hooks/query-keys";
import { queryKeys as worklogQueryKeys } from "@/pages/worklogs/hooks/query-keys";

export type TAattendanceDetailService = QueryFunctionContext<ReturnType<typeof attendanceQueryKeys["detail"]>>;

export type TAattendanceListService = QueryFunctionContext<ReturnType<typeof attendanceQueryKeys["lists"]>>;

export type TWorklogsListService = QueryFunctionContext<ReturnType<typeof worklogQueryKeys["lists"]>>;