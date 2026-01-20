import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { ROUTE_META } from "@/routes/route.meta";
import { HEADER_REGISTRY } from "@/routes/header.registry";
import BottomNav from "@/components/bottomNav/BottomNav";

export function AppLayout() {
  const { pathname } = useLocation();

  const matched = ROUTE_META.find((r) => r.match(pathname));
  const Header = matched ? HEADER_REGISTRY[matched.header] : null;

  const hideBottomNav = pathname.startsWith("/setup");
  const bgClass =
    matched?.bg === "white" ? "bg-white" : "bg-[#F8F8F8]";

  return (
    <div className={`h-screen flex flex-col ${bgClass}`}>
      {Header && (
        <div className="shrink-0">
          <Header title={matched?.title} />
        </div>
      )}

      <main
        className={`
          flex-1 overflow-y-auto px-4 py-4
          ${!hideBottomNav ? "pb-[95px]" : ""}
        `}
      >
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
      
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}



