import { useRef } from "react";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploadButton({ images, setImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const remain = 10 - images.length;
    setImages((prev) => [...prev, ...files.slice(0, remain)]);
  };

  return (
    <>
      <button
        onClick={() => inputRef.current?.click()}
        className="w-[120px] h-[32px] px-[7px] py-[5px] bg-[#555557] text-white rounded-lg text-xs font-medium"
      >
        이미지 업로드
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={handleChange}
      />
    </>
  );
}
