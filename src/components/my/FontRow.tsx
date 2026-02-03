import clsx from "clsx";

interface FontRowProps {
  selected: boolean;
  title: string;
  desc: string;
  preview: string;
  fontFamily: string;
  rightSlot?: React.ReactNode;
  onClick: () => void;
}

export function FontRow({
  selected,
  title,
  desc,
  preview,
  fontFamily,
  rightSlot,
  onClick,
}: FontRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-[361px] h-[80px] text-left rounded-[12px] border-[1.2px] px-[20px] py-[21px] flex items-center justify-between",
        selected ? "border-[#141517]" : "border-[#E6E7E9]"
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-[8px]">
          <div className="text-[16px] font-medium text-[#141517] truncate">
            {title}
          </div>
          {rightSlot}
        </div>
        <div className="text-[11px] text-[#9D9D9F] mt-[6px]">{desc}</div>
      </div>

      <div
        className="text-[20px] font-medium text-[#141517] shrink-0"
        style={{ fontFamily }}
      >
        {preview}
      </div>
    </button>
  );
}
