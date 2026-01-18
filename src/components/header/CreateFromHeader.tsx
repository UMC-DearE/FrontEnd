import TopSection from "@/components/header/TopSection";
import BackButton from "../common/header/BackButton";

export default function CreateFromHeader() {
  return (
    <>
      <TopSection
        left={<BackButton />}
        center={<h1 className="text-lg font-semibold">From 선택</h1>}
        right={
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="text-base font-regular text-[#555557]"
              aria-label="관리"
            >
              관리
            </button>
          </div>
        }
      />
    </>
  );
}