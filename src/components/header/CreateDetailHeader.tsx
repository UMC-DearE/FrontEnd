// 편지 추가 - 분석 페이지 헤더

import { useState } from "react";
import TopSection from "@/components/header/TopSection";
import CancelButton from "@/components/common/header/CancelButton";
import LetterThumbnail from "@/components/common/header/LetterThumbnail";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useNavigate } from "react-router-dom";

export default function CreateDetailHeader() {
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <TopSection
        left={<CancelButton onClick={() => setOpenConfirm(true)} />}
        center={<div className="text-lg font-semibold">내용 확인</div>}
        right={<LetterThumbnail />}
      />

      <ConfirmModal
        open={openConfirm}
        title="편지 추가 취소"
        description="편지 추가를 취소할까요? 편지는 저장되지 않아요."
        cancelText="아니오"
        confirmText="확인"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          navigate("/");
        }}
      />
    </>
  );
}