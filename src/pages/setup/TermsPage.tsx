import { useMemo, useState } from "react";
import TermsRow from "@/components/terms/TermsRow";
import CheckCircle from "@/components/terms/CheckCircle";
import { BottomButton } from "@/components/common/BottomButton";
import type { TermsKey, TermsState } from "@/types/terms";
import { useNavigate } from "react-router-dom";

const TERMS_ITEMS = [
  { key: "service", title: "서비스 이용 약관", required: true },
  { key: "privacy", title: "개인정보 수집 및 이용", required: true },
  { key: "marketing", title: "마케팅 정보 수신 동의", required: false },
] as const;

export default function TermsPage() {
  const [terms, setTerms] = useState<TermsState>({
    service: false,
    privacy: false,
    marketing: false,
  });

  const allChecked = useMemo(
    () => TERMS_ITEMS.every((item) => terms[item.key]),
    [terms]
  );

  const canProceed = useMemo(
    () =>
      TERMS_ITEMS.filter((item) => item.required).every(
        (item) => terms[item.key]
      ),
    [terms]
  );

  const toggleAll = () => {
    const next = !allChecked;
    setTerms(
      TERMS_ITEMS.reduce((acc, item) => {
        acc[item.key] = next;
        return acc;
      }, {} as TermsState)
    );
  };

  const toggleOne = (key: TermsKey) => {
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const navigate = useNavigate();

  const onNext = () => {
    if (!canProceed) return;
    navigate("/setup/setname");
  };


  return (
    <div className="relative min-h-[calc(100vh-var(--header-height))] px-[13px] pt-[4px]">
      {/* 전체 동의 */}
      <div
        className="flex items-center gap-3 py-[13px] cursor-pointer"
        onClick={toggleAll}
      >
        <CheckCircle
          checked={allChecked}
          onClick={toggleAll}
          ariaLabel="약관 전체 동의"
        />
        <div>
          <p className="text-[16px] font-semibold text-black">
            약관 전체 동의
          </p>
        </div>
      </div>

      <div className="h-px bg-[#E6E7E9]" />

      {/* 약관 목록 */}
      {TERMS_ITEMS.map((item) => (
        <div key={item.key}>
          <TermsRow
            checked={terms[item.key]}
            onToggle={() => toggleOne(item.key)}
            title={item.title}
            required={item.required}
            onView={() => {}}
          />
        </div>
      ))}

      {/* 하단 버튼 */}
      <div className="absolute bottom-0 left-0 right-0 bg-white px-4 pb-[36px] pt-3 flex justify-center">
        <BottomButton disabled={!canProceed} onClick={onNext}>
          다음
        </BottomButton>
      </div>
    </div>
  );
}
