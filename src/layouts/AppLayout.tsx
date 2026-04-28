import { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/bottomNav/BottomNav';
import { HEADER_REGISTRY } from '@/routes/header.registry';
import { ROUTE_META } from '@/routes/route.meta';
import { useStyleStore } from '@/stores/styleStores';
import { FONT_FAMILY } from '@/utils/fontMap';

export type AppLayoutContext = {
  homeBgColor: string;
  setHomeBgColor: (color: string) => void;
};

export function AppLayout() {
  const { pathname } = useLocation();
  const [homeBgColor, setHomeBgColor] = useState('#F8F8F8');
  const [fixedAction, setFixedAction] = useState<{
    node: React.ReactNode;
    bgColor?: string;
  } | null>(null);

  const font = useStyleStore((s) => s.font);

  useEffect(() => {
    const fontFamily = FONT_FAMILY[font] ?? 'Pretendard';
    document.documentElement.style.setProperty('--app-font', fontFamily);
  }, [font]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  const matched = ROUTE_META.find((r) => r.match(pathname));
  const Header = matched ? HEADER_REGISTRY[matched.header] : null;

  const hideHeader = matched?.hideHeader === true;
  const shouldShowHeader = !!Header && !hideHeader;

  const isLetterDetail = /^\/letter\/[^/]+/.test(pathname);
  const hideBottomNav =
    pathname.startsWith('/auth') ||
    pathname.startsWith('/my/profile') ||
    pathname.startsWith('/my/account') ||
    pathname.startsWith('/my/style') ||
    pathname.startsWith('/my/from') ||
    pathname.startsWith('/login') ||
    isLetterDetail ||
    pathname.startsWith('/create');

  const useHomeBg = pathname === '/' || pathname.startsWith('/home');

  const bgClass = matched?.bg === 'white' ? 'bg-white' : 'bg-[#F8F8F8]';

  const NO_MAIN_PADDING_PATHS = ['/my', '/my/account', '/letterbox', '/create/detail'];
  const noMainPadding =
    NO_MAIN_PADDING_PATHS.includes(pathname) ||
    (pathname.startsWith('/letter/') && pathname.endsWith('/edit'));

  const HEADER_HEIGHT = 78;
  const HEADER_SAFE_AREA = 'min(env(safe-area-inset-top, 0px), 32px)';
  const HEADER_CONTENT_GAP = 20;

  const BOTTOM_NAV_HEIGHT = 95;
  const FIXED_ACTION_HEIGHT = 52 + 20 + 16;
  const bottomInset = fixedAction ? FIXED_ACTION_HEIGHT : hideBottomNav ? 0 : BOTTOM_NAV_HEIGHT;

  return (
    <div
      className={`min-h-[max(700px,100dvh)] flex flex-col ${bgClass}`}
      style={{
        ...(useHomeBg ? { backgroundColor: homeBgColor } : {}),
        paddingBottom: `calc(${bottomInset}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {shouldShowHeader && (
        <Suspense fallback={null}>
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-[440px]">
              <Header title={matched?.title} />
            </div>
          </div>
        </Suspense>
      )}

      <main
        className="min-w-0 flex-1 flex flex-col"
        style={{
          paddingTop: shouldShowHeader
            ? `calc(${HEADER_SAFE_AREA} + ${HEADER_HEIGHT}px + ${HEADER_CONTENT_GAP}px)`
            : noMainPadding
              ? 0
              : HEADER_CONTENT_GAP,
        }}
      >
        <div className={`${noMainPadding ? '' : 'px-4'} w-full min-w-0 flex-1 flex flex-col`}>
          <Outlet context={{ homeBgColor, setHomeBgColor, setFixedAction }} />
        </div>
      </main>

      {fixedAction && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 flex justify-center pointer-events-none">
          <div
            className="w-full max-w-[440px] pt-3 pointer-events-auto"
            style={{
              background: fixedAction.bgColor ?? '#F8F8F8',
              paddingBottom: '52px',
            }}
          >
            <div className="px-4">{fixedAction.node}</div>
          </div>
        </div>
      )}

      {!hideBottomNav && !fixedAction && (
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] z-40 bg-white pb-safe-bottom">
          <BottomNav />
        </nav>
      )}
    </div>
  );
}
