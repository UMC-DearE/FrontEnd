import { useOutletContext } from 'react-router-dom';
import ProfileCard from '@/components/home/ProfileCard';
import ConfirmModal from '@/components/common/ConfirmModal';
import LetterCard, { type HomeCardLetter } from '@/components/home/LetterCard';
import AddLetterButton from '@/components/home/AddLetterButton';
import ProfileCustomSheet from '@/components/home/ProfileCustomSheet';
import StickerLayer, { type StickerItem } from '@/components/home/StickerLayer';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import { updateLetterPinned, getRandomLetter } from '@/api/letter';
import { uploadImage } from '@/api/upload';
import { updateHomeColor } from '@/api/home';
import { createSticker, updateSticker, deleteSticker } from '@/api/sticker';
import { useHomeQuery } from '@/hooks/queries/useHomeQuery';
import { useEffect, useRef, useState } from 'react';

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

const cloneStickers = (arr: StickerItem[]) => arr.map((s) => ({ ...s }));
const isTempStickerId = (id: string) => id.startsWith('tmp-');

export default function HomePage() {
  const { homeBgColor, setHomeBgColor } = useOutletContext<AppLayoutContext>();
  const { data: home, isLoading: homeLoading, isError: homeError } = useHomeQuery();

  const [letter, setLetter] = useState<HomeCardLetter | null>(null);
  const [pinnedLetterId, setPinnedLetterId] = useState<number | null>(null);
  const [pendingUnpinId, setPendingUnpinId] = useState<number | null>(null);

  const [openSheet, setOpenSheet] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [savedStickers, setSavedStickers] = useState<StickerItem[]>([]);
  const [draftStickers, setDraftStickers] = useState<StickerItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const enabled = openSheet;
  const stickers = openSheet ? draftStickers : savedStickers;

  const initialStickerIdsRef = useRef<string[]>([]);
  const initializedRef = useRef(false);

  type RandomLetterApiResponse = {
    success: boolean;
    code: string;
    message: string;
    data: {
      hasLetter: boolean;
      date: {
        fullDate: string;
        month: string;
        day: number;
        dayOfWeek: string;
      };
      letterId: number;
      randomPhrase: string;
      isPinned: boolean;
    };
  };

  useEffect(() => {
    let mounted = true;

    getRandomLetter()
      .then((response: RandomLetterApiResponse) => {
        if (!mounted) return;

        const data = response.data;

        if (!data.hasLetter) {
          setLetter({
            id: 0,
            excerpt: '',
            month: data.date.month,
            day: data.date.day,
            dayOfWeek: data.date.dayOfWeek,
          });
          setPinnedLetterId(null);
          return;
        }

        const next: HomeCardLetter = {
          id: data.letterId,
          excerpt: data.randomPhrase,
          month: data.date.month,
          day: data.date.day,
          dayOfWeek: data.date.dayOfWeek,
        };

        setLetter(next);
        setPinnedLetterId(data.isPinned ? data.letterId : null);
      })
      .catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!home || initializedRef.current) return;

    initializedRef.current = true;
    setHomeBgColor(home.setting.homeColor);

    let alive = true;

    Promise.all(
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
    )
      .then((sized) => {
        if (!alive) return;
        setSavedStickers(sized);
        setDraftStickers(cloneStickers(sized));
      })
      .catch(() => {});

    return () => {
      alive = false;
    };
  }, [home, setHomeBgColor]);

  const handlePin = async (letterId: number) => {
    try {
      await updateLetterPinned(letterId, true);
      setPinnedLetterId(letterId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestUnpin = (letterId: number) => setPendingUnpinId(letterId);
  const handleCancelUnpin = () => setPendingUnpinId(null);

  const handleConfirmUnpin = async () => {
    if (pendingUnpinId === null) return;

    try {
      await updateLetterPinned(pendingUnpinId, false);
      setPendingUnpinId(null);

      const response = (await getRandomLetter()) as RandomLetterApiResponse;
      const data = response.data;

      if (!data.hasLetter) {
        setLetter({
          id: 0,
          excerpt: '',
          month: data.date.month,
          day: data.date.day,
          dayOfWeek: data.date.dayOfWeek,
        });
        setPinnedLetterId(null);
        return;
      }

      const next: HomeCardLetter = {
        id: data.letterId,
        excerpt: data.randomPhrase,
        month: data.date.month,
        day: data.date.day,
        dayOfWeek: data.date.dayOfWeek,
      };

      setLetter(next);
      setPinnedLetterId(data.isPinned ? data.letterId : null);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditor = () => {
    initialStickerIdsRef.current = savedStickers.map((s) => s.id);
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

    const tempId = `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    setDraftStickers((prev) => {
      const maxZ = prev.reduce((m, s) => Math.max(m, s.z), 0);

      const next: StickerItem = {
        id: tempId,
        src: uploaded.data.url ?? localUrl,
        x: cx,
        y: cy,
        z: maxZ + 1,
        rotation: 0,
        scale: 1,
        imageId: uploaded.data.imageId ?? null,
        w: fitted.w,
        h: fitted.h,
      };

      return [...prev, next];
    });

    setSelectedId(tempId);
    setOpenSheet(true);
  };

  const onChangeStickers = (next: StickerItem[]) => {
    if (!openSheet) return;
    setDraftStickers(next);
  };

  const onDeleteSticker = async (id: string) => {
    if (!openSheet) return;
    setDraftStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));
  };

  const commitSticker = async (id: string) => {
    if (!openSheet) return;
    if (isTempStickerId(id)) return;
  };

  const persistStickersOnComplete = async (draft: StickerItem[]) => {
    const draftIds = new Set(draft.map((s) => s.id));
    const toDelete = initialStickerIdsRef.current.filter((id) => !draftIds.has(id));

    await Promise.all(toDelete.map((id) => deleteSticker(Number(id))));

    const existing = draft.filter((s) => !isTempStickerId(s.id));
    const temps = draft.filter((s) => isTempStickerId(s.id));

    await Promise.all(
      existing.map((s) =>
        updateSticker(s.id, {
          posX: s.x,
          posY: s.y,
          posZ: s.z,
          rotation: s.rotation,
          scale: s.scale,
        })
      )
    );

    const created = await Promise.all(
      temps.map(async (s) => {
        if (s.imageId === null) return null;

        const body = {
          imageId: s.imageId,
          posX: s.x,
          posY: s.y,
          posZ: s.z,
          rotation: s.rotation,
          scale: s.scale,
        };

        const res = await createSticker(body);

        const next: StickerItem = {
          ...s,
          id: String(res.stickerId),
        };

        return next;
      })
    );

    const merged = [...existing, ...created.filter((x): x is StickerItem => x !== null)];

    return merged;
  };

  if (homeLoading) return <div>로딩 중...</div>;
  if (homeError || !home) return <div>에러</div>;

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
        nickname={home.user.nickname}
        bio={home.user.intro}
        imgUrl={home.user.imgUrl}
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
          const snapshot = cloneStickers(draftStickers);

          setSavedStickers(snapshot);
          setDraftStickers(snapshot);
          setOpenSheet(false);
          setSelectedId(null);

          const [colorRes, stickerRes] = await Promise.allSettled([
            updateHomeColor(homeBgColor),
            persistStickersOnComplete(snapshot),
          ]);

          if (colorRes.status !== 'fulfilled') console.error(colorRes.reason);

          if (stickerRes.status === 'fulfilled') {
            const persisted = cloneStickers(stickerRes.value);
            setSavedStickers(persisted);
            setDraftStickers(persisted);
          } else {
            console.error(stickerRes.reason);
          }
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
