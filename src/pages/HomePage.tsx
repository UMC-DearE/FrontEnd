import { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProfileCard from '@/components/home/ProfileCard';
import ConfirmModal from '@/components/common/ConfirmModal';
import LetterCard, { type Letter } from '@/components/home/LetterCard';
import AddLetterButton from '@/components/home/AddLetterButton';
import ProfileCustomSheet from '@/components/home/ProfileCustomSheet';
import StickerLayer, { type StickerItem } from '@/components/home/StickerLayer';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import { updateLetterPinned, getRandomLetter } from '@/api/letter';
import { uploadImage } from '@/api/image';
import { getHome, updateHomeColor } from '@/api/home';
import { createSticker, deleteSticker, updateSticker } from '@/api/sticker';

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

const getToday = () => {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'short' });
  const day = now.getDate();
  const dayOfWeek = now.toLocaleString('ko-KR', { weekday: 'short' });
  return { month, day, dayOfWeek };
};

const cloneStickers = (arr: StickerItem[]) => arr.map((s) => ({ ...s }));

export default function HomePage() {
  const { homeBgColor, setHomeBgColor } = useOutletContext<AppLayoutContext>();

  const [letter, setLetter] = useState<Letter | null>(null);
  const [pinnedLetterId, setPinnedLetterId] = useState<number | null>(null);
  const [pendingUnpinId, setPendingUnpinId] = useState<number | null>(null);

  const [openSheet, setOpenSheet] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [savedStickers, setSavedStickers] = useState<StickerItem[]>([]);
  const [draftStickers, setDraftStickers] = useState<StickerItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const enabled = openSheet;
  const stickers = openSheet ? draftStickers : savedStickers;

  useEffect(() => {
    let mounted = true;

    getHome()
      .then(async (home) => {
        if (!mounted) return;

        setHomeBgColor(home.setting.homeColor);

        const sized = await Promise.all(
          home.stickers.map(async (s) => {
            const size = await loadImageSize(s.imageUrl).catch(() => ({ w: 160, h: 160 }));
            const fitted = fitToMaxSide(size.w, size.h, 160);

            const item: StickerItem = {
              id: String(s.stickerId),
              src: s.imageUrl,
              x: s.posX,
              y: s.posY,
              z: s.posZ,
              rotation: s.rotation,
              scale: s.scale,
              imageId: s.imageId,
              w: fitted.w,
              h: fitted.h,
            };
            return item;
          })
        );

        setSavedStickers(sized);
        setDraftStickers(cloneStickers(sized));
      })
      .catch(() => {});

    getRandomLetter()
      .then((data) => {
        if (!mounted) return;

        const today = getToday();

        if (!data.hasLetter) {
          setLetter({
            id: 0,
            content: '',
            month: today.month,
            day: today.day,
            dayOfWeek: today.dayOfWeek,
          });
          setPinnedLetterId(null);
          return;
        }

        const next: Letter = {
          id: data.letterId,
          content: data.randomPhrase,
          month: today.month,
          day: today.day,
          dayOfWeek: today.dayOfWeek,
        };

        setLetter(next);
        setPinnedLetterId(data.isPinned ? data.letterId : null);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, [setHomeBgColor]);

  const handlePin = async (letterId: number) => {
    try {
      const pinned = await updateLetterPinned(letterId, true);
      setPinnedLetterId(pinned ? letterId : null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestUnpin = (letterId: number) => setPendingUnpinId(letterId);
  const handleCancelUnpin = () => setPendingUnpinId(null);

  const handleConfirmUnpin = async () => {
    if (pendingUnpinId === null) return;

    try {
      const pinned = await updateLetterPinned(pendingUnpinId, false);
      setPinnedLetterId(pinned ? pendingUnpinId : null);
      setPendingUnpinId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditor = () => {
    setDraftStickers(cloneStickers(savedStickers));
    setSelectedId(null);
    setOpenSheet(true);
  };

  const addStickerFromFile = async (file: File) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 196;
    const cy = rect ? rect.height / 2 : 320;

    const localUrl = URL.createObjectURL(file);

    const size = await loadImageSize(localUrl).catch(() => ({ w: 160, h: 160 }));
    const fitted = fitToMaxSide(size.w, size.h, 160);

    const uploaded = await uploadImage(file, 'sticker');

    const maxZ = draftStickers.reduce((m, s) => Math.max(m, s.z), 0);

    const body = {
      imageId: uploaded.imageId,
      posX: cx,
      posY: cy,
      posZ: maxZ + 1,
      rotation: 0,
      scale: 1,
    };

    const created = await createSticker(body);

    setDraftStickers((prev) => {
      const maxZ = prev.reduce((m, s) => Math.max(m, s.z), 0);

      const next: StickerItem = {
        id: String(created.stickerId),
        src: uploaded.url ?? localUrl,
        x: body.posX,
        y: body.posY,
        z: maxZ + 1,
        rotation: body.rotation,
        scale: body.scale,
        imageId: body.imageId,
        w: fitted.w,
        h: fitted.h,
      };

      return [...prev, next];
    });

    setSelectedId(String(created.stickerId));
    setOpenSheet(true);
  };

  const onChangeStickers = (next: StickerItem[]) => {
    if (!openSheet) return;
    setDraftStickers(next);
  };

  const onDeleteSticker = async (id: string) => {
    if (!openSheet) return;
    await deleteSticker(id);
    setDraftStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  const commitSticker = async (id: string) => {
    if (!openSheet) return;
    const s = draftStickers.find((x) => x.id === id);
    if (!s) return;

    await updateSticker(id, {
      posX: s.x,
      posY: s.y,
      posZ: s.z,
      rotation: s.rotation,
      scale: s.scale,
    });
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
          onCommit={(id) => {
            commitSticker(id);
          }}
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
          setDraftStickers(cloneStickers(savedStickers));
        }}
        onComplete={async () => {
          const saved = await updateHomeColor(homeBgColor);
          setHomeBgColor(saved);
          setOpenSheet(false);
          setSelectedId(null);
          setDraftStickers(cloneStickers(draftStickers));
        }}
        onPickStickerFile={async (file) => {
          try {
            await addStickerFromFile(file);
          } catch (e) {
            console.error(e);
          }
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
