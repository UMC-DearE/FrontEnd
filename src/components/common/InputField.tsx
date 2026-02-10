// 오른쪽에 rightElement를 넣을 수 있는 입력 필드
// rightElement의 width에 따라 paddingRight 자동 조정

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface InputFieldProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rightElement?: ReactNode;
  maxLength?: number;
  inputClassName?: string;
  containerClassName?: string;
  useGrayWhenBlurred?: boolean;
}

const BASE_PADDING_PX = 18;

export function InputField({
  value,
  onChange,
  placeholder,
  rightElement,
  maxLength,
  inputClassName,
  containerClassName,
  useGrayWhenBlurred = false,
}: InputFieldProps) {
  const rightRef = useRef<HTMLDivElement>(null);
  const [rightPadding, setRightPadding] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (rightRef.current) {
      const width = rightRef.current.offsetWidth;
      setRightPadding(width + BASE_PADDING_PX);
    } else {
      setRightPadding(null);
    }
  }, [rightElement]);

  return (
    <div className={`relative w-full ${containerClassName ?? ""}`}>
      <input
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={
          rightPadding !== null
            ? { paddingRight: rightPadding }
            : undefined
        }
        className={
          `
          w-full h-[50px]
          rounded-xl px-[12px] py-[15px]
          text-base font-medium text-primary
          border border-[#C2C4C7]
          placeholder:text-[#C2C4C7]
          focus:outline-none focus:ring-0 focus:border-primary
          overflow-x-auto whitespace-nowrap
        ` +
            (useGrayWhenBlurred && !isFocused ? " bg-[#F7F7F7]" : " bg-white") +
            (inputClassName ? ` ${inputClassName}` : "")
        }
      />

      {rightElement && (
        <div
          ref={rightRef}
          className="absolute right-[12px] top-1/2 -translate-y-1/2"
        >
          {rightElement}
        </div>
      )}
    </div>
  );
}



