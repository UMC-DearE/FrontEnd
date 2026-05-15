import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import closebtn from "@/assets/create/closebtn.svg";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  file: File;
  onDelete: () => void;
  onPreview: (file: File) => void;
}

export default function ImagePreviewItem({
  id,
  file,
  onDelete,
  onPreview,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const [url, setUrl] = useState("");

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  if (!url) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onPreview(file)} 
      className="relative shrink-0 cursor-grab active:cursor-grabbing rounded-sm overflow-hidden"
    >
      <img src={url} alt="이미지 미리보기" className="w-[76px] h-[76px] object-cover" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="이미지 삭제"
        className="absolute top-1 right-1 w-[20px] h-[20px] bg-[#585A5F] flex items-center justify-center text-white rounded-full"
      >
        <img src={closebtn} alt="삭제" className="w-[9px] h-[9px]" />
      </button>
    </div>
  );
}

