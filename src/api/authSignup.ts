import { api } from "./http";

export type TermType = "SERVICE" | "PRIVACY" | "MARKETING";

export type ApiTerm = {
  termId: number;
  title: string;
  type: TermType;
  content: string;
  isRequired: boolean;
  effectiveAt: string;
  version: string;
  isActive: boolean;
};

export async function getSignupTerms() {
  const res = await api.get("/auth/terms");
  return res.data.data.terms as ApiTerm[];
}

export async function postSignup(payload: { nickname: string; termIds: number[] }) {
  const res = await api.post("/auth/signup", payload);
  return res.data;
}

export async function postJwtRefresh() {
  const res = await api.post("/auth/jwt/refresh");
  return res.data;
}
