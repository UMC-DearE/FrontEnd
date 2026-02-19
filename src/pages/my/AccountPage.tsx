import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/api/http";
import ProfilePlaceholderIcon from "@/components/icons/ProfilePlaceholderIcon";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useMeQuery } from "@/hooks/queries/useMeQuery";
import { useDeleteMe } from "@/hooks/mutations/useDeleteMe";

export default function AccountPage() {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { data: me } = useMeQuery();
  const { mutateAsync: deleteMeMutate } = useDeleteMe();

  const onConfirmDelete = async () => {
    await deleteMeMutate();
    setOpenDeleteModal(false);
    await logout();
    navigate("/login", { replace: true });
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
        <span className="text-[13px] text-[#555557]">{me?.email || "이메일 정보 없음"}</span>
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
        confirmText="확인"
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={onConfirmDelete}
        titleClassName="text-[#FF1D0D]"
      />
    </div>
  );
}