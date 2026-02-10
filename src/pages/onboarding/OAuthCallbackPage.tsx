import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { api } from "@/api/http";

type ResultType = "SIGNUP_REQUIRED" | "REGISTERED";

export default function OAuthCallbackPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { provider } = useParams();

  const setAuthStatus = useAuthStore.getState().setAuthStatus;

  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const run = async () => {
      const code = params.get("code");  
      const state = params.get("state");

      // console.log("[OAuthCallback] code/state/provider =", { code, state, provider });

      if (!code || !provider) {
        navigate("/login", { replace: true });
        return;
      }

      const base = import.meta.env.VITE_API_BASE_URL;

      const res = await api.get(
        `${base}/auth/oauth2/${provider}/callback`,
        {
          params: { code, state },
          withCredentials: true,
          headers: { accept: "*/*" },
        }
      );

      // console.log("[OAuthCallback] response =", res.data);

      const resultType = res.data?.data?.resultType as ResultType | undefined;

      if (resultType === "SIGNUP_REQUIRED") {
        setAuthStatus("signup_required");
        navigate("/auth/terms", { replace: true });
      } else if (resultType === "REGISTERED") {
        setAuthStatus("authenticated");
        navigate("/", { replace: true });
      } else {
        setAuthStatus("unauthenticated");
        navigate("/login", { replace: true });
      }
    };

    run().catch((e) => {
      console.error("[OAuthCallback] failed:", e);
      setAuthStatus("unauthenticated");
      navigate("/login", { replace: true });
    });
  }, [navigate, params, provider, setAuthStatus]);

  return <div>로그인 처리 중...</div>;
}
