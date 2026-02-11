// 마이페이지 플러스멤버십 모달

import { createPortal } from "react-dom";
import PaymentButton from "@/components/common/PaymentButton";
import type { PlusModalProps } from "@/types/modal";
import type { ReactNode } from "react";
import fontIcon from "@/assets/myPage/fontIcon.svg";
import stickerIcon from "@/assets/myPage/stickerIcon.svg";

export default function PlusModal({ open, onPay }: PlusModalProps) {
  if (!open) return null;

  const container = document.getElementById("app-frame");
  if (!container) return null;

  return createPortal(
    <div className="absolute inset-0 z-50 flex items-end bg-black/40">
      <div className="w-full bg-white rounded-t-2xl p-4">
        <h2 className="text-center mt-3">
          <span className="text-[20px] font-medium tracking-tight">
            Dear.e{" "}
          </span>
          <span className="text-[20px] font-semibold tracking-tight">
            Plus
          </span>
        </h2>
        <p className="text-center text-[12px] text-[#555557] mt-2 mb-7">
          한 번 결제로 평생 소장하세요.
        </p>

        <div className="space-y-[10px] mb-7">
          <Benefit iconSrc={fontIcon} title="폰트 변경" desc="다양한 감성 폰트 제공" />
          <Benefit iconSrc={stickerIcon} title="스티커 무제한" desc="마음껏 꾸미기 가능" />
        </div>

        <button type="button" onClick={onPay} className="w-full mb-[36px]">
          <PaymentButton amountText="1,990원" />
        </button>
      </div>
    </div>,
    container
  );
}

function Benefit({
  title,
  desc,
  icon,
  iconSrc,
}: {
  title: string;
  desc: string;
  icon?: ReactNode;
  iconSrc?: string;
}) {
  return (
    <div className="px-4 pt-[11px] pb-[12px] bg-[#F7F7F7] rounded-[12px] flex items-center gap-[22px]">
      <div className="w-6 h-6 flex items-center justify-center shrink-0">
        {icon ? (
          <span className="w-6 h-6 [&>svg]:w-6 [&>svg]:h-6">{icon}</span>
        ) : iconSrc ? (
          <img src={iconSrc} alt="" className="w-6 h-6" />
        ) : null}
      </div>

      <div className="flex-1">
        <div className="font-medium text-[14px] mb-[2px]">{title}</div>
        <div className="text-[10px] font-medium text-[#9D9D9F]">{desc}</div>
      </div>
    </div>
  );
}