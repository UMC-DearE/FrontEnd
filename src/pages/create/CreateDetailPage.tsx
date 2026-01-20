import { useState } from "react";
import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/common/Button";
import { EmotionTag } from "@/components/common/EmotionTag";
import { FromBadge } from "@/components/common/FromBadge";
import { PremiumBadge } from "@/components/common/PremiumBadge";

export default function CreateDetailPage() {
  const [keyword, setKeyword] = useState("");

  const isDisabled = keyword.trim().length === 0;

  const onConfirm = () => {
    console.log("확인");
  };

  return (
    <div className="flex flex-col gap-4">
      <InputField
        value={keyword}
        onChange={setKeyword}
        placeholder="편지 내용 검색"
        rightElement={
          keyword ? (
            <button
              type="button"
              onClick={() => setKeyword("")}
              className="text-[13px] font-medium text-[#9D9D9F]"
            >
              취소
            </button>
          ) : null
        }
      />

      <Button
        disabled={isDisabled}
        onClick={onConfirm}
      >
        텍스트
      </Button>

      <div className="flex flex-col items-start gap-3">
        <EmotionTag label="고마움" emotion="gratitude" />
        <EmotionTag label="즐거움" emotion="joy" />
        <EmotionTag label="위로" emotion="comfort" />
        <EmotionTag label="그리움" emotion="longing" />
        <EmotionTag label="고민" emotion="worry" />
        </div>

        <div className="flex flex-col gap-3 items-start">
        <FromBadge name="이름" backgroundColor="#c5cff9ff" />
        <PremiumBadge />
        </div>
    </div>
  );
}
