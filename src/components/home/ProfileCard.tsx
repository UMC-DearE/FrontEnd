import defaultProfile from '@/assets/homePage/defaultProfile.svg';
import setIcon from '@/assets/homePage/settingIcon.svg';

interface ProfileCardProps {
  nickname: string;
  bio?: string;
  onClickSettings?: () => void;
}

export default function ProfileCard({ nickname, bio, onClickSettings }: ProfileCardProps) {
  return (
    <div className="relative flex h-[202px] w-[361px] flex-col items-center rounded-[16px] bg-white shadow-md">
      <button type="button" onClick={onClickSettings} className="absolute left-81 top-4">
        <img src={setIcon} alt="set-icon" className="h-[19px] w-[19px]" />
      </button>

      <img src={defaultProfile} alt="default-profile" className="mt-9 h-[74px] w-[74px]" />

      <p className="mt-3 h-[21px] text-[18px] font-semibold">{nickname ?? '닉네임설정'}</p>

      <p className="mt-[10px] h-[14px] text-[12px] font-medium text-[#9D9D9F]">
        {bio ?? '한 줄 소개를 입력하세요'}
      </p>
    </div>
  );
}
