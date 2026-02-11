export type MembershipPlan = "FREE" | "PLUS";

export interface UserProfile {
  userId: number;
  nickname: string;
  intro: string | null;
  profileImageUrl: string | null;
  membershipPlan: MembershipPlan;
}

