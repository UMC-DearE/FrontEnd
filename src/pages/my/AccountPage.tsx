import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/api/http';
import GoogleIcon from '@/assets/myPage/googleIcon.svg';
import KakaoIcon from '@/assets/myPage/kakaoIcon.svg';
import ConfirmModal from '@/components/common/ConfirmModal';
import { useMeQuery } from '@/hooks/queries/useMeQuery';
import { useDeleteMe } from '@/hooks/mutations/useDeleteMe';

export default function AccountPage() {
  const navigate = useNavigate();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const { data: me } = useMeQuery();
  const { mutateAsync: deleteMeMutate } = useDeleteMe();

  const providerIcon = me?.provider === 'KAKAO' ? KakaoIcon : GoogleIcon;

  const onConfirmLogout = async () => {
    setOpenLogoutModal(false);
    await logout();
    navigate('/login', { replace: true });
  };

  const onConfirmDelete = async () => {
    await deleteMeMutate();
    setOpenDeleteModal(false);
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-full bg-[#F7F8F9] px-4 pt-4">
      <div className="rounded-[10px] bg-white shadow-[0_0_2px_rgba(0,0,0,0.08)] px-[20px] py-[24px]">
        <div className="text-[13px] font-semibold text-[#A1A4AA] mb-[8px]">연결된 계정</div>
        <div className="flex items-center gap-[8px]">
          <div className="w-[28px] h-[28px] rounded-full flex items-center justify-center">
            <img src={providerIcon} alt="" className="w-[28px] h-[28px]" />
          </div>
          <span className="text-[16px] font-semibold text-[#121212]">
            {me?.email || '이메일 정보 없음'}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpenLogoutModal(true)}
        className="mt-[24px] w-full h-[50px] rounded-[12px] border-[1.2px] border-[#E7E8EB] bg-white text-[16px] font-semibold text-[#121212]"
      >
        로그아웃
      </button>

      <div className="mt-[40px] flex justify-center">
        <button
          type="button"
          onClick={() => setOpenDeleteModal(true)}
          className="text-[14px] font-semibold text-[#A1A4AA] underline underline-offset-[3px]"
        >
          서비스 탈퇴하기
        </button>
      </div>

      <ConfirmModal
        open={openDeleteModal}
        title="정말로 탈퇴할까요?"
        description={'탈퇴 시 모든 편지와 프로필이 완전히 삭제돼요. \n지워진 데이터는 다시 복구할 수 없어요.'}
        cancelText="취소"
        confirmText="탈퇴"
        onCancel={() => setOpenDeleteModal(false)}
        onConfirm={onConfirmDelete}
        confirmButtonClassName="bg-[#F02E2E] text-white"
      />

      <ConfirmModal
        open={openLogoutModal}
        title="로그아웃 할까요?"
        cancelText="취소"
        confirmText="확인"
        onCancel={() => setOpenLogoutModal(false)}
        onConfirm={onConfirmLogout}
      />
    </div>
  );
}