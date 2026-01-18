import TopSection from "@/components/header/TopSection";
import CancelButton from "@/components/common/header/CancelButton";
import LetterThumbnail from "@/components/common/header/LetterThumbnail";

export default function CreateDetailHeader() {
  return (
    <>
      <TopSection
        left={<CancelButton />}
        center={<h1 className="text-lg font-semibold">내용 확인</h1>}
        right={<LetterThumbnail />}
      />
    </>
  );
}