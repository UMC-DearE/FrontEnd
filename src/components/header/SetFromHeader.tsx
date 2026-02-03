// 편지 추가 - 프롬 선택 페이지 헤더

import TopSection from "@/components/header/TopSection";
import BackButton from "../common/header/BackButton";
import { useNavigate } from "react-router-dom";

export default function SetFromHeader() {
  const navigate = useNavigate();

  return (
    <>
      <TopSection
        left={<BackButton />}
        center={<div className="text-lg font-semibold">From 선택</div>}
        right={
          <div className="flex items-center space-x-2 mr-2">
            <button
              type="button"
              className="text-base font-normal text-[#555557]"
              aria-label="관리"
              onClick={() => navigate('/my/from')}
            >
              관리
            </button>
          </div>
        }
      />
    </>
  );
}