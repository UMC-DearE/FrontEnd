import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTerms, type ApiClause } from '@/api/terms';

type TermDetailState = {
  title?: string;
  clauses?: ApiClause[];
};

export default function PrivacyPage() {
  const { state } = useLocation();
  const stateFromNav = (state ?? {}) as TermDetailState;

  const [clauses, setClauses] = useState<ApiClause[]>(stateFromNav.clauses ?? []);
  const [loading, setLoading] = useState(!stateFromNav.clauses);

  useEffect(() => {
    if (stateFromNav.clauses) return;

    let mounted = true;

    (async () => {
      try {
        const terms = await getTerms('PRIVACY');
        const found = terms[0];

        if (!mounted) return;

        if (found?.clauses) {
          setClauses(found.clauses);
        }
      } catch (e) {
        console.error('개인정보처리방침 조회 실패:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [stateFromNav.clauses]);

  if (loading) {
    return <div className="p-4">불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="pb-[80px] pt-[8px]">
        {/* 상단 고정 메타 정보 */}
        <div className="mb-[24px] space-y-[2px] text-[14px] font-medium leading-[150%] text-[#121212]">
          <p>시행일: 2026년 09월 01일</p>
          <p>서비스명: dear.e (디어리)</p>
          <p>운영: 팀 dear.e (비영리 사이드 프로젝트)</p>
        </div>

        {/* 조항 목록 영역 */}
        {clauses.length > 0 ? (
          <div className="space-y-[24px]">
            {clauses.map((clause) => (
              <section key={clause.clauseTitle}>
                <h2 className="text-[16px] font-semibold leading-[150%] text-[#121212]">
                  {clause.clauseTitle}
                </h2>
                <p className="mt-[8px] whitespace-pre-line text-[14px] font-normal leading-[150%] text-[#737478]">
                  {clause.clauseContent}
                </p>
              </section>
            ))}
          </div>
        ) : (
          <p className="p-4 text-[14px] text-[#737478]">등록된 약관 내용이 없습니다.</p>
        )}
      </main>
    </div>
  );
}