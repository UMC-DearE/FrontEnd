import { useAuthStore } from '@/stores/authStore';
import { useStyleStore } from "@/stores/styleStores";
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { UserProfile, UpdateMeRequest, UpdateMeResponse, UploadImageResponse, ImageDir } from '@/types/user';

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
    const authStatus = useAuthStore.getState().authStatus;

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
      useAuthStore.getState().setAuthStatus("unauthenticated");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export async function logout() {
  try {
    // 서버: Redis refresh 삭제 + 쿠키 만료
    await api.post("/auth/logout");
  } finally {
    // 프론트: 메모리 access 토큰 제거 + 인증 상태 초기화
    delete api.defaults.headers.common.Authorization;
    useAuthStore.getState().setAuthStatus("unauthenticated");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    
    useStyleStore.getState().resetStyle();
    localStorage.removeItem("deare-style");
  }
}

export async function getMe(): Promise<UserProfile> {
  const res = await api.get('/users/me');
  return res.data.data as UserProfile;
}

export async function updateMe(payload: UpdateMeRequest): Promise<UpdateMeResponse> {
  const res = await api.patch('/users/me', payload);
  return res.data.data as UpdateMeResponse;
}

export async function uploadImage(file: File, dir: ImageDir): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("dir", dir);

  const res = await api.post("/images", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data.data as UploadImageResponse;
}