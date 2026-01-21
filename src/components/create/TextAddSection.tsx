import { useEffect, useRef } from "react";

const MAX_LINES = 20;
const LINE_HEIGHT = 20;

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TextAddSection({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const textarea = ref.current;
    const DISPLAY_HEIGHT = 253;

    textarea.style.height = `${DISPLAY_HEIGHT}px`;

    if (textarea.scrollHeight > DISPLAY_HEIGHT) {
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.overflowY = "hidden";
    }
  }, [value]);

  return (
    <div className="relative">
      {!value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-[#9D9D9F] text-sm font-medium">받은 편지를 복사 후 붙여넣기 하세요</div>
        </div>
      )}

  <textarea
  ref={ref}
  value={value}
  onChange={(e) => onChange(e.target.value)}
  className="w-full border border-[2px] font-normal text-sm border-[#E6E7E9] rounded-xl p-4 resize-none outline-none bg-transparent thin-scrollbar"
  style={{
    height: 253,
    maxHeight: MAX_LINES * LINE_HEIGHT,
  }}
/>
</div>
  );
}