// 인증 라우트 가드

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function RequireAuth() {
  const authStatus = useAuthStore((s) => s.authStatus);
  const location = useLocation();

  if (authStatus === "checking") {
    return <div>로딩 중...</div>;
  }

  if (authStatus === "signup_required") {
  return <Navigate to="/auth/terms" replace />;
}

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
