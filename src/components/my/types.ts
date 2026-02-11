export interface MyProfileSectionProps {
  nickname: string;
  profileImageUrl: string | null;
  isPlus: boolean; // 도메인 타입 직접 노출 ❌
}