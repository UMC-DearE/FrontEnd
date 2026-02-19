// 프롬 생성하기 공용 UI - 검색창은 각각 컴포넌트에서 따로

import { useState } from 'react';
import { getHarmoniousTextColor } from '@/utils/color';
import type { CreateFrom } from '@/types/from';
import ColorPicker from '@/assets/create/color-picker.svg';
import { HexColorPicker } from 'react-colorful';
import Plusbtn from '@/assets/create/plusbtn.svg';
import { FromBadge } from '@/components/common/FromBadge';

type Props = {
  onDraftCreate?: (draft: CreateFrom) => void; // 생성된 draft를 부모 컴포넌트로 전달(setFromPage)
  onCreateImmediate?: (draft: CreateFrom) => Promise<any>; // 생성된 draft로 바로 프롬 생성 api 호출(fromCreatePage)
  name: string;
  onNameChange: (v: string) => void;
  disabled?: boolean;
  fromCount?: number; // 현재 From 개수 (개수에 따라 컬러피커 위치 조정용)
};

export default function CreateFrom({
  onDraftCreate,
  onCreateImmediate,
  name,
  onNameChange,
  disabled,
  fromCount,
}: Props) {
  const [selectedColor, setSelectedColor] = useState('#FEEFEF');
  const [showPicker, setShowPicker] = useState(false);

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const shortName = trimmed.slice(0, 7); // 최대 7자 제한

    const draft: CreateFrom = {
      name: shortName,
      bgColor: selectedColor,
      fontColor: getHarmoniousTextColor(selectedColor),
    };

    if (onDraftCreate) {
      onDraftCreate(draft);
      return;
    }

    if (onCreateImmediate) {
      await onCreateImmediate(draft);
      onNameChange('');
    }
  };

  return (
    <div className="mt-4 p-4">
      <div className="flex mb-4 gap-2">
        <div className="text-sm font-medium text-primary">새로운 From 추가</div>
        <div className="text-sm font-medium text-[#9D9D9F]">(색상 선택)</div>
      </div>

      <div className="relative flex gap-3 mb-6 mt-4">
        {['#FFE2DD', '#FFF3C4', '#EAF5FF', '#E4F7EB'].map((c) => (
          <button
            key={c}
            onClick={() => setSelectedColor(c)}
            className={`w-[32px] h-[32px] rounded-full transition-all ${
              selectedColor === c ? 'scale-100 shadow-[0_0_8px_rgba(0,0,0,0.2)]' : 'shadow-none'
            }`}
            style={{ background: c }}
          />
        ))}

        <button
          onClick={() => setShowPicker((s) => !s)}
          className="w-[32px] h-[32px] rounded-full flex items-center justify-center"
        >
          <img src={ColorPicker} alt="upload" className="w-[32px] h-[32px]" />
        </button>

        {showPicker && (
        <div
          className={`absolute left-6/8 -translate-x-1/2 z-40 ${
            fromCount && fromCount >= 5 ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
        >
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

      <button onClick={handleCreate} className="flex items-center gap-2 font-medium text-lg text-primary" disabled={disabled}>
        <img src={Plusbtn} alt="upload" />
        <FromBadge name={name || '이름'} bgColor={selectedColor} fontColor={getHarmoniousTextColor(selectedColor)} />
        생성하기
      </button>
    </div>
  );
}
