// 마이페이지-스타일 수정 페이지

import { useMemo, useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontRow } from "@/components/my/FontRow";
import { FONT_OPTIONS } from "@/utils/fontOptions";
import { useStyleStore } from "@/stores/styleStores";
import { BottomButton } from "@/components/common/BottomButton";
import { patchMyFont, serverFontToClient } from "@/api/theme";

export default function StylePage() {
  const navigate = useNavigate();

  const isPlus = true;

  const font = useStyleStore((s) => s.font);
  const setFont = useStyleStore((s) => s.setFont);

  const [pendingFont, setPendingFont] = useState(font);

  type LayoutContext = {
    setFixedAction: (payload: { node: React.ReactNode; bgColor?: string } | null) => void;
  };

  const { setFixedAction } = useOutletContext<LayoutContext>();

  const current = useMemo(
    () => FONT_OPTIONS.find((x) => x.key === pendingFont) ?? FONT_OPTIONS[0],
    [pendingFont]
  );

  const canSave = pendingFont !== font;

  const onSubmit = useCallback(async () => {
    if (pendingFont === font) return;

    const res = await patchMyFont(pendingFont);
    setFont(serverFontToClient(res.font));
    navigate(-1);
  }, [pendingFont, font, setFont, navigate]);


  useEffect(() => {
    if (!setFixedAction) return;

    setFixedAction({
      node: (
        <BottomButton disabled={!canSave} onClick={onSubmit}>
          변경
        </BottomButton>
      ),
    });

    return () => setFixedAction(null);
  }, [setFixedAction, canSave, onSubmit]);

  return (
    <div className="min-h-full pb-[52px]">
      <div>
        <div className="text-[14px] text-[#9D9D9F] mt-[4px] mb-[16px]">
          미리보기
        </div>

        <div
          className="rounded-[15px] w-[361px] h-[175px] shadow-[0_0_2px_rgba(0,0,0,0.08)] py-[40px] bg-white"
          style={{ fontFamily: current.fontFamily }}
          >
          <div className="text-center text-[18px] font-medium leading-[1.5] text-[#141517]">
            “너는 충분히 잘하고 있어.
            <br />
            오늘 하루도 정말 고생 많았어.”
          </div>

          <div className="flex justify-center mt-[20px]">
            <span className="px-[12px] py-[5.5px] rounded-[14px] bg-[currentColor]/10 text-[#FF4F18] text-[13px] font-semibold">
              From. 디어리
            </span>
          </div>
        </div>

        <div className="text-[14px] text-[#9D9D9F] mt-[30px] mb-[16px]">
          글꼴선택
        </div>

        <div className="flex flex-col gap-[12px]">
          {FONT_OPTIONS.map((opt) => {
            const locked = !!opt.isPlus && !isPlus;

            return (
              <FontRow
                key={opt.key}
                selected={opt.key === pendingFont}
                title={opt.title}
                desc={opt.desc}
                preview={opt.preview}
                fontFamily={opt.fontFamily}
                onClick={() => {
                  if (locked)
                    return;
                  setPendingFont(opt.key);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
