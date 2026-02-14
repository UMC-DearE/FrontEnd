import { useRef } from "react";
import useToast from "@/hooks/useToast";

interface Props {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageUploadButton({ setImages }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // 같은 파일 다시 선택할 수 있도록 input 초기화
    e.target.value = "";
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
