// 유효하지 않은 초대 링크로 접속했을 때 이동되는 페이지

import { useNavigate } from 'react-router-dom';
import { BottomButton } from '@/components/common/BottomButton';
import ErrorIcon from '@/assets/common/error.svg';

export default function InvalidInvitePage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-[12px]">
        <div className="flex flex-col items-center gap-[16px]">
          <img src={ErrorIcon} alt="" className="h-[40px] w-[40px] shrink-0" />

          <p className="text-center text-[18px] font-semibold leading-[1.5] text-[#121212]">
            유효하지 않은 링크예요
          </p>
        </div>

        <p className="text-center text-[14px] font-medium leading-[1.5] text-[#737478]">
          만료되었거나 잘못된 초대 링크예요.
          <br />
          아래 버튼을 눌러 새로 시작해 보세요.
        </p>
      </div>

      <div className="shrink-0 pb-[52px] pt-3">
        {/* 랜딩 페이지로 이동 */}
        <BottomButton onClick={() => navigate('/login', { replace: true })}>
          새로 시작하기
        </BottomButton>
      </div>
    </div>
  );
}
