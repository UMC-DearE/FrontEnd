import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useRef } from "react";

import ImagePreviewItem from "./ImagePreviewItem";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImagePreviewList({ images, setImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // drag-to-scroll state
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setImages((prev) => {
      const oldIndex = prev.findIndex(
        (_, i) => i.toString() === active.id
      );
      const newIndex = prev.findIndex(
        (_, i) => i.toString() === over.id
      );

      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleSelectImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const remain = 10 - images.length;

    if (remain <= 0) return;

    setImages((prev) => [...prev, ...files.slice(0, remain)]);
    e.target.value = ""; // 같은 파일 다시 선택 가능
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleSelectImages}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((_, i) => i.toString())}
          strategy={horizontalListSortingStrategy}
        >
          <div
            ref={containerRef}
            className="flex gap-2 mt-5 overflow-hidden"
            onPointerDown={(e) => {
              const el = containerRef.current;
              if (!el) return;
              isDownRef.current = true;
              startXRef.current = e.clientX;
              startScrollRef.current = el.scrollLeft;
              (e.target as Element).setPointerCapture?.(e.pointerId);
            }}
            onPointerMove={(e) => {
              const el = containerRef.current;
              if (!el) return;
              if (!isDownRef.current) return;
              const dx = e.clientX - startXRef.current;
              el.scrollLeft = startScrollRef.current - dx;
            }}
            onPointerUp={(e) => {
              isDownRef.current = false;
              try {
                (e.target as Element).releasePointerCapture?.(e.pointerId);
              } catch {}
            }}
            onPointerCancel={() => {
              isDownRef.current = false;
            }}
            onWheel={(e) => {
              const el = containerRef.current;
              if (!el) return;
              if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
              }
            }}
          >
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-[70px] h-[70px] border rounded-sm border-[#E6E7E9]
                         flex flex-col items-center justify-center
                         text-[#6C6C6C] shrink-0"
            >
              <div className="text-[11px] font-medium">
                {images.length}/10
              </div>
            </button>
            
            {images.map((file, index) => (
              <ImagePreviewItem
                key={index}
                id={index.toString()}
                file={file}
                onDelete={() =>
                  setImages((prev) =>
                    prev.filter((_, i) => i !== index)
                  )
                }
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}

