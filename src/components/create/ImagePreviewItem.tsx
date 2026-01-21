import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
      className="relative shrink-0 cursor-grab active:cursor-grabbing"
    >
      <img
        src={url}
        alt=""
        className="w-[70px] h-[70px] object-cover rounded-sm"
      />

      <button
        onClick={onDelete}
        className="absolute top-1 right-1 w-4 h-4 bg-[#6C6C6C] text-white rounded-full text-xs"
      >
        ×
      </button>
    </div>
  );
}

