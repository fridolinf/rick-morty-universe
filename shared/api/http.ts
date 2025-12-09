import { API_CONFIG } from "@/config/api.config";
import axios from "axios";

export type TAppError = {
  message: string;
  status?: number;
  code?: string;
};

export class AppError extends Error {
  status?: number;
  code?: string;

  constructor(payload: TAppError) {
    super(payload.message);
    this.status = payload.status;
    this.code = payload.code;
  }
}

export function toAppError(err: unknown): AppError {
  if (axios.isAxiosError(err)) {
    const errResponse = err.response;
    const errData = errResponse?.data;
    const status = errResponse?.status;
    const message =
      errData?.error ||
      (err.request
        ? "Network error, please check your connection"
        : err.message) ||
      "Request failed";

    return new AppError({
      message,
      status,
      code: errData?.code,
    });
  }

  if (err instanceof Error) {
    return new AppError({ message: err.message });
  }

  return new AppError({
    message: "Unexpected error",
  });
}

export const http = axios.create({
  baseURL: API_CONFIG.API_BASE_URL,
  timeout: 30_000,
});

http.interceptors.response.use(
  (res) => res,
  (err) => {
    throw toAppError(err);
  }
);
