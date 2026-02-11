import { useMemo, useState, useEffect } from "react";
import TermsRow from "@/components/terms/TermsRow";
import CheckCircle from "@/components/terms/CheckCircle";
import { BottomButton } from "@/components/common/BottomButton";
import type { TermsKey, TermsState } from "@/types/terms";
import { useNavigate } from "react-router-dom";
import { getSignupTerms, type ApiTerm } from "@/api/authSignup";
import { termTypeToKey } from "@/utils/terms";

type TermMeta = {
  termId: number;
  title: string;
  required: boolean;
  content: string;
};

type TermMetaMap = Partial<Record<TermsKey, TermMeta>>;

export default function TermsPage() {
  const [terms, setTerms] = useState<TermsState>({
    service: false,
    privacy: false,
    marketing: false,
  });

  const navigate = useNavigate();

  // 서버 약관 메타(termId/required/title/content) 저장
  const [metaMap, setMetaMap] = useState<TermMetaMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const apiTerms: ApiTerm[] = await getSignupTerms();

      // console.log("apiTerms:", apiTerms);
      // console.log("mapped keys:", apiTerms.map(t => [t.type, termTypeToKey(t.type), t.isActive]));

      const next: TermMetaMap = {};

      apiTerms
        .filter((t) => t.isActive ?? true)
        .forEach((t) => {
          const key = termTypeToKey(t.type);
          if (!key) return;

          next[key] = {
            termId: t.termId,
            title: t.title,
            required: t.isRequired,
            content: t.content,
          };
        });
      
      // console.log("next:", next);

      setMetaMap(next);
      setLoading(false);
    };

    run().catch((e) => {
      console.error(e);
      setLoading(false);
      navigate("/login", { replace: true });
    });
    
  }, [navigate]);

  const items = useMemo(() => {
    const order: TermsKey[] = ["service", "privacy", "marketing"];
    return order
      .map((key) => {
        const m = metaMap[key];
        if (!m) return null;
        return { key, title: m.title, required: m.required };
      })
      .filter(Boolean) as { key: TermsKey; title: string; required: boolean }[];
  }, [metaMap]);

  const allChecked = useMemo(
    () => items.length > 0 && items.every((item) => terms[item.key]),
    [items, terms]
  );

  const canProceed = useMemo(
    () => items.filter((item) => item.required).every((item) => terms[item.key]),
    [items, terms]
  );

  const toggleAll = () => {
    const next = !allChecked;
    setTerms((prev) => {
      const copy = { ...prev };
      items.forEach((item) => {
        copy[item.key] = next;
      });
      return copy;
    });
  };

  const toggleOne = (key: TermsKey) => {
    setTerms((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const onNext = () => {
    if (!canProceed) return;

    const termIds = items
      .filter((item) => terms[item.key])
      .map((item) => metaMap[item.key]!.termId);

    navigate("/auth/signup", { state: { termIds }, replace: true });
  };

  if (loading) return <div className="p-4">약관 불러오는 중...</div>;

  return (
    <div>
      <div
        className="flex items-center gap-3 pt-[19px] pb-[15px] px-[13px] cursor-pointer"
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

      <div className="mt-[10px]">
        {items.map((item) => (
          <TermsRow
            key={item.key}
            checked={terms[item.key]}
            onToggle={() => toggleOne(item.key)}
            title={item.title}
            required={item.required}
            onView={() => {}}
          />
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-3">
        <BottomButton disabled={!canProceed} onClick={onNext}>
          다음
        </BottomButton>
      </div>
    </div>
  );
}
