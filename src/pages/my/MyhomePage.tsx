// 마이페이지

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlusModal from "@/components/my/PlusModal";
import { PremiumBadge } from "@/components/common/PremiumBadge";
import MenuItem from "@/components/my/MenuItem";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon";
import ProfilePlaceholderIcon from "@/components/icons/ProfilePlaceholderIcon";

function MyProfileSection({ isPlus }: { isPlus: boolean }) {
  const navigate = useNavigate();

  return (
    <section
      role="button"
      tabIndex={0}
      onClick={() => navigate("/my/profile")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") navigate("/my/profile");
      }}
      className="
        px-[22px] py-[20px]
        border-b border-[#E6E7E9]
        cursor-pointer
        active:bg-[#F7F7F8]
        focus:outline-none
      "
    >
      <div className="flex items-center gap-[15px]">
        <div className="w-[60px] h-[60px] rounded-full bg-[#F2F3F5] flex items-center justify-center overflow-hidden">
          <ProfilePlaceholderIcon size={28} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-[10px]">
            <span className="font-medium text-[16px] truncate">
              닉네임여러글자실험
            </span>
            {isPlus && <PremiumBadge label="Plus" />}
          </div>

          <p className="font-medium text-[12px] text-[#9D9D9F] mt-2">
            프로필 수정
          </p>
        </div>

        <ChevronRightIcon />
      </div>
    </section>
  );
}

export default function MyhomePage() {
  const [isPlus, setIsPlus] = useState(false);
  const [isPlusModalOpen, setIsPlusModalOpen] = useState(false);

  return (
    <>
      <main className="bg-white">
        <MyProfileSection isPlus={isPlus} />

        <div className="bg-[#F7F7F7] px-[22px] pt-[25px] pb-[9.33px] font-medium text-[13px] text-[#9D9D9F]">설정</div>

        <button
          className="w-full px-[22px] pt-[18px] pb-[17px] flex justify-between items-center border-b border-[#E6E7E9]"
          onClick={() => {
            if (!isPlus) setIsPlusModalOpen(true);
          }}
        >
          <span className="font-medium text-[16px]">Plus 멤버십</span>

          {isPlus ? (
            <div className="flex items-center gap-[9px]">
              <span className="text-[12px] text-[#9D9D9F]">이용 중</span>
              <ChevronRightIcon />
            </div>
          ) : (
            <PremiumBadge />
          )}
        </button>

        <MenuItem label="계정 관리"/>
        <MenuItem label="From 관리"/>
        <button className="w-full px-[22px] pt-[18px] pb-[17px] flex justify-between items-center border-b border-[#E6E7E9]">
          <span className="font-medium text-[16px]">로그아웃</span>
        </button>

        <div className="bg-[#F7F7F7] px-[22px] pt-[25px] pb-[9.33px] font-medium text-[13px] text-[#9D9D9F]">테마</div>
        <button
          className="w-full px-[22px] pt-[18px] pb-[17px] flex justify-between items-center border-b border-[#E6E7E9]"
          onClick={() => {
            if (!isPlus) setIsPlusModalOpen(true);
          }}
        >
          <span className="font-medium text-[16px]">스타일</span>

          {isPlus ? (
            <div className="flex items-center gap-[9px]">
              <span className="text-[12px] text-[#9D9D9F]">기본</span>
              <ChevronRightIcon />
            </div>
          ) : (
            <PremiumBadge />
          )}
        </button>
        <button className="w-full px-[22px] pt-[18px] pb-[17px] flex justify-between items-center border-b border-[#E6E7E9]">
          <span className="font-medium text-[16px]">화면</span>
          <div className="flex items-center gap-[9px]">
            {isPlus && (
              <span className="text-[12px] text-[#9D9D9F]">기본</span>
            )}
            <ChevronRightIcon />
          </div>
        </button>

        <div className="bg-[#F7F7F7] px-[22px] pt-[25px] pb-[9.33px] font-medium text-[13px] text-[#9D9D9F]">지원</div>
        <MenuItem label="서비스 이용약관"/>
        <MenuItem label="개인정보처리방침"/>
      </main>

      <PlusModal
        open={isPlusModalOpen}
        onClose={() => setIsPlusModalOpen(false)}
        onPay={() => {
          setIsPlus(true);
          setIsPlusModalOpen(false);
        }}
      />
    </>
  );
}