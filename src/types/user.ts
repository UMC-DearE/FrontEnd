export type MembershipPlan = "FREE" | "PLUS";

export interface UserProfile {
  userId: number;
  nickname: string;
  intro: string | null;
  profileImageUrl: string | null;
  membershipPlan: MembershipPlan;
}

export interface UpdateMeRequest {
  nickname?: string;
  intro?: string;
  imageId?: number;
  resetProfileImage?: boolean;
}

export interface UpdateMeResponse {
  userId: number;
  nickname: string;
  intro: string | null;
  profileImageUrl: string | null;
}

export type ImageDir = "profile" | "letter" | "sticker" | "folder";

export interface UploadImageResponse {
  imageId: number;
  key: string;
  url: string;
}