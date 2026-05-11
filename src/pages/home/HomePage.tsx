import { useMemo, useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import ProfileCard from '@/components/home/ProfileCard';
import ConfirmModal from '@/components/common/ConfirmModal';
import LetterCard, { type HomeCardLetter } from '@/components/home/LetterCard';
import AddLetterButton from '@/components/home/AddLetterButton';
import ProfileCustomSheet from '@/components/home/ProfileCustomSheet';
import CustomizingHeader from '@/components/header/CustomizingHeader';
import StickerLayer, { type StickerItem } from '@/components/home/StickerLayer';
import { uploadImage } from '@/api/upload';
import { useHomeQuery } from '@/hooks/queries/useHomeQuery';
import { useUpdateHomeColor } from '@/hooks/mutations/useUpdateHomeColor';
import { useRandomLetterQuery } from '@/hooks/queries/useRandomLetterQuery';
import { usePinLetter } from '@/hooks/mutations/usePinLetter';
import { useUnpinLetter } from '@/hooks/mutations/useUnpinLetter';
import { useCreateSticker } from '@/hooks/mutations/useCreateSticker';
import { useUpdateSticker } from '@/hooks/mutations/useUpdateSticker';
import { useDeleteSticker } from '@/hooks/mutations/useDeleteSticker';
import { useMyMembership } from '@/hooks/queries/useMyMembership';
import useToast from '@/hooks/useToast';
import closeIcon from '@/assets/homePage/closeIcon.svg';

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

export default function HomePage() {
  const { homeBgColor, setHomeBgColor } = useOutletContext<AppLayoutContext>();
  const { data: home, isLoading: homeLoading, isError: homeError } = useHomeQuery();
  const updateHomeColorMutation = useUpdateHomeColor();

  const { data: randomData, isLoading: randomLoading } = useRandomLetterQuery();
  const pinMutation = usePinLetter();
  const unpinMutation = useUnpinLetter();

  const createStickerMutation = useCreateSticker();
  const updateStickerMutation = useUpdateSticker();
  const deleteStickerMutation = useDeleteSticker();

  const letter: HomeCardLetter | null = useMemo(() => {
    if (!randomData) return null;

    if (!randomData.hasLetter) {
      return {
        id: 0,
        excerpt: '',
        month: randomData.date.month,
        day: randomData.date.day,
        dayOfWeek: randomData.date.dayOfWeek,
      };
    }

    return {
      id: randomData.letterId,
      excerpt: randomData.randomPhrase,
      month: randomData.date.month,
      day: randomData.date.day,
      dayOfWeek: randomData.date.dayOfWeek,
    };
  }, [randomData]);

  const pinnedLetterId = useMemo(() => {
    if (!randomData) return null;
    if (!randomData.hasLetter) return null;
    return randomData.isPinned ? randomData.letterId : null;
  }, [randomData]);

  const [pendingUnpinId, setPendingUnpinId] = useState<number | null>(null);

  const [openSheet, setOpenSheet] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmCloseOpen, setConfirmCloseOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const [draftStickers, setDraftStickers] = useState<StickerItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const enabled = openSheet && !pickerOpen;

  const [sizeMap, setSizeMap] = useState<Map<string, { w: number; h: number }>>(new Map());

  const baseStickers: StickerItem[] = useMemo(() => {
    if (!home) return [];

    return home.stickers.map((s) => {
      const wh = sizeMap.get(s.imageUrl) ?? { w: 160, h: 160 };

      return {
        id: s.stickerId,
        src: s.imageUrl,
        x: s.posX,
        y: s.posY,
        z: s.posZ,
        rotation: s.rotation,
        scale: s.scale,
        imageId: s.imageId,
        w: wh.w,
        h: wh.h,
      };
    });
  }, [home, sizeMap]);

  const stickers = openSheet ? draftStickers : baseStickers;

  useEffect(() => {
    if (!home) return;
    setHomeBgColor(home.setting.homeColor);
  }, [home, setHomeBgColor]);

  useEffect(() => {
    if (!home) return;

    let alive = true;
    const urls = Array.from(new Set(home.stickers.map((s) => s.imageUrl)));

    (async () => {
      const fetched: Array<[string, { w: number; h: number }]> = [];

      for (const url of urls) {
        const size = await loadImageSize(url).catch(() => ({ w: 160, h: 160 }));
        const fitted = fitToMaxSide(size.w, size.h, 160);
        fetched.push([url, fitted]);
      }

      if (!alive) return;

      setSizeMap((prev) => {
        const next = new Map(prev);
        let changed = false;

        for (const [url, wh] of fetched) {
          if (next.has(url)) continue;
          next.set(url, wh);
          changed = true;
        }

        return changed ? next : prev;
      });
    })();

    return () => {
      alive = false;
    };
  }, [home]);

  const handlePin = async (letterId: number) => {
    try {
      await pinMutation.mutateAsync(letterId);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRequestUnpin = (letterId: number) => setPendingUnpinId(letterId);
  const handleCancelUnpin = () => setPendingUnpinId(null);

  const handleConfirmUnpin = async () => {
    if (pendingUnpinId === null) return;

    try {
      await unpinMutation.mutateAsync(pendingUnpinId);
      setPendingUnpinId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const openEditor = () => {
    setDraftStickers(cloneStickers(baseStickers));
    setSelectedId(null);
    setOpenSheet(true);
    setPickerOpen(false);
  };

  const handleRequestClose = () => setConfirmCloseOpen(true);
  const handleCancelClose = () => setConfirmCloseOpen(false);
  const handleConfirmClose = () => {
    setConfirmCloseOpen(false);
    setOpenSheet(false);
    setSelectedId(null);
    setPickerOpen(false);
    setDraftStickers(cloneStickers(baseStickers));
  };

  const handleCompleteCustomizing = async () => {
    const snapshot = cloneStickers(draftStickers);

    setOpenSheet(false);
    setSelectedId(null);
    setPickerOpen(false);

    try {
      await updateHomeColorMutation.mutateAsync(homeBgColor);
    } catch (e) {
      console.error(e);
    }

    setDraftStickers(snapshot);
  };

  const { data: membership } = useMyMembership();
  const toast = useToast();

  const addStickerFromFile = async (file: File) => {
    if (!membership?.isPlus && draftStickers.length >= 3) {
      toast.show(
        '스티커는 최대 3개까지 추가할 수 있어요. PLUS 멤버십을 구독하면 무제한으로 사용할 수 있어요.'
      );
      return;
    }
    const rect = containerRef.current?.getBoundingClientRect();
    const cx = rect ? rect.width / 2 : 196;
    const cy = rect ? rect.height / 2 : 320;

    const localUrl = URL.createObjectURL(file);

    const size = await loadImageSize(localUrl).catch(() => ({ w: 160, h: 160 }));
    const fitted = fitToMaxSide(size.w, size.h, 160);

    const uploaded = await uploadImage(file, 'sticker');
    const src = uploaded.data.url ?? localUrl;
    const imageId = uploaded.data.imageId ?? null;

    const tempStickerId = -Date.now();
    const maxZ = draftStickers.reduce((m, s) => Math.max(m, s.z), 0) + 1;

    setDraftStickers((prev) => {
      const next: StickerItem = {
        id: tempStickerId,
        src,
        x: cx,
        y: cy,
        z: maxZ,
        rotation: 0,
        scale: 1,
        imageId,
        w: fitted.w,
        h: fitted.h,
      };

      return [...prev, next];
    });

    setSelectedId(tempStickerId);
    setOpenSheet(true);

    if (imageId === null) return;

    createStickerMutation.mutate(
      {
        request: {
          imageId,
          posX: cx,
          posY: cy,
          posZ: maxZ,
          rotation: 0,
          scale: 1,
        },
        imageUrl: src,
        clientStickerId: tempStickerId,
      },
      {
        onSuccess: (res) => {
          setDraftStickers((prev) =>
            prev.map((s) => (s.id === tempStickerId ? { ...s, id: res.stickerId } : s))
          );
          setSelectedId((cur) => (cur === tempStickerId ? res.stickerId : cur));
        },
        onError: () => {
          setDraftStickers((prev) => prev.filter((s) => s.id !== tempStickerId));
          setSelectedId((cur) => (cur === tempStickerId ? null : cur));
        },
      }
    );
  };

  const onChangeStickers = (next: StickerItem[]) => {
    if (!enabled) return;
    setDraftStickers(next);
  };

  const onDeleteSticker = (id: number) => {
    if (!enabled) return;

    setDraftStickers((prev) => prev.filter((s) => s.id !== id));
    setSelectedId((cur) => (cur === id ? null : cur));

    if (id > 0) deleteStickerMutation.mutate({ stickerId: id });
  };

  const onCommitSticker = (id: number) => {
    if (!enabled) return;
    if (id <= 0) return;

    const s = draftStickers.find((x) => x.id === id);
    if (!s) return;

    updateStickerMutation.mutate({
      stickerId: id,
      body: {
        posX: s.x,
        posY: s.y,
        posZ: s.z,
        rotation: s.rotation,
        scale: s.scale,
      },
    });
  };

  if (homeLoading || randomLoading) return <div>로딩 중...</div>;
  if (homeError || !home) return <div>에러</div>;

  return (
    <div ref={containerRef} style={{ backgroundColor: homeBgColor }}>
      {openSheet && (
        <div className="fixed top-0 left-0 right-0 z-[55] flex justify-center">
          <div className="w-full max-w-[440px]">
            <CustomizingHeader
              title="홈 편집"
              left={
                <button
                  type="button"
                  onClick={handleRequestClose}
                  className="flex items-center justify-center cursor-pointer"
                >
                  <img src={closeIcon} alt="닫기" className="h-6 w-6" />
                </button>
              }
              right={
                <button
                  type="button"
                  onClick={handleCompleteCustomizing}
                  className="flex h-[29px] w-[49px] items-center justify-center rounded-[6px] bg-[#FF5F2F] px-[12px] py-[6px] cursor-pointer"
                >
                  <p className="text-white font-semibold text-[14px] leading-none">완료</p>
                </button>
              }
            />
          </div>
        </div>
      )}

      <div className={openSheet ? 'relative' : 'relative z-40'}>
        <StickerLayer
          enabled={enabled}
          containerRef={containerRef}
          stickers={stickers}
          selectedId={selectedId}
          onSelect={(id) => {
            if (!enabled) return;
            setSelectedId(id);
          }}
          onDeselect={() => {
            if (!enabled) return;
            setSelectedId(null);
          }}
          onChange={onChangeStickers}
          onDelete={onDeleteSticker}
          onCommit={onCommitSticker}
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
        onPickerStateChange={setPickerOpen}
        onDeselectSticker={() => setSelectedId(null)}
        onClose={() => {
          setOpenSheet(false);
          setSelectedId(null);
          setPickerOpen(false);
          setDraftStickers(cloneStickers(baseStickers));
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

      <ConfirmModal
        open={confirmCloseOpen}
        title="저장하지 않고 나갈까요?"
        description="변경한 내용이 저장되지 않아요"
        cancelText="나가기"
        confirmText="계속 편집"
        onCancel={handleCancelClose}
        onConfirm={handleConfirmClose}
      />

      {!openSheet && (
        <div className="absolute bottom-[127px] right-4">
          <AddLetterButton />
        </div>
      )}
    </div>
  );
}
