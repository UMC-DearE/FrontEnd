import { useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { isAxiosError } from 'axios';
import PageKeep from '@/components/onboarding/PageKeep';
import PageAI from '@/components/onboarding/PageAI';
import PageArchive from '@/components/onboarding/PageArchive';
import PageAnalyze from '@/components/onboarding/PageAnalyze';
import { SocialLoginButton } from '@/components/common/SocialLoginButton';
import { getOAuthAuthorizeUrl } from '@/api/auth';
import type { CommonResponse } from '@/types/common';
import {
  clearPendingInviteCode,
  readPendingInviteCode,
  savePendingInviteCode,
} from '@/utils/inviteCode';

export default function LoginPage() {
  const [pageIdx, setPageIdx] = useState(0);
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const startX = useRef<number | null>(null);
  const deltaX = useRef<number>(0);

  const pages = useMemo(
    () => [
      { id: 'keep', node: <PageKeep /> },
      { id: 'ai', node: <PageAI /> },
      { id: 'home', node: <PageArchive /> },
      { id: 'analyze', node: <PageAnalyze /> },
    ],
    []
  );

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    startX.current = e.clientX;
    deltaX.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startX.current == null) return;
    deltaX.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (startX.current == null) return;

    const dx = deltaX.current;
    const threshold = 60;

    if (dx <= -threshold) {
      setPageIdx((p) => (p < pages.length - 1 ? p + 1 : p));
    } else if (dx >= threshold) {
      setPageIdx((p) => (p > 0 ? p - 1 : p));
    }

    startX.current = null;
    deltaX.current = 0;
  };

  // 서버가 발급하는 초대 링크 -> 쿼리에서 먼저 읽어 보관
  const startOAuth = async (provider: 'kakao' | 'google') => {
    const fromQuery = params.get('inviteCode')?.trim();
    if (fromQuery) savePendingInviteCode(fromQuery);

    const inviteCode = fromQuery || readPendingInviteCode() || undefined;

    try {
      const url = await getOAuthAuthorizeUrl(provider, inviteCode);
      window.location.href = url;
    } catch (e) {
      // 서버가 authorize 단계에서 초대 코드를 검증하므로, 만료/위조된 코드는 여기서 걸림
      const code = isAxiosError<CommonResponse>(e) ? e.response?.data?.code : undefined;
      if (code === 'INVITE_40401') {
        clearPendingInviteCode();
        navigate('/invite/invalid');
        return;
      }
      throw e;
    }
  };

  const onKakaoLogin = () => startOAuth('kakao');
  const onGoogleLogin = () => startOAuth('google');

  return (
    <div className="w-full max-w-[440px] mx-auto flex flex-col min-w-0">
      <div className="flex flex-1 flex-col pt-4 pb-[59px] min-w-0">
        {/* 이 안(스와이프 영역)만 캐러셀처럼 넘어가고, 아래 인디케이터/로그인 버튼은 고정 */}
        <div
          style={{ touchAction: 'pan-y' }}
          className="relative mt-15 w-full overflow-hidden min-w-0"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex w-full transition-transform duration-500 ease-out min-w-0"
            style={{ transform: `translateX(-${pageIdx * 100}%)` }}
          >
            {pages.map((p) => (
              <div key={p.id} className="w-full shrink-0 min-w-0">
                {p.node}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[42px] mb-[85px] flex justify-center gap-[10px]">
          {pages.map((_, i) => (
            <span
              key={i}
              className={`h-[6px] w-[6px] rounded-full transition-all ${
                i === pageIdx ? 'bg-[#FF5F2F]' : 'bg-[#E6E7E9]'
              }`}
            />
          ))}
        </div>

        <div className="shrink-0 space-y-4 flex flex-col items-center min-w-0">
          <div className="w-full">
            <SocialLoginButton provider="kakao" onClick={onKakaoLogin} />
          </div>
          <div className="w-full">
            <SocialLoginButton provider="google" onClick={onGoogleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
}
