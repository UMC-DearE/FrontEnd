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

  const NO_MAIN_PADDING_PATHS = ['/my', '/my/account', 'letterbox' ,'/create/detail'];
  const noMainPadding =
  NO_MAIN_PADDING_PATHS.includes(pathname) ||
  (pathname.startsWith('/letter/') && pathname.endsWith('/edit'));

  const HEADER_HEIGHT = 105;
  const BOTTOM_NAV_HEIGHT = 95;
  const FIXED_ACTION_HEIGHT = 52 + 28 + 16;

  const bottomInset = fixedAction ? FIXED_ACTION_HEIGHT : hideBottomNav ? 0 : BOTTOM_NAV_HEIGHT;

  return (
    <div
      className={`min-h-screen flex flex-col ${bgClass}`}
      style={{
        ...(useHomeBg ? { backgroundColor: homeBgColor } : {}),
        paddingBottom: `calc(${bottomInset}px + env(safe-area-inset-bottom, 0px))`,
      }}
    >
      {shouldShowHeader && (
        <Suspense fallback={null}>
          <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-[393px]">
              <Header title={matched?.title} />
            </div>
          </div>
        </Suspense>
      )}

      <main
        className={[noMainPadding ? '' : 'px-4'].join(' ')}
        style={{
          paddingTop: shouldShowHeader ? `calc(${HEADER_HEIGHT}px + 20px)` : noMainPadding ? 0 : 20,
        }}
      >
        <Outlet context={{ homeBgColor, setHomeBgColor, setFixedAction }} />
      </main>

      {fixedAction && (
        <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none">
          <div
            className="w-full max-w-[393px] pt-3 pointer-events-auto pb-safe-bottom"
            style={{
              background: fixedAction.bgColor ?? '#F8F8F8',
              paddingBottom: `calc(52px + env(safe-area-inset-bottom, 0px))`,
            }}
          >
            <div className="px-4">{fixedAction.node}</div>
          </div>
        </div>
      )}

      {!hideBottomNav && !fixedAction && (
        <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-center bg-white pb-safe-bottom">
          <div className="w-full max-w-[393px]">
            <BottomNav />
          </div>
        </nav>
      )}
    </div>
  );
}
