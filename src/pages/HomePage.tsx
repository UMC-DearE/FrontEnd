import { useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProfileCard from '@/components/home/ProfileCard';
import ConfirmModal from '@/components/common/ConfirmModal';
import LetterCard, { type Letter } from '@/components/home/LetterCard';
import AddLetterButton from '@/components/home/AddLetterButton';
import ProfileCustomSheet from '@/components/home/ProfileCustomSheet';
import StickerLayer, { type StickerItem } from '@/components/home/StickerLayer';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import { updateLetterPinned } from '@/api/letter';

const loadImageSize = (src: string) =>
  new Promise<{ w: number; h: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = reject;
    img.src = src;
  });

const fitToMaxSide = (w: number, h: number, maxSide: number) => {
  const m = Math.max(w, h);
  if (m <= maxSide) return { w, h };
  const r = maxSide / m;
  return { w: Math.round(w * r), h: Math.round(h * r) };
};

export default function HomePage() {
  const { homeBgColor, setHomeBgColor } = useOutletContext<AppLayoutContext>();

  const [letter] = useState<Letter | null>({
    id: 1,
    content:
      '책은 우리 안의 얼어붙은 바다를 깨부수는 도끼여야 한다. 우리가 책을 읽는 이유는 바로 그 때문이다.',
    month: 'Jan',
    day: 22,
    dayOfWeek: '월',
  });

  const [pinnedLetterId, setPinnedLetterId] = useState<number | null>(null);
  const [pendingUnpinId, setPendingUnpinId] = useState<number | null>(null);

  const [openSheet, setOpenSheet] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [savedStickers, setSavedStickers] = useState<StickerItem[]>([]);
  const [draftStickers, setDraftStickers] = useState<StickerItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const enabled = openSheet;
  const stickers = openSheet ? draftStickers : savedStickers;

  const handlePin = async (letterId: number) => {
    try {
      const pinned = await updateLetterPinned(letterId, true);
      setPinnedLetterId(pinned ? letterId : null);
    } catch {}
  };

  const handleRequestUnpin = (letterId: number) => setPendingUnpinId(letterId);
  const handleCancelUnpin = () => setPendingUnpinId(null);

  const handleConfirmUnpin = async () => {
    if (pendingUnpinId === null) return;

    try {
      const pinned = await updateLetterPinned(pendingUnpinId, false);
      setPinnedLetterId(pinned ? pendingUnpinId : null);
      setPendingUnpinId(null);
    } catch {}
  };

  const openEditor = () => {
    setDraftStickers(savedStickers);
    setSelectedId(null);
    setOpenSheet(true);
  };

  const addStickerFromFile = async (file: File) => {
    const url = URL.createObjectURL(file);
    const rect = containerRef.current?.getBoundingClientRect();

    const cx = rect ? rect.width / 2 : 196;
    const cy = rect ? rect.height / 2 : 320;

    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const { w, h } = await loadImageSize(url);
    const fitted = fitToMaxSide(w, h, 160);

    setDraftStickers((prev) => {
      const z = prev.length;
      const next: StickerItem = {
        id,
        src: url,
        x: cx,
        y: cy,
        z,
        rotation: 0,
        scale: 1,
        imageId: null,
        w: fitted.w,
        h: fitted.h,
      };
      return [...prev, next];
    });

    setSelectedId(id);
    setOpenSheet(true);
  };

  const onChangeStickers = (next: StickerItem[]) => {
    if (!openSheet) return;
    setDraftStickers(next);
  };

  const onDeleteSticker = (id: string) => {
    if (!openSheet) return;
    setDraftStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  return (
    <div ref={containerRef} style={{ backgroundColor: homeBgColor }}>
      <div className={openSheet ? 'relative z-100' : 'relative z-40'}>
        <StickerLayer
          enabled={enabled}
          containerRef={containerRef}
          stickers={stickers}
          selectedId={selectedId}
          onSelect={(id) => {
            if (!openSheet) return;
            setSelectedId(id);
          }}
          onDeselect={() => {
            if (!openSheet) return;
            setSelectedId(null);
          }}
          onChange={onChangeStickers}
          onDelete={onDeleteSticker}
        />
      </div>

      <ProfileCard
        nickname="키르"
        bio="안녕하세요 잘 부탁합니다 ദ്ദി^ᴗ ̫ ᴗ^₎"
        onClickSettings={openEditor}
      />

      <ProfileCustomSheet
        open={openSheet}
        bgColor={homeBgColor}
        onChangeBgColor={setHomeBgColor}
        onClose={() => {
          setOpenSheet(false);
          setSelectedId(null);
          setDraftStickers(savedStickers);
        }}
        onComplete={() => {
          setSavedStickers(draftStickers);
          setOpenSheet(false);
          setSelectedId(null);
        }}
        onPickStickerFile={(file) => {
          addStickerFromFile(file);
        }}
      />

      <LetterCard
        letter={letter}
        isPinned={letter?.id === pinnedLetterId}
        onPin={handlePin}
        onRequestUnpin={handleRequestUnpin}
      />

      <ConfirmModal
        open={pendingUnpinId !== null}
        title="편지 고정 해제"
        description="편지 고정을 해제할까요?"
        cancelText="취소"
        confirmText="해제"
        onCancel={handleCancelUnpin}
        onConfirm={handleConfirmUnpin}
      />

      <div className="absolute bottom-32 left-[282px]">
        <AddLetterButton />
      </div>
    </div>
  );
}
