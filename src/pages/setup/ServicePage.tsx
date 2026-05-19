import { useLocation } from "react-router-dom";

type Clause = {
  clauseTitle: string;
  clauseContent: string;
};

type TermDetailState = {
  title?: string;
  clauses?: Clause[];
};

export default function ServicePage() {

  const { state } = useLocation();
  const { clauses = [] } = (state ?? {}) as TermDetailState;

  return (
    <div className="min-h-screen">
      <main className="pb-[110px] pt-[12px]">
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
      </main>
    </div>
  );
}