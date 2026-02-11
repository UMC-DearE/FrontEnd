// 폴더 목록 불러오기

import { useQuery } from "@tanstack/react-query";
import { getFolderList } from "@/api/folder";
import type { Folder } from "@/types/folder";

export function useFolderList() {
  return useQuery<Folder[]>({
    queryKey: ["folders"],
    queryFn: getFolderList,
  });
}
