// 편지 추가 - 분석 페이지 헤더

import TopSection from "@/components/header/TopSection";
import CancelButton from "@/components/common/header/CancelButton";
import LetterThumbnail from "@/components/common/header/LetterThumbnail";

export default function CreateDetailHeader() {
  return (
    <>
      <TopSection
        left={<CancelButton />}
        center={<div className="text-lg font-semibold">내용 확인</div>}
        right={<LetterThumbnail />}
      />
    </>
  );
}