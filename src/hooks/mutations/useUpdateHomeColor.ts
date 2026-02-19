import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { HomeDataDto } from '@/api/home';
import { updateHomeColor } from '@/api/home';
import { homeQueryKey } from '@/hooks/queries/homeKeys';

export function useUpdateHomeColor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHomeColor,

    onMutate: async (newColor: string) => {
      await queryClient.cancelQueries({ queryKey: homeQueryKey });

      const previous = queryClient.getQueryData<HomeDataDto>(homeQueryKey);

      if (previous) {
        queryClient.setQueryData<HomeDataDto>(homeQueryKey, {
          ...previous,
          setting: { ...previous.setting, homeColor: newColor },
        });
      }

      return { previous };
    },

    onError: (_err, _newColor, context) => {
      if (context?.previous) {
        queryClient.setQueryData(homeQueryKey, context.previous);
      }
    },
  });
}

