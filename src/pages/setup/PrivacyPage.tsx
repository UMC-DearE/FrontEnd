import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getTerms } from '@/api/terms';

type Clause = {
  clauseTitle: string;
  clauseContent: string;
};

type TermDetailState = {
  title?: string;
  clauses?: Clause[];
};

export default function PrivacyPage() {
  const { state } = useLocation();
  const stateFromNav = (state ?? {}) as TermDetailState;

  const [clauses, setClauses] = useState<Clause[]>(stateFromNav.clauses ?? []);
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(!stateFromNav.clauses);

  useEffect(() => {
    // 이전 화면(약관 동의 페이지)에서 state로 넘겨받은 경우엔 그대로 사용
    if (stateFromNav.clauses) return;

    let mounted = true;

    (async () => {
      try {
        const terms = await getTerms('PRIVACY');
        const found = terms[0];

        if (!mounted) return;

        if (found?.clauses?.length) {
          setClauses(found.clauses);
        } else {
          setContent(found?.content ?? '');
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="p-4">불러오는 중...</div>;
  }

  return (
    <div className="min-h-screen">
      <main className="pb-[110px] pt-[12px]">
        {clauses.length > 0 ? (
          <div className="space-y-[28px]">
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
          <p className="whitespace-pre-line text-[14px] font-normal leading-[150%] text-[#737478]">
            {content}
          </p>
        )}
      </main>
    </div>
  );
}