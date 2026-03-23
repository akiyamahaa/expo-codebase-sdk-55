import { ApiError } from "@/shared/api/api-error";
import { httpClient } from "@/shared/api/http-client";
import { SignInPayload, SignInResponse } from "../types/auth.types";

export class SignInApiError extends ApiError {
  constructor(
    message: string,
    status = 500,
    code?: string,
    errors?: Record<string, string[]>,
    data?: unknown
  ) {
    super(message, status, code, errors, data);
    this.name = "SignInApiError";
  }
}

export async function signInApi(
  payload: SignInPayload
): Promise<SignInResponse> {
  try {
    const response = await httpClient.post<SignInResponse>(
      "/auth/sign-in",
      {
        email: payload.email.trim().toLowerCase(),
        password: payload.password,
      },
      {
        requiresAuth: false,
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw new SignInApiError(
        error.message,
        error.status,
        error.code,
        error.errors,
        error.data
      );
    }

    throw new SignInApiError("Sign in failed");
  }
}
