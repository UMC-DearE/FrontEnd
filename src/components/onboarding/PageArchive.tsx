import { onboardingAssets } from './assets';

// NOTE: content was repurposed from "아카이브" to "홈 화면 꾸미기" — kept the filename
// (PageArchive) so the existing import in LoginPage.tsx doesn't need to change.
// Feel free to rename to PageHome.tsx later if you'd rather the filename match the content.
export default function PageArchive() {
  return (
    <div className="flex flex-col items-center w-full min-w-0">
      <div className="text-center w-full">
        <div className="text-[14px] text-[#A1A4AA] font-medium">스티커와 배경색을 내 취향대로</div>
        <div className="mt-2 text-[20px] font-bold text-[#141517] leading-snug">
          나만의 홈 화면을 꾸며봐요
        </div>
      </div>

      <div className="mt-12 w-full flex justify-center min-w-0">
        <img
          src={onboardingAssets.home}
          alt="나만의 홈 화면을 꾸며봐요"
          draggable={false}
          className="w-full max-w-[240px] h-auto object-contain"
        />
      </div>
    </div>
  );
}