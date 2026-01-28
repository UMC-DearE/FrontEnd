import { Suspense, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '@/components/bottomNav/BottomNav';
import { HEADER_REGISTRY } from '@/routes/header.registry';
import { ROUTE_META } from '@/routes/route.meta';

export type AppLayoutContext = {
  homeBgColor: string;
  setHomeBgColor: (color: string) => void;
};

export function AppLayout() {
  const { pathname } = useLocation();
  const [homeBgColor, setHomeBgColor] = useState('#F8F8F8');

  const matched = ROUTE_META.find((r) => r.match(pathname));
  const Header = matched ? HEADER_REGISTRY[matched.header] : null;

  const isLetterDetail = /^\/letter\/[^/]+/.test(pathname);
  const hideBottomNav =
    pathname.startsWith("/setup") ||
    pathname.startsWith("/create") ||
    isLetterDetail;
  const bgClass =
    matched?.bg === "white" ? "bg-white" : "bg-[#F8F8F8]";

  const useHomeBg = pathname === '/' || pathname.startsWith('/home');

  return (
    <div
      className={`h-screen flex flex-col ${bgClass}`}
      style={useHomeBg ? { backgroundColor: homeBgColor } : undefined}
    >
      {Header && (
        <Suspense fallback={null}>
          <div className="shrink-0">
            <Header title={matched?.title} />
          </div>
        </Suspense>
      )}

      <main className={`flex-1 overflow-y-auto px-4 py-4 ${!hideBottomNav ? 'pb-[95px]' : ''}`}>
        <Outlet context={{ homeBgColor, setHomeBgColor }} />
      </main>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}
