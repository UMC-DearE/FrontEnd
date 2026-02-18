import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/http";
import { meQueryKey } from "@/hooks/queries/userKeys";
import { useAuthStore } from "@/stores/authStore";

export function useMeQuery() {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery({
    queryKey: meQueryKey,
    queryFn: getMe,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    enabled: authStatus === "authenticated",
    retry: false,
  });
}
