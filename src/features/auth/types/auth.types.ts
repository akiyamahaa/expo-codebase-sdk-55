export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  roles: string[];
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInResponse {
  accessToken: string;
  user: User;
}

export interface SignUpResponse {
  message: string;
  email?: string;
  verificationId?: string;
  expiresAt?: string;
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  errors?: Record<string, string[]>;
}
