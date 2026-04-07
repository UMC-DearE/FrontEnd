// 홈 프로필 카드

import profile from '@/assets/homePage/profile-default.svg';
import setIcon from '@/assets/homePage/settingIcon.svg';

interface ProfileCardProps {
  nickname: string;
  bio?: string | null;
  imgUrl?: string | null;
  onClickSettings?: () => void;
}

export default function ProfileCard({ nickname, bio, imgUrl, onClickSettings }: ProfileCardProps) {
  return (
    <div className="relative flex min-h-[202px] w-full min-w-[320px] max-w-[440px] flex-col items-center rounded-[10px] bg-white shadow-[0_0_4px_0.5px_rgba(0,0,0,0.15)]">
      <button
        type="button"
        onClick={onClickSettings}
        className="absolute right-4 top-4 cursor-pointer"
      >
        <img src={setIcon} alt="set-icon" className="h-[28px] w-[28px]" />
      </button>

      <div className="mt-9 h-[74px] w-[74px] flex items-center justify-center overflow-hidden rounded-full bg-[#F3F4F6]">
        <img src={imgUrl ?? profile} alt="profile" className="h-full w-full object-cover" />
      </div>

      <p className="mt-3 h-[21px] text-[18px] font-semibold">{nickname || '닉네임설정'}</p>

      <p className="mt-[10px] h-[14px] text-[12px] font-medium text-[#9D9D9F]">
        {bio || '한 줄 소개를 입력하세요'}
      </p>
    </div>
  );
}
