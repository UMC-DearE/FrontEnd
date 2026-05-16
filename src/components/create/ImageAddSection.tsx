import ImageUploadButton from "./ImageUploadButton.tsx";
import ImagePreviewList from "./ImagePreviewList";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageAddSection({ images, setImages }: Props) {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[254px] border-[2px] border-[#E7E8EB] rounded-xl p-6 flex flex-col items-center justify-center text-center mx-auto">
        <p className="text-[#A1A4AA] text-sm font-medium mb-4">
          편지는 한 번에 하나만 등록할 수 있어요
        </p>
        <ImageUploadButton images={images} setImages={setImages} />
      </div>
        <ImagePreviewList images={images} setImages={setImages} />
    </div>
  );
}
