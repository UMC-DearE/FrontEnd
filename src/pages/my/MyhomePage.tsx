// 마이페이지

import { useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuItem from '@/components/my/MenuItem';
import kakaoIcon from '@/assets/myPage/kakaoIcon.svg';
import tagIcon from '@/assets/myPage/tagIcon.svg';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import ProfilePlaceholderIcon from '@/components/icons/ProfilePlaceholderIcon';
import type { MyProfileSectionProps } from '@/components/my/types';

import { useStyleStore } from '@/stores/styleStores';
import { useAuthStore } from '@/stores/authStore';

import { getMyTheme, serverFontToClient } from '@/api/theme';
import { useMeQuery } from '@/hooks/queries/useMeQuery';

const KAKAO_CHANNEL_URL = 'https://pf.kakao.com/_DIxexnX';

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="pb-[8px] font-semibold text-[13px] text-[#A1A4AA]">{children}</p>;
}

function Card({ children }: { children: ReactNode }) {
  return <div className="bg-white rounded-[10px] overflow-hidden">{children}</div>;
}

export function MyProfileSection({ nickname, profileImageUrl }: MyProfileSectionProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <div
        role="button"
        tabIndex={0}
        onClick={() => navigate('/my/profile')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') navigate('/my/profile');
        }}
        className="px-[20px] py-[24px] cursor-pointer active:bg-[#F7F7F8] focus:outline-none"
      >
        <div className="flex items-center gap-[12px]">
          <div className="w-[60px] h-[60px] rounded-full border-[1.7px] border-[#E6E7E9] shrink-0">
            <div className="w-full h-full rounded-full bg-[#F2F3F5] flex items-center justify-center overflow-hidden">
              {profileImageUrl ? (
                <img src={profileImageUrl} alt="프로필 이미지" className="w-full h-full object-cover" />
              ) : (
                <ProfilePlaceholderIcon size={28} />
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <span className="block font-semibold text-[15px] truncate">{nickname}</span>
            <p className="font-medium text-[12px] text-[#A1A4AA] mt-[5px]">프로필 수정</p>
          </div>

          <ChevronRightIcon />
        </div>
      </div>
    </Card>
  );
}

export default function MyhomePage() {
  const setFont = useStyleStore((s) => s.setFont);
  const setAuthStatus = useAuthStore((s) => s.setAuthStatus);

  const navigate = useNavigate();

  const { data: me, isError: isMeError } = useMeQuery();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const theme = await getMyTheme();
        if (!mounted) return;
        setFont(serverFontToClient(theme.font));
      } catch {
        setAuthStatus('unauthenticated');
        navigate('/login', { replace: true });
      }
    })();
    return () => {
      mounted = false;
    };
  }, [navigate, setAuthStatus, setFont]);

  useEffect(() => {
    if (isMeError) {
      setAuthStatus('unauthenticated');
      navigate('/login', { replace: true });
    }
  }, [isMeError, navigate, setAuthStatus]);

  return (
    <main
      className="
        w-full min-w-[320px] max-w-[440px]
        min-h-[700px] h-auto
        mx-auto
        bg-[#F5F6F7]
        px-[16px] pt-[8px] pb-[32px]
        flex flex-col gap-[24px]
      "
    >
      <section>
        <SectionLabel>프로필</SectionLabel>
        <MyProfileSection nickname={me?.nickname || '사용자'} profileImageUrl={me?.profileImageUrl ?? null} />
      </section>

      <section>
        <SectionLabel>편지함 설정</SectionLabel>
        <Card>
          <MenuItem label="폰트 변경" onClick={() => navigate('/my/style')} />
          <MenuItem label="From 관리" onClick={() => navigate('/my/from')} dividerClassName="" />
        </Card>
      </section>

      <section>
        <SectionLabel>계정 및 정보</SectionLabel>
        <Card>
          <MenuItem label="계정 관리" onClick={() => navigate('/my/account')} />
          <MenuItem
            label="문의하기"
            onClick={() => window.open(KAKAO_CHANNEL_URL, '_blank', 'noopener,noreferrer')}
            rightIcon={<img src={kakaoIcon} alt="" className="w-[22px] h-[22px]" />}
          />
          <MenuItem
            label="서비스 이용약관"
            onClick={() =>
              window.open(
                'https://www.notion.so/35b1829bd7ed807b8067ff1e134ad299?source=copy_link',
                '_blank'
              )
            }
          />
          <MenuItem
            label="개인정보 처리방침"
            onClick={() =>
              window.open(
                'https://www.notion.so/35b1829bd7ed80699a43f1ac16fefc7f?source=copy_link',
                '_blank'
              )
            }
            dividerClassName=""
          />
        </Card>
      </section>

      <div className="flex gap-[4px]">
        <img src={tagIcon} alt="" className="w-[16px] h-[16px]" />
        <span className="font-medium text-[14px] text-[#A1A4AA]">v.1.0.0</span>
      </div>
    </main>
  );
}