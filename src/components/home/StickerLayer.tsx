import { useRef } from 'react';

export type StickerItem = {
  id: number;
  src: string;
  x: number;
  y: number;
  z: number;
  rotation: number;
  scale: number;
  imageId: number | null;
  w: number;
  h: number;
};

type Props = {
  enabled: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
  stickers: StickerItem[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onDeselect: () => void;
  onChange: (next: StickerItem[]) => void;
  onDelete: (id: number) => void;
  onCommit?: (id: number) => void;
};

type DragState =
  | {
      kind: 'move';
      id: number;
      pointerId: number;
      startPx: number;
      startPy: number;
      startX: number;
      startY: number;
    }
  | {
      kind: 'transform';
      id: number;
      pointerId: number;
      centerX: number;
      centerY: number;
      startAngle: number;
      startDistance: number;
      startRotation: number;
      startScale: number;
    }
  | null;

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

export default function StickerLayer({
  enabled,
  containerRef,
  stickers,
  selectedId,
  onSelect,
  onDeselect,
  onChange,
  onDelete,
  onCommit,
}: Props) {
  const dragRef = useRef<DragState>(null);

  const getLocalPoint = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const left = rect?.left ?? 0;
    const top = rect?.top ?? 0;
    return { x: clientX - left, y: clientY - top };
  };

  const bringToFront = (id: number) => {
    const maxZ = stickers.reduce((m, s) => Math.max(m, s.z), 0);
    onChange(stickers.map((s) => (s.id === id ? { ...s, z: maxZ + 1 } : s)));
  };

  const startMove = (e: React.PointerEvent<HTMLDivElement>, id: number) => {
    if (!enabled) return;
    e.stopPropagation();

    const p = getLocalPoint(e.clientX, e.clientY);
    const s = stickers.find((x) => x.id === id);
    if (!s) return;

    onSelect(id);
    bringToFront(id);

    dragRef.current = {
      kind: 'move',
      id,
      pointerId: e.pointerId,
      startPx: p.x,
      startPy: p.y,
      startX: s.x,
      startY: s.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const startTransform = (e: React.PointerEvent<HTMLButtonElement>, id: number) => {
    if (!enabled) return;
    e.stopPropagation();

    const s = stickers.find((x) => x.id === id);
    if (!s) return;

    const center = { x: s.x, y: s.y };
    const p = getLocalPoint(e.clientX, e.clientY);

    const dx = p.x - center.x;
    const dy = p.y - center.y;

    const startAngle = Math.atan2(dy, dx);
    const startDistance = Math.hypot(dx, dy);

    dragRef.current = {
      kind: 'transform',
      id,
      pointerId: e.pointerId,
      centerX: center.x,
      centerY: center.y,
      startAngle,
      startDistance: Math.max(1, startDistance),
      startRotation: s.rotation,
      startScale: s.scale,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;

    const d = dragRef.current;
    if (!d) return;

    const p = getLocalPoint(e.clientX, e.clientY);

    if (d.kind === 'move') {
      const nx = d.startX + (p.x - d.startPx);
      const ny = d.startY + (p.y - d.startPy);
      onChange(stickers.map((s) => (s.id === d.id ? { ...s, x: nx, y: ny } : s)));
      return;
    }

    const dx = p.x - d.centerX;
    const dy = p.y - d.centerY;

    const angle = Math.atan2(dy, dx);
    const dist = Math.hypot(dx, dy);

    const angleDiff = angle - d.startAngle;
    const rot = d.startRotation + (angleDiff * 180) / Math.PI;

    const scale = clamp(d.startScale * (dist / d.startDistance), 0.1, 10);

    onChange(
      stickers.map((s) => (s.id === d.id ? { ...s, rotation: clamp(rot, -360, 360), scale } : s))
    );
  };

  const endGesture = () => {
    dragRef.current = null;
  };

  return (
    <div
      className={`absolute inset-0 ${enabled ? 'pointer-events-auto' : 'pointer-events-none'}`}
      onPointerDown={(e) => {
        if (!enabled) return;
        e.stopPropagation();
        onDeselect();
      }}
      onPointerMove={(e) => {
        if (!enabled) return;
        e.stopPropagation();
        onPointerMove(e);
      }}
      onPointerUp={(e) => {
        if (!enabled) return;
        e.stopPropagation();
        endGesture();
        if (selectedId !== null) onCommit?.(selectedId);
      }}
      onPointerCancel={(e) => {
        if (!enabled) return;
        e.stopPropagation();
        endGesture();
        if (selectedId !== null) onCommit?.(selectedId);
      }}
    >
      {stickers
        .slice()
        .sort((a, b) => a.z - b.z)
        .map((s) => {
          const isSelected = s.id === selectedId;
          const showControls = enabled && isSelected;
          const w = s.w * s.scale;
          const h = s.h * s.scale;

          return (
            <div
              key={s.id}
              className={`absolute ${showControls ? 'ring-2 ring-[#FF5F2F]' : ''}`}
              style={{
                left: s.x,
                top: s.y,
                width: w,
                height: h,
                transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
                touchAction: 'none',
                zIndex: isSelected ? 60 : 30,
              }}
              onPointerDown={(e) => startMove(e, s.id)}
            >
              <img
                src={s.src}
                alt="sticker"
                draggable={false}
                className="w-full h-full object-contain block"
                style={{ userSelect: 'none', pointerEvents: 'none' }}
              />

              {showControls && (
                <>
                  <button
                    type="button"
                    className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-[#FF5F2F] text-white text-[14px] font-bold flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.25)] cursor-pointer pointer-events-auto"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => onDelete(s.id)}
                  >
                    ×
                  </button>

                  <button
                    type="button"
                    className="absolute -bottom-3 -right-3 w-7 h-7 rounded-full bg-white border-2 border-[#FF5F2F] text-[#FF5F2F] text-[12px] font-bold flex items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.25)] cursor-pointer pointer-events-auto"
                    onPointerDown={(e) => startTransform(e, s.id)}
                  >
                    ⤡
                  </button>
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}
