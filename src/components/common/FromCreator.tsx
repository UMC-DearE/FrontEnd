// 프롬 생성하기 공용 UI - 색상 선택 + 미리보기 (제출 로직/버튼은 각 페이지에서 처리)

import { useEffect, useRef, useState } from 'react';
import { getHarmoniousTextColor } from '@/utils/color';
import ColorPicker from '@/assets/create/color-picker.svg';
import { HexColorPicker } from 'react-colorful';
import { FromBadge } from '@/components/common/FromBadge';

type Props = {
  name: string;
  selectedColor: string;
  onColorChange: (c: string) => void;
};

export default function CreateFrom({ name, selectedColor, onColorChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showPicker) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="mt-7">
      <div className="flex mb-3 gap-2">
        <div className="text-sm font-medium text-[#A1A4AA]">색상 선택</div>
      </div>

      <div className="relative flex gap-3 mb-7">
        {['#FFE2DD', '#FFF3C4', '#EAF5FF', '#E4F7EB'].map((c) => (
          <button
            key={c}
            onClick={() => onColorChange(c)}
            className={`w-[36px] h-[36px] rounded-full transition-all border-[1.2px] ${
              selectedColor === c ? 'border-primary' : 'border-transparent'
            }`}
            style={{ background: c }}
          />
        ))}

        <div ref={pickerRef} className="relative">
          <button
            onClick={() => setShowPicker((s) => !s)}
            className="flex h-[36px] w-[36px] items-center justify-center rounded-full"
          >
            <img src={ColorPicker} alt="색상 선택" className="h-[36px] w-[36px]" />
          </button>

          {showPicker && (
            <div className="absolute left-full top-1/2 z-40 ml-1.5 -translate-y-[65%]">
              <div className="w-[115px] rounded-[10px] bg-white p-1 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
                <HexColorPicker
                  color={selectedColor}
                  onChange={onColorChange}
                  className="custom-color-picker !h-[100px] !w-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#CACBD1] bg-[#F7F8F9] px-4 py-6">
        <p className="text-[13px] font-normal text-[#A1A4AA]">이렇게 만들어져요 👀</p>

        <div className="max-w-full rounded-[6px] shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)]">
          <FromBadge
            size="xl"
            name={name || '이름'}
            bgColor={selectedColor}
            fontColor={getHarmoniousTextColor(selectedColor)}
          />
        </div>
      </div>
    </div>
  );
}
