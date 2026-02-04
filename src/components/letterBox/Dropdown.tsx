// 편지함 드롭다운

import { useEffect } from 'react';

const options = ['기본 보기', '간편 보기'] as const;
type Option = (typeof options)[number];

type DropdownProps = {
  value: Option;
  onSelect: (option: Option) => void;
};

export default function Dropdown({ value, onSelect }: DropdownProps) {
  useEffect(() => {}, [value]);

  return (
    <div className="w-[126px] h-[91px] rounded-xl bg-white flex items-center justify-center shadow-[0_0_12px_0_#0000001A]">
      <div className="flex flex-col items-center gap-2">
        {options.map((option) => {
          const isSelected = value === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`w-25 h-7 rounded-[6px] flex items-center justify-center cursor-pointer ${
                isSelected ? 'bg-[#FFEEE8]' : 'bg-white'
              }`}
            >
              <p
                className={`text-[14px] font-semibold ${
                  isSelected ? 'text-[#FF5F2F]' : 'text-[#9D9D9F]'
                }`}
              >
                {option}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
