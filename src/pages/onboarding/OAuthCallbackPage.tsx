import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { api } from '@/api/http';

type ResultType = 'SIGNUP_REQUIRED' | 'REGISTERED';

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
      const code = params.get('code');
      const state = params.get('state');

      if (!code || !provider) {
        setAuthStatus('unauthenticated');
        navigate('/login', { replace: true });
        return;
      }

      const res = await api.get(`/auth/oauth2/${provider}/callback`, {
        params: { code, state },
      });

      const resultType = res.data?.data?.resultType as ResultType | undefined;

      if (resultType === 'SIGNUP_REQUIRED') {
        setAuthStatus('signup_required');
        navigate('/auth/terms', { replace: true });
        return;
      }

      if (resultType === 'REGISTERED') {
        setAuthStatus('authenticated');
        navigate('/', { replace: true });
        return;
      }

      setAuthStatus('unauthenticated');
      navigate('/login', { replace: true });
    };

    run().catch(() => {
      setAuthStatus('unauthenticated');
      navigate('/login', { replace: true });
    });
  }, [navigate, params, provider, setAuthStatus]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm font-medium">
      로그인 처리 중...
    </div>
  );
}
