import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { ROUTE_META } from "@/routes/route.meta";
import { HEADER_REGISTRY } from "@/routes/header.registry";
import BottomNav from "@/components/bottomNav/BottomNav";

export function AppLayout() {
  const { pathname } = useLocation();

  const matched = ROUTE_META.find((r) => r.match(pathname));
  const Header = matched ? HEADER_REGISTRY[matched.header] : null;

  const hideBottomNav = pathname.startsWith("/setup")|| pathname.startsWith("/my/profile")
                        || pathname.startsWith("/my/account") || pathname.startsWith("my/style");
  const bgClass =
    matched?.bg === "white" ? "bg-white" : "bg-[#F8F8F8]";

  const NO_MAIN_PADDING_PATHS = ["/my", "/my/account"];
  const noMainPadding = NO_MAIN_PADDING_PATHS.includes(pathname);

  return (
    <div className={`h-screen flex flex-col ${bgClass}`}>
      {Header && (
        <Suspense fallback={null}>
          <div className="shrink-0">
            <Header title={matched?.title} />
          </div>
        </Suspense>
      )}

      <main
        className={[
          "flex-1 overflow-y-auto",
          noMainPadding ? "" : "px-4 py-4",
          !hideBottomNav ? "pb-[95px]" : "",
        ].join(" ")}
      >
        <Outlet />
      </main>
      
      {!hideBottomNav && <BottomNav />}
    </div>
  );
}




