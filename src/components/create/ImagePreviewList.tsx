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
import { useRef, useState } from "react";

import ImagePreviewItem from "./ImagePreviewItem";
import uploadImage from "@/assets/create/image-upload.svg";
import { ImageViewer } from "../common/ImageViewer";
import useToast from "@/hooks/useToast";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImagePreviewList({ images, setImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const toast = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 10,
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

    setImages((prev) => {
      const remain = 10 - prev.length;
      if (remain <= 0) {
        toast.show("이미지는 최대 10장까지 업로드할 수 있어요.");
        return prev;
      }

      const existingKeySet = new Set(
        prev.map((f) => `${f.name}_${f.size}_${f.lastModified}`)
      );

      const uniqueNewFiles: File[] = [];
      let hasDuplicate = false;

      for (const file of files) {
        const key = `${file.name}_${file.size}_${file.lastModified}`;
        if (existingKeySet.has(key)) {
          hasDuplicate = true;
          continue;
        }
        existingKeySet.add(key);
        uniqueNewFiles.push(file);
      }

      if (hasDuplicate) {
        toast.show("중복된 이미지입니다.");
      }

      if (uniqueNewFiles.length === 0) {
        return prev;
      }

      return [...prev, ...uniqueNewFiles.slice(0, remain)];
    });

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
          <div className="flex gap-2 mt-5 overflow-x-auto thin-scrollbar pb-1">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-[70px] h-[70px] border rounded-sm border-[#E6E7E9]
                         flex flex-col items-center justify-center
                         text-[#6C6C6C] shrink-0"
            >
              <img src={uploadImage} alt="upload" className="w-[25px] h-[19px] mb-2" />
              <div className="text-[11px] font-medium">
                {images.length > 0 ? (
                  <span className="text-[#FF7A00]">{images.length}</span>
                ) : (
                  <span>{images.length}</span>
                )}
                /10
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
                onPreview={() => setPreviewIndex(index)}
              />
            ))}

            {previewIndex !== null && (
              <ImageViewer
                images={images}
                initialIndex={previewIndex}
                onClose={() => setPreviewIndex(null)}
              />
            )}

          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}

