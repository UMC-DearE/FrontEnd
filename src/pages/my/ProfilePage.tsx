// 프로필 수정 페이지

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BottomButton } from "@/components/common/BottomButton";
import ProfilePlaceholderIcon from "@/components/icons/ProfilePlaceholderIcon";
import { getMe, updateMe, uploadImage } from "@/api/http";

const MAX_INTRO = 20;
const NICKNAME_REGEX = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ ]+$/;

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [touched, setTouched] = useState(false);

  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const [initialNickname, setInitialNickname] = useState<string>("");
  const [initialIntro, setInitialIntro] = useState<string>("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const me = await getMe();
        if (!mounted) return;

        setNickname(me.nickname);
        setIntro(me.intro ?? "");
        setProfileImageUrl(me.profileImageUrl);

        setInitialNickname(me.nickname);
        setInitialIntro(me.intro ?? "");
      } catch {
        navigate("/login", { replace: true });
      }
    })();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const errorMessage = useMemo(() => {
    if (!touched) return "";

    const value = nickname;

    if (value.length === 0) return "";
    // 길이 제한(10 초과)
    if (value.length > 10) return "최대 10글자까지 설정이 가능해요.";
    // 2 미만
    if (value.length < 2) return "최소 2글자부터 설정이 가능해요.";
    // 특수문자 포함(한글/영문/숫자만 허용)
    if (!NICKNAME_REGEX.test(value)) {
      return "특수문자는 사용이 불가해요.";
    }
    return "";
  }, [nickname, touched]);

  const introError = useMemo(() => {
    if (!intro) return "";
    if (intro.length > MAX_INTRO) return `소개는 띄어쓰기 포함 최대 ${MAX_INTRO}자까지입니다.`;
    return "";
  }, [intro]);

  const isChanged = useMemo(() => {
    const nickChanged = nickname.trim() !== initialNickname.trim();
    const introChanged = intro.trim() !== initialIntro.trim();

    const imageChanged = uploadedImageId !== null;

    return nickChanged || introChanged || imageChanged;
  }, [nickname, intro, initialNickname, initialIntro, uploadedImageId]);

  const canSave = useMemo(() => {
    const nicknameOk = nickname.length > 0 && !errorMessage;
    const introOk = !introError;
    return nicknameOk && introOk && isChanged && !saving && !uploading;
  }, [nickname, errorMessage, introError, isChanged, saving, uploading]);

  const onPickImage = () => fileRef.current?.click();

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = async(e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    try {
      setUploading(true);

      const uploaded = await uploadImage(file, "profile");
      setUploadedImageId(uploaded.imageId);
    } finally {
      setUploading(false);
    }

    e.target.value = "";
  };

  const onSubmit = async () => {
    if (!canSave) return;

    try {
      setSaving(true);

      await updateMe({
        nickname: nickname.trim(),
        intro: intro.trim() === "" ? undefined : intro.trim(),
        ...(uploadedImageId ? { imageId: uploadedImageId } : {}),
      });

      navigate(-1);
    } finally {
      setSaving(false);
    }
  };

  const shownImage = previewUrl ?? profileImageUrl;

  return (
    <div className="min-h-screen bg-white">
      <div>
        <div className="flex flex-col items-center">
          <div className="h-[80px] w-[80px] rounded-full bg-[#F2F3F5] flex items-center justify-center overflow-hidden">
            {shownImage ? (
              <img src={shownImage} alt="profile" className="h-full w-full object-cover" />
            ) : (
              <ProfilePlaceholderIcon size={34} />
            )}
          </div>

          <button
            type="button"
            onClick={onPickImage}
            className="mt-[15px] h-[25px] px-2 rounded-[4px] bg-[#555557] text-white text-[12px] font-medium"
          >
            이미지 업로드
          </button>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChangeFile}
          />
        </div>

        <div className="mt-[31px] space-y-[30px]">
          <div>
            <label className="block text-[12px] font-medium text-[#555557] mb-[10px]">
              닉네임
            </label>
            <input
              value={nickname}
              onChange={(e) => {
                if (!touched) setTouched(true);
                setNickname(e.target.value);
              }}
              onBlur={() => setTouched(true)}
              placeholder="닉네임 입력 (띄어쓰기 제외 2~10자)"
              className={[
                "h-[50px] w-full rounded-[12px] border-[1.2px]",
                "px-4 text-[16px] text-[#141517]",
                "placeholder:text-[#C2C4C7]",
                "border-[#C2C4C7]",
                "focus:border-[#141517]",
                "focus:outline-none",
              ].join(" ")}
            />
            <div className="mt-[6px] h-[14px]">
                {errorMessage && (
                  <p className="text-[12px] font-medium text-[#FF1D0D]">
                    {errorMessage}
                  </p>
                )}
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-medium text-[#555557] mb-[10px]">
              소개
            </label>
            <input
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              placeholder="소개를 입력해 주세요"
              className={[
                "h-[50px] w-full rounded-[12px] border-[1.2px]",
                "px-4 text-[16px] text-[#141517]",
                "placeholder:text-[#C2C4C7]",
                "border-[#C2C4C7]",
                "focus:border-[#141517]",
                "focus:outline-none",
              ].join(" ")}
            />
            <div className="mt-[6px] h-[14px]">
              {introError && (
                <p className="text-[12px] font-medium text-[#FF1D0D]">
                  {introError}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-1/2 w-full max-w-[393px] -translate-x-1/2 bg-white px-4 pb-[52px] pt-3">
          <BottomButton disabled={!canSave} onClick={onSubmit}>
            저장
          </BottomButton>
        </div>
      </div>
    </div>
  );
}
