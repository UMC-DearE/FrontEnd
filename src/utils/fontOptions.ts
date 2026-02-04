import type { FontOption } from "@/types/style";

export const FONT_OPTIONS: FontOption[] = [
  {
    key: "pretendard",
    title: "Pretendard (기본)",
    desc: "깔끔하고 가독성이 좋은 고딕체",
    preview: "가나다",
    fontFamily: "Pretendard",
  },
  {
    key: "cafe24",
    title: "카페24 고운밤",
    desc: "아련하고 차분한 새벽 감성의 흘림체",
    preview: "가나다",
    fontFamily: "Cafe24GounNight",
    isPlus: true,
  },
  {
    key: "lee",
    title: "이서윤체",
    desc: "몽글몽글하고 귀여운 손글씨",
    preview: "가나다",
    fontFamily: "LeeSeoYoon",
    isPlus: true,
  },
];
