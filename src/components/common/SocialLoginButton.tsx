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
        w-full max-w-[408px] aspect-[408/50]
        rounded-[12px]
        flex items-center justify-center gap-2
        transition active:scale-[0.99]
        disabled:opacity-60 disabled:cursor-not-allowed
        ${isKakao
          ? "bg-[#FEE500] text-[#141517]"
          : "bg-white text-[#555557] border border-[#E6E7E9]"}
        ${className}
      `}
      style={{
        paddingLeft: "clamp(10px, 3vw, 16px)",
        paddingRight: "clamp(10px, 3vw, 16px)",
      }}
    >
      <img
        src={isKakao ? kakaoIcon : googleIcon}
        alt=""
        className="shrink-0"
        draggable={false}
        style={{
          width: "clamp(18px, 5vw, 22px)",
          height: "clamp(18px, 5vw, 22px)",
        }}
      />
      <span
        className="min-w-0 text-center leading-none"
        style={{
          fontSize: "clamp(13px, 4vw, 16px)",
        }}
      >
        {isKakao ? "Kakao로 계속하기" : "Google로 계속하기"}
      </span>
    </button>
  );
}
