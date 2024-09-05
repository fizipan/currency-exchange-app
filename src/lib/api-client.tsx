import Axios, { InternalAxiosRequestConfig } from "axios";
import { toast } from "sonner";

import { refreshToken } from "@/features/auth/api/refresh-token";
import { Cookie } from "@/utils/storage";
import { env } from "@/config/env";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = Cookie.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = "application/json";
  return config;
}

export const api = Axios.create({
  baseURL: `${env.API_URL}`,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    // refresh token
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { token } = await refreshToken();
        Cookie.setToken(token);
        originalRequest.headers.authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (error) {
        Cookie.clearTokens();
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      "Something went wrong";
    toast.error(message);

    return Promise.reject(error);
  }
);
