// 편지함 페이지

import { useMemo, useState, useEffect } from 'react';
import FolderList from '@/components/letterBox/FolderList';
import FolderSettingSheet from '@/components/letterBox/FolderSettingSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import FolderModal from '@/components/letterBox/FolderModal';
import type { FolderType } from '@/types/folder';
import type { Letter } from '@/types/letter';
import ToolBar from '@/components/letterBox/ToolBar';
import LetterCard from '@/components/letterBox/LetterCard';

type FolderSelectId = 'all' | 'like' | number;
type ViewMode = '기본 보기' | '간편 보기' | '앨범 보기';

export default function LetterBox() {
  const [selectedFolderId, setSelectedFolderId] = useState<FolderSelectId>('all');
  const [selectedFromId, setSelectedFromId] = useState<number | 'all'>('all');

  const [viewMode, setViewMode] = useState<ViewMode>('기본 보기');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [settingFolderId, setSettingFolderId] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingFolderId, setEditingFolderId] = useState<number | null>(null);
  const [deleteTargetFolderId, setDeleteTargetFolderId] = useState<number | null>(null);

  const [customFolders, setCustomFolders] = useState<FolderType[]>([
    {
      id: 1,
      folderName: '디어리',
      imageUrl:
        'https://i.namu.wiki/i/PvBNqcPR79Eg_MFLuNBEjB49s9CHrFVwmqqpwIfNAKpanE3P26j1UZqTY7zFBNUWrbl0gNclaXfjttApncYfByJ8Pe0cePGYBPH3Q4LlneOvqbngueyTetaWRhQmqQEouKOcM_7U12C1JIwAeiJzKQ.svg',
    },
    {
      id: 2,
      folderName: '기본',
      imageUrl: undefined,
    },
  ]);

  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    const mock: Letter[] = [
      {
        id: 15,
        content: '오늘 생일 축하해줘서 정말 고마워!',
        isLiked: false,
        receiveAt: '2024-07-08',
        createdAt: '2026-01-16T12:27:03',
        fromId: 1065,
        fromName: '엄마',
        fromBgColor: '#FFFF00',
        fromFontColor: '#000000',
        folderId: 1,
      },
      {
        id: 27,
        content: '디어리 파이팅~!!',
        isLiked: true,
        receiveAt: '2026-01-21',
        createdAt: '2026-01-16T12:27:03',
        fromId: 574,
        fromName: '나룬',
        fromBgColor: '#F7F7F7',
        fromFontColor: '#000000',
        folderId: 1,
      },
      {
        id: 40,
        content: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
        isLiked: false,
        receiveAt: '2026-01-23',
        createdAt: '2026-01-16T12:27:03',
        fromId: 574,
        fromName: '나룬',
        fromBgColor: '#F7F7F7',
        fromFontColor: '#000000',
        folderId: 2,
      },
    ];
    setLetters(mock);
  }, []);

  const folderFilteredLetters = useMemo(() => {
    let result = letters;
    if (selectedFolderId === 'like') {
      result = result.filter((letter) => letter.isLiked);
    } else if (typeof selectedFolderId === 'number') {
      result = result.filter((letter) => letter.folderId === selectedFolderId);
    }
    return result;
  }, [letters, selectedFolderId]);

  const { froms, fromCounts } = useMemo(() => {
    const selectFroms = new Map<number, any>();
    const counts: Record<number, number> = {};

    folderFilteredLetters.forEach((letter) => {
      if (!selectFroms.has(letter.fromId)) {
        selectFroms.set(letter.fromId, {
          fromId: letter.fromId,
          name: letter.fromName,
          backgroundColor: letter.fromBgColor,
          textColor: letter.fromFontColor,
        });
      }
      counts[letter.fromId] = (counts[letter.fromId] || 0) + 1;
    });

    return { froms: Array.from(selectFroms.values()), fromCounts: counts };
  }, [folderFilteredLetters]);

  const finalFilteredLetters = useMemo(() => {
    if (selectedFromId === 'all') return folderFilteredLetters;
    return folderFilteredLetters.filter((letter) => letter.fromId === selectedFromId);
  }, [folderFilteredLetters, selectedFromId]);

  const folderTotalCount = folderFilteredLetters.length;
  const visibleCount = finalFilteredLetters.length;

  const handleConfirmUpsertFolder = (data: {
    folder_name: string;
    image_id: number | null;
    previewUrl: string | null;
  }) => {
    if (editingFolderId == null) {
      setCustomFolders((prev) => [
        ...prev,
        {
          id: Date.now(),
          folderName: data.folder_name,
          imageUrl: data.previewUrl || undefined,
        },
      ]);
    } else {
      setCustomFolders((prev) =>
        prev.map((f) =>
          f.id === editingFolderId
            ? { ...f, folderName: data.folder_name, imageUrl: data.previewUrl || undefined }
            : f
        )
      );
    }
    setIsModalOpen(false);
    setEditingFolderId(null);
  };

  return (
    <>
      <FolderList
        folders={customFolders}
        selectedId={selectedFolderId}
        onSelect={(id) => {
          setSelectedFolderId(id);
          setSelectedFromId('all');
        }}
        onFolderAdd={() => {
          setEditingFolderId(null);
          setIsModalOpen(true);
        }}
        onOpenFolderSetting={(id) => {
          setSettingFolderId(id);
          setIsSettingOpen(true);
        }}
      />

      {isModalOpen && (
        <FolderModal
          title={editingFolderId == null ? '새 폴더 만들기' : '폴더 수정'}
          initialName={customFolders.find((f) => f.id === editingFolderId)?.folderName ?? ''}
          initialImageUrl={customFolders.find((f) => f.id === editingFolderId)?.imageUrl ?? null}
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
          } else {
            setDeleteTargetFolderId(settingFolderId);
            setIsSettingOpen(false);
            setIsDeleteModalOpen(true);
          }
        }}
      />

      <ConfirmModal
        open={isDeleteModalOpen}
        title="폴더 삭제"
        titleClassName="text-[#FF1D0D]"
        description="폴더를 삭제할까요? 편지는 삭제되지 않아요"
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setCustomFolders((prev) => prev.filter((f) => f.id !== deleteTargetFolderId));
          if (selectedFolderId === deleteTargetFolderId) setSelectedFolderId('all');
          setIsDeleteModalOpen(false);
        }}
      />

      <div className="flex flex-col gap-[10px]">
        <ToolBar
          totalCount={visibleCount}
          folderTotalCount={folderTotalCount}
          froms={froms}
          fromCounts={fromCounts}
          selectedFromId={selectedFromId}
          onFromSelect={setSelectedFromId}
          view={viewMode}
          onViewChange={setViewMode}
        />

        {finalFilteredLetters.map((letter) => (
          <LetterCard
            key={letter.id}
            content={letter.content}
            isLiked={letter.isLiked}
            receiveAt={letter.receiveAt}
            fromName={letter.fromName}
            fromBgColor={letter.fromBgColor}
            fromFontColor={letter.fromFontColor}
            viewMode={viewMode}
          />
        ))}
      </div>
    </>
  );
}
