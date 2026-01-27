import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import closebtn from "@/assets/create/closebtn.svg";

interface Props {
  id: string;
  file: File;
  onDelete: () => void;
}

export default function ImagePreviewItem({
  id,
  file,
  onDelete,
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

  const url = URL.createObjectURL(file);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative shrink-0 cursor-grab active:cursor-grabbing rounded-sm overflow-hidden"
    >
      <img src={url} alt="이미지 미리보기" className="w-[70px] h-[70px] object-cover" />

      <button
        onClick={onDelete}
        aria-label="이미지 삭제"
        className="absolute top-1 right-1 w-4 h-4 bg-black/60 flex items-center justify-center text-white rounded-full"
      >
        <img src={closebtn} alt="삭제" className="w-2 h-2" />
      </button>
    </div>
  );
}

