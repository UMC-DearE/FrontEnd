// 편지 상세 - 폴더에 저장 - 폴더 선택 모달

import { useEffect, useState } from "react";
import type { MockFolder } from "@/mocks/mockFolder";
import { getMockFolders } from "@/mocks/mockFolder";

interface Props {
  open: boolean;
  onClose: () => void;
  onSelect: (folderId: number) => void;
}

export default function FolderSelect({ open, onClose, onSelect }: Props) {
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<MockFolder[]>([]);

  useEffect(() => {
    if (!open) return;
    let mounted = true;
    setLoading(true);

    getMockFolders()
      .then((list) => {
        if (mounted) setFolders(list);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center">
      <div className="relative w-[393px] min-h-screen flex items-center justify-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute inset-0 bg-[#B0B0B0]"
        />

        <div className="relative z-10 w-[300px] bg-white rounded-xl px-[21px] py-[20px] shadow-lg gap-[23px] flex flex-col">
          <p className="text-center text-base font-semibold text-primary">
            어떤 폴더에 저장할까요?
          </p>

          <div className="max-h-[48vh] overflow-auto gap-[10px] flex flex-col no-scrollbar">
            {!loading &&
              folders.map((f) => (
                <button
                  key={f.id}
                  className="w-full text-left h-[37px] bg-[#F4F5F6] px-4 rounded-lg text-sm font-medium text-[#555557]"
                  onClick={() => {
                    onSelect(f.id);
                    onClose();
                  }}
                >
                  {f.folderName}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
