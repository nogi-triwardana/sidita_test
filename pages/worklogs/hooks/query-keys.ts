// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const queryKeys = {
  all: ['worklogs'] as const,
  lists: (filter: TParams | null) => [...queryKeys.all, filter] as const,
  details: () => [...queryKeys.all, 'detail'] as const,
  detail: (filter: TParams | undefined) => [...queryKeys.details(), filter] as const,
};