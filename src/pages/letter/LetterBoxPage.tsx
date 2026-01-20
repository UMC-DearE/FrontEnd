// 편지함 페이지

import { useMemo, useState } from 'react';
import FolderList from '@/components/letterBox/FolderList';
import FolderSettingSheet from '@/components/letterBox/FolderSettingSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import type { FolderType } from '@/components/letterBox/FolderList';
import FolderModal from '@/components/letterBox/FolderModal';

export default function LetterBox() {
  const [selectedFolderId, setSelectedFolderId] = useState<number | string>('all');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingFolderId, setSettingFolderId] = useState<number | string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editingFolderId, setEditingFolderId] = useState<number | string | null>(null);

  const [customFolders, setCustomFolders] = useState<FolderType[]>([
    {
      id: 1,
      name: '디어리',
      imgUrl:
        'https://i.namu.wiki/i/PvBNqcPR79Eg_MFLuNBEjB49s9CHrFVwmqqpwIfNAKpanE3P26j1UZqTY7zFBNUWrbl0gNclaXfjttApncYfByJ8Pe0cePGYBPH3Q4LlneOvqbngueyTetaWRhQmqQEouKOcM_7U12C1JIwAeiJzKQ.svg',
    },
  ]);

  const editingFolder = useMemo(() => {
    if (editingFolderId == null) return null;
    return customFolders.find((f) => f.id === editingFolderId) ?? null;
  }, [customFolders, editingFolderId]);

  const handleOpenAddModal = () => {
    setEditingFolderId(null);
    setIsModalOpen(true);
  };

  const handleConfirmUpsertFolder = (data: { name: string; image: File | null }) => {
    if (editingFolderId == null) {
      const newId = Date.now();
      const newImgUrl = data.image ? URL.createObjectURL(data.image) : '';

      setCustomFolders((prev) => [...prev, { id: newId, name: data.name, imgUrl: newImgUrl }]);

      setIsModalOpen(false);
      return;
    }

    setCustomFolders((prev) =>
      prev.map((f) => {
        if (f.id !== editingFolderId) return f;

        const nextImgUrl = data.image ? URL.createObjectURL(data.image) : f.imgUrl;

        return {
          ...f,
          name: data.name,
          imgUrl: nextImgUrl,
        };
      })
    );

    setIsModalOpen(false);
    setEditingFolderId(null);
  };

  const handleConfirmDeleteFolder = () => {
    if (settingFolderId == null) return;

    setCustomFolders((prev) => prev.filter((f) => f.id !== settingFolderId));

    if (selectedFolderId === settingFolderId) setSelectedFolderId('all');

    setIsDeleteModalOpen(false);
    setSettingFolderId(null);
  };

  return (
    <>
      <FolderList
        folders={customFolders}
        selectedId={selectedFolderId}
        onSelect={setSelectedFolderId}
        onFolderAdd={handleOpenAddModal}
        onOpenFolderSetting={(folderId) => {
          setSettingFolderId(folderId);
          setIsSettingOpen(true);
        }}
      />

      {isModalOpen && (
        <FolderModal
          title={editingFolderId == null ? '새 폴더 만들기' : '폴더 수정'}
          initialName={editingFolder?.name ?? ''}
          initialImageUrl={editingFolder?.imgUrl ?? null}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingFolderId(null);
          }}
          onConfirm={handleConfirmUpsertFolder}
        />
      )}

      <FolderSettingSheet
        open={isSettingOpen}
        onClose={() => setIsSettingOpen(false)}
        onSelect={(type) => {
          if (settingFolderId == null) return;

          if (type === 'editFolder') {
            setIsSettingOpen(false);
            setEditingFolderId(settingFolderId);
            setIsModalOpen(true);
            return;
          }

          setIsSettingOpen(false);
          setIsDeleteModalOpen(true);
        }}
      />

      <ConfirmModal
        open={isDeleteModalOpen}
        title="폴더 삭제"
        description="폴더를 삭제할까요? 편지는 삭제되지 않아요"
        cancelText="취소"
        confirmText="삭제"
        titleClassName="text-[#FF1D0D]"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteFolder}
      />
    </>
  );
}
