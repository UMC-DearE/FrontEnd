import { api } from "@/api/http";

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type MembershipPlan = "FREE" | "PLUS";

export type MembershipStatusData = {
  membershipPlan: MembershipPlan;
  isPlus: boolean;
};

export type MembershipPayData = {
  membershipPlan: MembershipPlan;
  isPlus: boolean;
  updatedAt: string;
};

export async function getMyMembership() {
  const res = await api.get<ApiResponse<MembershipStatusData>>(
    "/users/me/membership"
  );
  return res.data.data;
}

export async function payMyMembershipTemp() {
  const res = await api.post<ApiResponse<MembershipPayData>>(
    "/users/me/membership"
  );
  return res.data.data;
}
