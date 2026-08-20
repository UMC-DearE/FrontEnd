import { useAuthStore } from '@/stores/authStore';
import { useStyleStore } from '@/stores/styleStores';
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { UserProfile, UpdateMeRequest, UpdateMeResponse } from '@/types/user';
import { normalizeImageUrl } from './upload';
import { clearQueryCacheOnAuthChange } from './queryClient';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { accept: '*/*' },
});

// 토큰 재발급 전용 (기존 api 인터셉터 안 탐)
const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// 로그인 여부와 무관하게 항상 "인증 헤더 없이" 호출해야 하는 공개 API 전용
// (예: /auth/terms - 가입 전/후 상관없이 순수 조회용)
// api.defaults.headers.common.Authorization 이 전역으로 박제되는 영향을 받지 않음
export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { accept: '*/*' },
});

let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (response) => {
    // authorization 헤더가 포함된 응답이 있으면
    // access token을 메모리에 최신값으로 동기화
    const authHeader = response.headers?.authorization as string | undefined;
    if (authHeader) {
      api.defaults.headers.common.Authorization = authHeader;
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;

    // 조건 정리
    const is401 = error.response?.status === 401;
    const isRefreshRequest = originalRequest?.url?.includes('/auth/jwt/refresh');
    const { authStatus } = useAuthStore.getState();

    if (authStatus !== 'authenticated' && authStatus !== 'checking') {
      return Promise.reject(error);
    }

    if (!is401 || !originalRequest || originalRequest._retry || isRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 이미 refresh 중이면 큐에 쌓아서 대기 - 동시에 재발급 하면 오류 생김
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token: string) => {
          if (!originalRequest.headers) {
            originalRequest.headers = {};
          }
          originalRequest.headers.Authorization = token;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshRes = await refreshApi.post('/auth/jwt/refresh');

      const newAuthHeader = refreshRes.headers?.authorization as string | undefined;
      if (!newAuthHeader) {
        throw new Error('Authorization header missing on refresh response');
      }

      // 전역 access token 갱신
      api.defaults.headers.common.Authorization = newAuthHeader;

      onRefreshed(newAuthHeader);

      // 현재 요청 재시도
      if (!originalRequest.headers) {
        originalRequest.headers = {};
      }
      originalRequest.headers.Authorization = newAuthHeader;

      return api(originalRequest);
    } catch (refreshError) {
      delete api.defaults.headers.common.Authorization;
      useAuthStore.getState().setAuthStatus('unauthenticated');
      clearQueryCacheOnAuthChange();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export async function logout() {
  try {
    // 서버: Redis refresh 삭제 + 쿠키 만료
    await api.post('/auth/logout');
  } finally {
    // 프론트: 메모리 access 토큰 제거 + 인증 상태 초기화
    delete api.defaults.headers.common.Authorization;
    useAuthStore.getState().setAuthStatus('unauthenticated');

    useStyleStore.getState().resetStyle();
    localStorage.removeItem('deare-style');

    // 다음 계정이 이전 계정의 캐시(me, inviteLink 등)를 읽지 않도록 전부 폐기
    clearQueryCacheOnAuthChange();
  }
}

export async function getMe(): Promise<UserProfile> {
  const res = await api.get('/users/me');
  const me = res.data.data as UserProfile;

  if (me.profileImageUrl) {
    me.profileImageUrl = normalizeImageUrl(me.profileImageUrl);
  }

  return me;
}

export async function updateMe(payload: UpdateMeRequest): Promise<UpdateMeResponse> {
  const res = await api.patch('/users/me', payload);
  const updated = res.data.data as UpdateMeResponse;

  if (updated.profileImageUrl) {
    updated.profileImageUrl = normalizeImageUrl(updated.profileImageUrl);
  }

  return updated;
}

export async function deleteMe(): Promise<void> {
  await api.delete('/users/me');
}
