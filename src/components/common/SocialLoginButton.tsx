import kakaoIcon from "@/assets/onboarding/kakao.svg";
import googleIcon from "@/assets/onboarding/google.svg";

type Provider = "kakao" | "google";

interface SocialLoginButtonProps {
  provider: Provider;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function SocialLoginButton({
  provider,
  onClick,
  disabled,
  className = "",
}: SocialLoginButtonProps) {
  const isKakao = provider === "kakao";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isKakao ? "카카오로 계속하기" : "구글로 계속하기"}
      className={`
        w-[361px] h-[50px]
        rounded-[12px]
        flex items-center px-4 gap-[83px]
        text-[16px] font-medium
        transition active:scale-[0.99]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${isKakao
          ? "bg-[#FEE500] text-[#141517]"
          : "bg-white text-[#555557] border border-[#E6E7E9]"}
        ${className}
      `}
    >
      <img
        src={isKakao ? kakaoIcon : googleIcon}
        alt=""
        className="w-[22px] h-[22px]"
        draggable={false}
      />
      <span>{isKakao ? "Kakao로 계속하기" : "Google로 계속하기"}</span>
    </button>
  );
}
