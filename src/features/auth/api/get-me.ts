import { httpClient } from "@/shared/api/http-client";
import { PUBLIC_ROUTES } from "@/shared/api/public-routes";
import type { User } from "../types/auth.types";

export async function getMeApi(): Promise<User> {
  const { data } = await httpClient.get<User>(PUBLIC_ROUTES.me);
  return data;
}
