// 초대 링크로 진입했을 때 코드를 검증하는 페이지
// 유효하면 초대 코드를 보관하고 소셜 로그인 화면으로 이동, 유효하지 않으면 안내 페이지로 이동

import { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useInviteVerify } from '@/hooks/queries/useInviteVerify';
import { savePendingInviteCode } from '@/utils/inviteCode';

export default function InviteEntryPage() {
  const navigate = useNavigate();
  const { inviteCode } = useParams();
  const authStatus = useAuthStore((s) => s.authStatus);

  const { data, isError } = useInviteVerify(inviteCode);

  useEffect(() => {
    if (!data) return;
    savePendingInviteCode(data.inviteCode);
    navigate('/login', { replace: true });
  }, [data, navigate]);

  useEffect(() => {
    if (isError) {
      navigate('/invite/invalid', { replace: true });
    }
  }, [isError, navigate]);

  // 이미 가입된 사용자는 초대 혜택 대상이 아님
  if (authStatus === 'authenticated') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-1 items-center justify-center text-[14px] font-medium text-[#737478]">
      초대 링크 확인 중...
    </div>
  );
}
