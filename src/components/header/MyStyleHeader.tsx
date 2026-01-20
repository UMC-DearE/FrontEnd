// 마이페이지 - 스타일 페이지 헤더

import TopSection from "./TopSection";
import BackButton from "../common/header/BackButton";
import { PremiumBadge } from "../common/PremiumBadge";

export default function StyleHeader() {
  return (
    <TopSection
      left={<BackButton />}
      center={
        <div className="flex items-center gap-[8px] text-lg font-semibold leading-none text-primary">
          <span>스타일</span>
          <PremiumBadge label="Plus" />
        </div>
      }
    />
  );
}
