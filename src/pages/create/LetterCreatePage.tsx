import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddTypeTabs from "@/components/create/AddModeTabs";
import ImageAddSection from "@/components/create/ImageAddSection";
import TextAddSection from "@/components/create/TextAddSection";
import LoadingSection from "@/components/create/loading/LoadingSection";
import { BottomButton } from "@/components/common/BottomButton";

import { postAnalyzeLetter, runOcr } from "@/api/create";
import { uploadImage } from "@/api/upload";
import type { AddMode } from "@/types/create";
import useToast from "@/hooks/useToast";

export default function LetterCreatePage() {
  const [mode, setMode] = useState<AddMode>("IMAGE");
  const [images, setImages] = useState<File[]>([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const isValid =
    mode === "IMAGE" ? images.length > 0 : text.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsLoading(true);

    try {
      let finalContent = text;
      let uploadedImageUrls: string[] | undefined;
      let uploadedImageIds: number[] | undefined;

      if (mode === "TEXT") {
      finalContent = text;
      }

      if (mode === "IMAGE") {
        // 1. 이미지 업로드
        const uploadResults = await Promise.all(
          images.map((file) => uploadImage(file, "letter"))
        );
        uploadedImageUrls = uploadResults.map((res) => res.data.url);
        uploadedImageIds = Array.from(
          new Set(uploadResults.map((res) => res.data.imageId))
        );

        // 2. OCR -> text 변환
        const ocrResponse = await runOcr(uploadedImageIds);
        if (!ocrResponse.success) {
          throw new Error(ocrResponse.message || "OCR 실패");
        }
        finalContent = ocrResponse.data.combinedText || "";
      }

      // 3. AI 분석
      const analyzeResponse = await postAnalyzeLetter({ content: finalContent });
      const aiResult = analyzeResponse;

      // 4. 내용 분석 페이지로 이동 (이미지 모드일 경우 업로드된 File 배열을 함께 전달(서버 책임 줄어듦) 혹은 s3에 업로드 된 URL 전달 받아서 띄워도 됨)
      navigate("/create/detail", {
        state: {
          content: finalContent,
          aiResult,
          images: mode === "IMAGE" ? images : undefined,
          imageUrls: uploadedImageUrls,
          imageIds: uploadedImageIds,
        },
      });
    } catch (e) {
      toast.show("이미지 업로드/OCR/AI 분석 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isLoading ? (
        <LoadingSection />
      ) : (
        <>
          <AddTypeTabs mode={mode} onChange={setMode} />

          <div className="flex-1 mt-5">
            {mode === "IMAGE" ? (
              <ImageAddSection
                images={images}
                setImages={setImages}
              />
            ) : (
              <TextAddSection
                value={text}
                onChange={setText}
              />
            )}
          </div>

          <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-1">
            {mode === "TEXT" && (
              <p className="text-sm text-[#9D9D9F] text-center mb-5 font-medium">
                편지는 한 번에 하나만 등록할 수 있어요
              </p>
            )}

            <BottomButton
              disabled={!isValid}
              onClick={handleSubmit}
            >
              완료
            </BottomButton>
          </div>
        </>
      )}
    </div>
  );
}

