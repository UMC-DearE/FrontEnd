// 마이페이지 - 프롬 관리 페이지 헤더

import TopSection from "@/components/header/TopSection";
import BackButton from "../common/header/BackButton";
import { useNavigate } from "react-router-dom";

export default function MyFromHeader() {
  const navigate = useNavigate();

  return (
    <>
      <TopSection
        left={<BackButton />}
        center={<div className="text-lg font-semibold">From 관리</div>}
        right={
          <div className="flex items-center space-x-2 mr-2">
            <button
              type="button"
              className="text-base font-medium text-[#FF5F2F] cursor-pointer"
              aria-label="생성"
              onClick={() => navigate('/my/from/create')}
            >
              생성
            </button>
          </div>
        }
      />
    </>
  );
}