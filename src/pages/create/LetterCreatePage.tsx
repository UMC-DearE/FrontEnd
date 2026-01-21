import { useState } from "react";
import AddTypeTabs from "@/components/create/AddModeTabs";
import ImageAddSection from "@/components/create/ImageAddSection";
import TextAddSection from "@/components/create/TextAddSection";
import { BottomButton } from "@/components/common/BottomButton";
import { useNavigate } from "react-router-dom";

export type AddMode = "IMAGE" | "TEXT";

export default function LetterCreatePage() {
  const [mode, setMode] = useState<AddMode>("IMAGE");
  const [images, setImages] = useState<File[]>([]);
  const [text, setText] = useState("");

  const isValid =
    mode === "IMAGE" ? images.length > 0 : text.trim().length > 0;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <AddTypeTabs mode={mode} onChange={setMode} />

      <div className="flex-1 mt-5">
        {mode === "IMAGE" ? (
          <ImageAddSection images={images} setImages={setImages} />
        ) : (
          <TextAddSection value={text} onChange={setText} />
        )}
      </div>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-1">
          <p className="text-sm text-[#9D9D9F] text-center mb-5 font-medium">편지는 한 번에 하나만 등록할 수 있어요</p>
          <BottomButton
            disabled={!isValid}
            onClick={() => {
              if (!isValid) return;
              navigate("/create/detail");
            }}
          >
            완료
          </BottomButton>
        </div>
    </div>
  );
}
