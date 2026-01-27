import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { getHarmoniousTextColor } from "@/utils/color";
import { FromBadge } from "@/components/common/FromBadge";
import type { CreateFrom } from "@/types/from";

interface Props {
  input: string;
  onCreate: (draft: CreateFrom) => void;
}

export default function FromCreatePanel({ input, onCreate }: Props) {
  const [selectedColor, setSelectedColor] = useState<string>("#FFE2DD");
  const [showPicker, setShowPicker] = useState(false);

  const handleCreate = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    const name = trimmed.slice(0, 7);
    const draft: CreateFrom = {
      name,
      backgroundColor: selectedColor,
      textColor: getHarmoniousTextColor(selectedColor),
    };
    onCreate(draft);
  };

  return (
    <div className="mt-4 p-4">
      <div className="flex mb-4 gap-2">
        <div className="text-sm font-medium text-primary">새로운 From 추가</div>
        <div className="text-sm font-medium text-[#9D9D9F]">(색상 선택)</div>
      </div>

      <div className="relative flex gap-3 mb-6 mt-4">
        {["#FFE2DD", "#FFF3C4", "#EAF5FF", "#E4F7EB"].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`w-[32px] h-[32px] rounded-full border-2 ${
              selectedColor === c ? "border-black scale-110" : "border-transparent"
            }`}
            style={{ background: c }}
          />
        ))}

        <button
          onClick={() => setShowPicker((s) => !s)}
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="#666" strokeWidth="1" />
          </svg>
        </button>

        {showPicker && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-40">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <HexColorPicker color={selectedColor} onChange={(c) => setSelectedColor(c)} />
              <div className="mt-2 flex items-center gap-2 justify-between">
                <input
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-28 rounded border px-2 py-1 text-sm"
                />
                <button
                  onClick={() => setShowPicker(false)}
                  className="px-3 py-1 rounded bg-gray-100 text-sm"
                >
                  선택
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleCreate} className="flex items-center gap-2 font-medium text-base text-primary">
        <span className="sr-only">추가</span>
        <FromBadge name={input} backgroundColor={selectedColor} />
        생성하기
      </button>
    </div>
  );
}
