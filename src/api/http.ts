import axios from "axios";

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
  async (error) => {
    const originalRequest = error.config as
      | (typeof error.config & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/jwt/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await refreshApi.post("/auth/jwt/refresh");

        const authHeader = refreshRes.headers?.authorization as string | undefined;
        if (authHeader) {
          api.defaults.headers.common.Authorization = authHeader;
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = authHeader;
        }

        return api(originalRequest);
      } catch (e) {
        // refresh 실패 -> 세션 종료
        delete api.defaults.headers.common.Authorization;
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
