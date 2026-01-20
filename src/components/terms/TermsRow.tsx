import CheckCircle from "./CheckCircle";

export default function TermsRow({
  checked,
  onToggle,
  title,
  required,
  onView,
}: {
  checked: boolean;
  onToggle: () => void;
  title: string;
  required: boolean;
  onView: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-[13px] px-[16px]">
      <div className="flex items-center gap-3 min-w-0">
        <CheckCircle checked={checked} onClick={onToggle} ariaLabel={title} />

        <p className="text-[14px] font-medium text-black truncate">
          <span className="text-black">
            [{required ? "필수" : "선택"}]
          </span>{" "}
          {title}
        </p>
      </div>

      <button
        type="button"
        onClick={onView}
        className="text-[12px] text-[#8B8B8F] hover:text-[#666] shrink-0"
      >
        보기
      </button>
    </div>
  );
}
