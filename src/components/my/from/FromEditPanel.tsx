import { useState } from 'react';
import { FromBadge } from '@/components/common/FromBadge';
import { getHarmoniousTextColor } from '@/utils/color';
import ColorPicker from '@/assets/create/color-picker.svg';
import { HexColorPicker } from 'react-colorful';
import type { CreateFrom } from '@/types/from';

type FromItem = CreateFrom & {
  fromId: number;
  letterCount?: number;
};

type Props = {
  from: FromItem;
  onCancel: () => void;
  onSave: (updated: FromItem) => void;
};

export default function FromEditPanel({ from, onCancel, onSave }: Props) {
  const [name, setName] = useState(from.name);
  const [selectedColor, setSelectedColor] = useState(from.backgroundColor);
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!name.trim()) return;

    onSave({
      ...from,
      name: name.trim().slice(0, 7),
      backgroundColor: selectedColor,
      textColor: getHarmoniousTextColor(selectedColor),
    });
  };

  return (
    <div className="border border-[#E6E7E9] rounded-xl p-4 bg-white mb-4">
      {/* 제목 */}
      <div className="text-xs font-medium text-[#555557] mb-2">
        이름 수정
      </div>

      {/* 이름 입력 */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        maxLength={7}
        className="w-full h-[45px] border border-[#E6E7E9] rounded-xl px-4 text-sm mb-6 outline-none focus:ring-1 focus:ring-primary"
      />

      {/* 색상 선택 */}
      <div className="text-xs font-medium text-[#9D9D9F] mb-2">
        색상 선택
      </div>

      <div className="relative flex gap-2 mb-4">
        {['#FFE2DD', '#FFF3C4', '#EAF5FF', '#E4F7EB'].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`w-[32px] h-[32px] rounded-full transition-all ${
              selectedColor === c
                ? 'scale-100 shadow-[0_0_8px_rgba(0,0,0,0.2)]'
                : 'shadow-none'
            }`}
            style={{ background: c }}
          />
        ))}

        <button
          onClick={() => setShowPicker((s) => !s)}
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
        >
          <img src={ColorPicker} alt="color picker" />
        </button>

        {showPicker && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 mb-3 z-40">
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

      {/* 미리보기 */}
      <div className="mb-6">
        <FromBadge
          name={name || '이름'}
          backgroundColor={selectedColor}
          textColor={getHarmoniousTextColor(selectedColor)}
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={onCancel}
          className="text-xs font-medium text-[#FF1D0D] underline"
        >
          삭제하기
        </button>

      <div className="flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="w-[44px] h-[25px] px-[11px] py-[5px] text-xs font-medium rounded-lg bg-[#E6E7E9] text-primary"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="w-[44px] h-[25px] px-[11px] py-[5px] text-xs font-medium rounded-lg bg-primary text-white"
        >
          완료
        </button>
      </div>
      </div>
    </div>
  );
}
