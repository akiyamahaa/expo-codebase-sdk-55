import type {
  ApiErrorResponse,
  SignUpPayload,
  SignUpResponse,
} from "../types/auth.types";

const API_URL = process.env.EXPO_PUBLIC_API_URL?.trim();

export class SignUpApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string[]>;

  constructor(
    message: string,
    status = 500,
    code?: string,
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "SignUpApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

export async function signUpApi(
  payload: SignUpPayload
): Promise<SignUpResponse> {
  if (!API_URL) {
    throw new SignUpApiError(
      "EXPO_PUBLIC_API_URL is not configured",
      500,
      "API_URL_MISSING"
    );
  }

  const response = await fetch(`${API_URL}/auth/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    }),
  });

  const body = await parseResponse(response);

  if (!response.ok) {
    throw mapToApiError(body, response.status);
  }

  if (!isValidSignUpResponse(body)) {
    throw new SignUpApiError(
      "Invalid sign-up response format",
      500,
      "INVALID_SIGNUP_RESPONSE"
    );
  }

  return body;
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";

  if (!contentType.includes("application/json")) {
    const text = await response.text();
    return text || null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

function mapToApiError(body: unknown, status: number): SignUpApiError {
  if (typeof body === "string" && body.trim()) {
    return new SignUpApiError(body, status);
  }

  if (body && typeof body === "object") {
    const error = body as Partial<ApiErrorResponse>;

    return new SignUpApiError(
      error.message || "Sign up failed",
      status,
      error.code,
      error.errors
    );
  }

  return new SignUpApiError("Sign up failed", status);
}

function isValidSignUpResponse(body: unknown): body is SignUpResponse {
  if (!body || typeof body !== "object") return false;

  const data = body as SignUpResponse;
  return typeof data.message === "string";
}
