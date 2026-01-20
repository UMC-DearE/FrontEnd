import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomButton } from "@/components/common/BottomButton";

const NICKNAME_REGEX = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/;

const SetNamePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState("");
  const [touched, setTouched] = useState(false);

  const errorMessage = useMemo(() => {
    if (!touched) return "";

    const value = nickname;

    if (value.length === 0) return "";

    // 공백 포함
    if (/\s/.test(value)) return "특수문자는 사용이 불가해요.";

    // 길이 제한(10 초과)
    if (value.length > 10) return "최대 10글자까지 설정이 가능해요.";

    // 2 미만
    if (value.length < 2) return "최소 2글자부터 설정이 가능해요.";

    // 특수문자 포함(한글/영문/숫자만 허용)
    if (!/^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ]{2,10}$/.test(value)) return "특수문자는 사용이 불가해요.";

    return "";
  }, [nickname, touched]);

  const canProceed = useMemo(() => {
    return NICKNAME_REGEX.test(nickname);
  }, [nickname]);

  const onNext = () => {
    if (!canProceed) return;
    navigate("/");
  };

  return (
    <div>
      <main className="pt-[15px] pb-[110px]">
        <h2 className="text-[22px] font-semibold text-[#141517]">닉네임 설정</h2>
        <p className="pt-[13px] text-[14px] text-[#6C6C6C]">
          추후 프로필에서 변경이 가능해요
        </p>

        <input
          value={nickname}
          onChange={(e) => {
            if (!touched) setTouched(true);
            setNickname(e.target.value);
          }}
          onBlur={() => setTouched(true)}
          placeholder="닉네임 입력 (띄어쓰기 제외 2~10자)"
          className={`
            mt-[28px] h-[50px] w-full rounded-[12px] border-[1.2px]
            px-4 text-[16px] text-[#141517]
            placeholder:text-[#C2C4C7]
            focus:outline-none
            ${errorMessage}
          `}
        />
        {errorMessage && (
          <p className="mt-[10px] text-[12px] font-medium text-[#FF1D0D]">
            {errorMessage}
          </p>
        )}
      </main>

      <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-3">
        <BottomButton disabled={!canProceed} onClick={onNext}>
          다음
        </BottomButton>
      </div>
    </div>
  );
};

export default SetNamePage;
