import { Suspense, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/bottomNav/BottomNav';
import { HEADER_REGISTRY } from '@/routes/header.registry';
import { ROUTE_META } from '@/routes/route.meta';
import { useStyleStore } from '@/stores/styleStores';
import { FONT_FAMILY } from "@/utils/fontMap";

export type AppLayoutContext = {
  homeBgColor: string;
  setHomeBgColor: (color: string) => void;
};

export function AppLayout() {
  const { pathname } = useLocation();
  const [homeBgColor, setHomeBgColor] = useState('#F8F8F8');
  const [fixedAction, setFixedAction] = useState<
    | { node: React.ReactNode; bgColor?: string }
    | null
  >(null);

  const font = useStyleStore((s) => s.font);

  useEffect(() => {
    const fontFamily = FONT_FAMILY[font] ?? "Pretendard";
    document.documentElement.style.setProperty("--app-font", fontFamily);
  }, [font]);

  const matched = ROUTE_META.find((r) => r.match(pathname));
  const Header = matched ? HEADER_REGISTRY[matched.header] : null;

  const isLetterDetail = /^\/letter\/[^/]+/.test(pathname);
  const hideBottomNav = pathname.startsWith("/setup")|| pathname.startsWith("/my/profile")
                        || pathname.startsWith("/my/account") || pathname.startsWith("/my/style") || pathname.startsWith("/my/from")
                        || pathname.startsWith("/login") || isLetterDetail
                        || pathname.startsWith("/create");

  const useHomeBg = pathname === '/' || pathname.startsWith('/home');
  
  const bgClass =
    matched?.bg === "white" ? "bg-white" : "bg-[#F8F8F8]";

  const NO_MAIN_PADDING_PATHS = ["/my", "/my/account"];
  const noMainPadding = NO_MAIN_PADDING_PATHS.includes(pathname);
  const HEADER_HEIGHT = 105;
  const BOTTOM_NAV_HEIGHT = 95;
  const FIXED_ACTION_HEIGHT = 52 + 28 + 16;
  const BASE_PADDING = 16;

  const bottomInset = fixedAction
    ? FIXED_ACTION_HEIGHT
    : hideBottomNav
      ? 0
      : BOTTOM_NAV_HEIGHT;

  return (
    <div
      className={`min-h-screen flex flex-col ${bgClass}`}
      style={{
        ...(useHomeBg ? { backgroundColor: homeBgColor } : {}),
        paddingBottom: bottomInset,
      }}
    >
      {Header && (
        <Suspense fallback={null}>
          <div
            className="fixed top-0 left-0 right-0 z-50 flex justify-center"
            style={{ paddingTop: 'env(safe-area-inset-top)' }}
          >
            <div className="w-full max-w-[393px]">
              <Header title={matched?.title} />
            </div>
          </div>
        </Suspense>
      )}

      <main
        className={[
          noMainPadding ? "" : "px-4",
        ].join(" ")}
        style={{
                    paddingTop: Header
                ? `calc(${HEADER_HEIGHT}px + ${
                    noMainPadding ? 0 : BASE_PADDING
                  }px + env(safe-area-inset-top))`
                : noMainPadding
                  ? 0
                  : BASE_PADDING,
            }}
            >
        <Outlet context={{ homeBgColor, setHomeBgColor, setFixedAction }} />
      </main>

      {fixedAction && (
        <div className="fixed bottom-0 inset-x-0 z-40 flex justify-center pointer-events-none">
          <div
            className="w-full max-w-[393px] pt-3 pb-[52px] pointer-events-auto"
            style={{ background: fixedAction.bgColor ?? '#F8F8F8' }}
          >
            <div className="px-4">
              {fixedAction.node}
            </div>
          </div>
        </div>
      )}

      {!hideBottomNav && !fixedAction && (
        <nav className="fixed bottom-0 inset-x-0 z-40 flex justify-center bg-white">
          <div className="w-full max-w-[393px]">
            <BottomNav />
          </div>
        </nav>
      )}
    </div>
  );
}
