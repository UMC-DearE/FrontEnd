import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLetterToFolder, removeLetterFromFolder } from "@/api/folder";
import useToast from "@/hooks/useToast";
import type { FolderLetterResponse } from "@/types/folder";

export function useLetterFolder(letterId: number) {
  const queryClient = useQueryClient();
  const toast = useToast();

  const addFolderMutation = useMutation<FolderLetterResponse, unknown, number>({
    mutationFn: (folderId: number) => addLetterToFolder(folderId, letterId),
    onSuccess: (res) => {
      if (!res.success) {
        toast.show(res.message || "폴더에 추가하지 못했어요.");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["letter", letterId] });
    },
    onError: () => {
      toast.show("폴더에 추가하지 못했어요.");
    },
  });

  const removeFolderMutation = useMutation<FolderLetterResponse, unknown, number>({
    mutationFn: (folderId: number) => removeLetterFromFolder(folderId, letterId),
    onSuccess: (res) => {
      if (!res.success) {
        toast.show(res.message || "폴더에서 삭제하지 못했어요.");
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["letter", letterId] });
    },
    onError: () => {
      toast.show("폴더에서 삭제하지 못했어요.");
    },
  });

  return { addFolderMutation, removeFolderMutation };
}
