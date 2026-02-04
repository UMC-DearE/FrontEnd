export type FontKey = "pretendard" | "cafe24" | "lee";

export type FontOption = {
  key: FontKey;
  title: string;
  desc: string;
  preview: string;
  fontFamily: string;
  isPlus?: boolean;
};