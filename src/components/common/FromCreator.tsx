// 프롬 생성하기 공용 UI - 색상 선택 + 미리보기 (제출 로직/버튼은 각 페이지에서 처리)

import { useState } from 'react';
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

        <button
          onClick={() => setShowPicker((s) => !s)}
          className="w-[36px] h-[36px] rounded-full flex items-center justify-center"
        >
          <img src={ColorPicker} alt="upload" className="w-[36px] h-[36px]" />
        </button>

        {showPicker && (
          <div className="absolute left-6/8 -translate-x-1/2 z-40 top-full mt-3">
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <HexColorPicker color={selectedColor} onChange={onColorChange} />
              <div className="mt-2 flex items-center gap-2 justify-between">
                <input
                  value={selectedColor}
                  onChange={(e) => onColorChange(e.target.value)}
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

      <div className="w-full rounded-2xl bg-[#F7F8F9] border border-dashed border-[#CACBD1] px-[125px] py-[24px] flex flex-col items-center justify-center gap-3">
        <p className="text-[13px] font-normal text-[#A1A4AA]">이렇게 만들어져요 👀</p>
        <div className="shadow-[0px_0px_4px_0px_rgba(0,0,0,0.12)] rounded-[6px]">
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
