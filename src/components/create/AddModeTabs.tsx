import type { AddMode } from "@/types/create";

interface Props {
  mode: AddMode;
  onChange: (mode: AddMode) => void;
}

const TABS: { key: AddMode; label: string }[] = [
  { key: "IMAGE", label: "이미지로 추가" },
  { key: "TEXT", label: "텍스트로 추가" },
];

export default function AddModeTabs({ mode, onChange }: Props) {
  return (
    <div className="flex bg-[#F7F7F7] rounded-full w-[190px] h-[32px] m-auto mt-3">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onChange(tab.key)}
          className={`flex-1 px-[12px] py-[8px] rounded-full text-[13px] font-semibold transition ${
            mode === tab.key
              ? "bg-primary text-white"
              : "text-[#C2C4C7]"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
