// 홈 커스텀 모달

import { useMemo, useRef, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import stickerIcon from '@/assets/homePage/stickerIcon.svg';
import bgIcon from '@/assets/homePage/bgIcon.svg';

interface ProfileCustomSheetProps {
  open: boolean;
  onClose: () => void;
  onComplete?: () => void;
  onPickStickerFile?: (file: File) => void;
  bgColor: string;
  onChangeBgColor: (color: string) => void;
}

const normalizeHex = (v: string) => {
  const t = v.trim();
  if (!t) return '#000000';
  const withHash = t.startsWith('#') ? t : `#${t}`;
  const ok = /^#[0-9A-Fa-f]{6}$/.test(withHash);
  return ok ? withHash : '#000000';
};

export default function ProfileCustomSheet({
  open,
  onComplete,
  onPickStickerFile,
  bgColor,
  onChangeBgColor,
}: ProfileCustomSheetProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPicker, setShowPicker] = useState(false);

  const safeBgColor = useMemo(() => normalizeHex(bgColor), [bgColor]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="relative w-[393px] min-h-screen bg-[#B0B0B0]/50 overflow-hidden pointer-events-none">
        <button
          type="button"
          onClick={onComplete}
          className="absolute top-[79px] left-[309px] flex items-center justify-center w-[57px] h-[29px] bg-[#FF5F2F] rounded-[18px] px-[16px] py-[6px] gap-[10px] cursor-pointer pointer-events-auto"
        >
          <p className="absolute w-[25px] h-[17px] text-white font-semibold text-[14px]">완료</p>
        </button>

        <div className="pointer-events-auto fixed bottom-0 left-1/2 h-[225px] w-[393px] -translate-x-1/2 rounded-t-[17px] bg-white">
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-center mt-[54px] gap-[54px]">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-[56px] w-[56px] items-center justify-center rounded-[6px] border border-[#E6E7E9] bg-[#F4F5F6] cursor-pointer"
              >
                <img src={stickerIcon} alt="sticker-icon" />
              </button>
              <p className="absolute top-[126px] left-[122px] text-[#555557] font-medium text-[14px] leading-[100%] w-[37px] h-[17px] text-center">
                스티커
              </p>

              <button
                type="button"
                onClick={() => setShowPicker((v) => !v)}
                className="flex h-[56px] w-[56px] items-center justify-center rounded-[6px] border border-[#E6E7E9] bg-[#F4F5F6] cursor-pointer"
              >
                <img src={bgIcon} alt="bg-icon" />
              </button>
              <p className="absolute top-[126px] left-[233px] text-[#555557] font-medium text-[14px] leading-[100%] w-[37px] h-[17px] text-center">
                배경색
              </p>
            </div>

            {showPicker && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[235px] z-50">
                <div className="bg-white rounded-lg p-3 shadow-lg">
                  <HexColorPicker color={safeBgColor} onChange={onChangeBgColor} />
                  <div className="mt-2 flex items-center gap-2 justify-between">
                    <input
                      value={safeBgColor}
                      onChange={(e) => onChangeBgColor(normalizeHex(e.target.value))}
                      className="w-28 rounded border px-2 py-1 text-sm"
                    />
                    <button
                      onClick={() => setShowPicker(false)}
                      className="px-3 py-1 rounded bg-gray-100 text-sm"
                      type="button"
                    >
                      선택
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            onPickStickerFile?.(file);
            e.currentTarget.value = '';
          }}
        />
      </div>
    </div>
  );
}
