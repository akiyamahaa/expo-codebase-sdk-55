import env from "@/config/env";
import axios, { AxiosError } from "axios";
import { ApiError, toApiError } from "./api-error";
import { notifyUnauthorized, readAccessToken } from "./auth-token";

const API_URL = env.API_URL;

export const httpClient = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  (config) => {
    if (!API_URL) {
      throw new ApiError(
        "EXPO_PUBLIC_API_URL is not configured",
        500,
        "API_URL_MISSING"
      );
    }

    const token = readAccessToken();
    const requiresAuth = config.requiresAuth ?? true;

    if (requiresAuth && token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(toApiError(error))
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const normalizedError = toApiError(error);
    const status = error.response?.status;
    const requiresAuth = error.config?.requiresAuth ?? true;

    if (status === 401 && requiresAuth) {
      await notifyUnauthorized();
    }

    return Promise.reject(normalizedError);
  }
);
