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
    <div className={`min-h-screen ${bgClass}`}>
      <Suspense fallback={null}>
        {Header && <Header title={matched?.title} />}
      </Suspense>

      <main className={`px-4 py-4 ${!hideBottomNav ? "pb-[95px]" : ""}`}>
        <Outlet />
      </main>

      {!hideBottomNav && <BottomNav />}
    </div>
  );
}





