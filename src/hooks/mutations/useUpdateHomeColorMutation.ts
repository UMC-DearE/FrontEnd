import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HomeDataDto } from '@/api/home';
import { updateHomeColor } from '@/api/home';
import { homeQueryKey } from '@/hooks/queries/homeKeys';

export function useUpdateHomeColorMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomeColor,
    onSuccess: (newColor) => {
      queryClient.setQueryData<HomeDataDto>(homeQueryKey, (prev) => {
        if (!prev) return prev;
        return { ...prev, setting: { ...prev.setting, homeColor: newColor } };
      });
      queryClient.invalidateQueries({ queryKey: homeQueryKey });
    },
  });
}
