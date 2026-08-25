import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFrom } from '@/api/from';
import type { From } from '@/types/from';
import { REPORT_QUERY_KEY } from '../queries/useReport';

export function useDeleteFrom() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (fromId: number) => {
      const res = await deleteFrom(fromId);

      if (!res.success) {
        throw new Error(res.message || '프롬 삭제에 실패했어요.');
      }

      return { res, fromId };
    },

    onSuccess: async ({ res, fromId }) => {
      if (!res.success) return;

      queryClient.setQueryData<From[]>(['froms'], (prev = []) =>
        prev.filter((f) => f.fromId !== fromId)
      );

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['froms'] }),
        queryClient.invalidateQueries({ queryKey: ['letters'] }),
        queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEY }),
      ]);
    },
  });
}
