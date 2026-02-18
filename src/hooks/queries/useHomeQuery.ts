import { useQuery } from '@tanstack/react-query';
import { getHome } from '@/api/home';
import { homeQueryKey } from '@/hooks/queries/homeKeys';
import { useAuthStore } from '@/stores/authStore';

export function useHomeQuery() {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery({
    queryKey: homeQueryKey,
    queryFn: getHome,
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
    enabled: authStatus === 'authenticated',
  });
}
