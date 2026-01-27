import { useEffect, useRef } from "react";

const INITIAL_HEIGHT = 253;
const MAX_LINES = 20;
const LINE_HEIGHT = 20;
const PADDING_Y = 32; // p-4

const MAX_HEIGHT = MAX_LINES * LINE_HEIGHT + PADDING_Y;

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function TextAddSection({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

useEffect(() => {
  if (!ref.current) return;

  const textarea = ref.current;

  textarea.style.height = "auto";

  const nextHeight = Math.max(
    INITIAL_HEIGHT,
    Math.min(textarea.scrollHeight, MAX_HEIGHT)
  );

  textarea.style.height = `${nextHeight}px`;

  textarea.style.overflowY =
    textarea.scrollHeight > MAX_HEIGHT ? "auto" : "hidden";
}, [value]);


  return (
    <div className="relative">
      {!value && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mb-13">
          <div className="text-[#9D9D9F] text-sm font-medium">받은 편지를 복사 후 붙여넣기 하세요</div>
        </div>
      )}

      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border border-[#E6E7E9]
          rounded-xl
          p-4
          text-sm
          leading-[20px]
          resize-none
          outline-none
          bg-transparent
          thin-scrollbar
        "
        style={{
          height: INITIAL_HEIGHT,
          maxHeight: MAX_HEIGHT,
        }}
      />

</div>
  );
}