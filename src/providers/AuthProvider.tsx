// 재발급 실패하면 unauthenticated - access token은 날아감 새로고침 시

import { useEffect, useRef } from "react";
import { api } from "@/api/http";
import { useAuthStore } from "@/stores/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { authStatus, setAuthStatus } = useAuthStore();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    if (authStatus !== "checking") return;

    didInit.current = true;

    const initAuth = async () => {
      try {
        await api.post("/auth/jwt/refresh");
        setAuthStatus("authenticated");
      } catch {
        setAuthStatus("unauthenticated");
      }
    };

    initAuth();
  }, [authStatus, setAuthStatus]);

  return <>{children}</>;
}

