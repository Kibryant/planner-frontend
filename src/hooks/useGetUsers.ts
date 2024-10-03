import { useInfiniteQuery } from "@tanstack/react-query";
import { FIVE_MINUTES_IN_MS } from "@/constants/five-minutes-in-ms";
import { getUsers } from "@/functions/get-users";

export function useGetUsers(token: string) {
  const { isLoading, data, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["get-users"],
      queryFn: ({ pageParam }) =>
        getUsers({ page: pageParam, token, limit: 20 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.nextPage ? lastPage.nextPage : undefined,
      getPreviousPageParam: (firstPage) => firstPage.prevPage,
      staleTime: FIVE_MINUTES_IN_MS,
    });

  return {
    users: data?.pages.flatMap((page) => page.users) ?? [],
    totalUsers: data?.pages[0].totalUsers ?? 0,
    page: data?.pages[0].page ?? 0,
    limit: data?.pages[0].limit ?? 0,
    totalPages: data?.pages[0].totalPages ?? 0,
    nextPage: data?.pages[0].nextPage ?? null,
    prevPage: data?.pages[0].prevPage ?? null,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  };
}
