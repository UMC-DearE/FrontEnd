// 인증 라우트 가드

import { useEffect, useRef } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useStyleStore } from '@/stores/styleStores';
import { getMyTheme, serverFontToClient } from '@/api/theme';

export default function RequireAuth() {
  const authStatus = useAuthStore((s) => s.authStatus);
  const location = useLocation();

  const setFont = useStyleStore((s) => s.setFont);
  const fontFetchedRef = useRef(false);

  useEffect(() => {
    if (authStatus === 'authenticated' && !fontFetchedRef.current) {
      fontFetchedRef.current = true;

      (async () => {
        try {
          const theme = await getMyTheme();
          setFont(serverFontToClient(theme.font));
        } catch (e) {
          console.error(e);
        }
      })();
    }

    // 로그아웃되면 다음 로그인 때 다시 fetch 하도록 리셋
    if (authStatus === 'unauthenticated') {
      fontFetchedRef.current = false;
    }
  }, [authStatus, setFont]);

  if (authStatus === 'checking') {
    return <div>로딩 중...</div>;
  }

  if (authStatus === 'signup_required') {
    return <Navigate to="/auth/terms" replace />;
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}