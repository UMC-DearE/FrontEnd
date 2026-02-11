import { useQuery } from '@tanstack/react-query';
import { getHome } from '@/api/home';
import { homeQueryKey } from '@/hooks/queries/homeKeys';
import { useAuthStore } from '@/stores/authStore';

export function useHomeQuery() {
  const authStatus = useAuthStore((s) => s.authStatus);

  return useQuery({
    refetchOnMount: 'always',
    queryKey: homeQueryKey,
    queryFn: getHome,
    staleTime: 0,
    enabled: authStatus === 'authenticated' || authStatus === 'checking',
  });
}
