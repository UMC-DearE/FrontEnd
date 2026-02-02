import { useState } from "react";
import ProfilePlaceholderIcon from "@/components/icons/ProfilePlaceholderIcon";
import ConfirmModal from "@/components/common/ConfirmModal";

export default function AccountPage() {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const email = "suhyeon8128@naver.com";

  const onConfirmDelete = async () => {
    // TODO: 계정 삭제 API 연동
    // await deleteAccount();
    setOpenDeleteModal(false);
    // TODO: 삭제 후 로그아웃 처리 + 라우팅
    // navigate("/signin", { replace: true });
  };

  return (
    <div className="bg-[#F7F7F7]">
      <div className="px-4 pt-5 pb-[9.33px] text-[14px] font-medium text-[#555557]">
        연결된 계정
      </div>

      <div className="bg-white px-[25px] py-[13px] border-b border-[#E6E7E9] flex items-center gap-3">
        <div className="w-[24px] h-[24px] rounded-full bg-[#F2F3F5] flex items-center justify-center">
          <ProfilePlaceholderIcon size={16} />
        </div>
        <span className="text-[13px] text-[#555557]">{email}</span>
      </div>

      <div className="pt-[15px]"/>
      <button
        type="button"
        onClick={() => setOpenDeleteModal(true)}
        className="bg-white w-full text-left px-[25px] py-4 text-[14px] font-medium text-[#FF5F2F]"
      >
        계정 삭제
      </button>

      <ConfirmModal
        open={openDeleteModal}
        title="계정 삭제"
        description={
          "계정 내의 삭제된 편지들은 복구되지 않습니다. \n정말로 삭제하시겠습니까?"
        }
        cancelText="취소"
        confirmText="해제"
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={onConfirmDelete}
        titleClassName="text-[#FF1D0D]"
      />
    </div>
  );
}
