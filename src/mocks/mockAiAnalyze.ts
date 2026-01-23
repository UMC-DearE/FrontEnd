import type { AiAnalyzeResult } from "@/types/letter";

export function mockAiAnalyze(content: string): Promise<AiAnalyzeResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        letterId: 1,
        summary:
          "그리움과 애정이 담긴 따뜻한 편지입니다.",
        emotions: [
          {
            emotionId: 1,
            emotionName: "그리움",
            category: {
              categoryId: 1,
              type: "그리움 & 애정",
              bgColor: "#FFE8F2",
              fontColor: "#FF5A8A",
            },
          },
          {
            emotionId: 2,
            emotionName: "따뜻함",
            category: {
              categoryId: 2,
              type: "위로 & 공감",
              bgColor: "#FFF4CC",
              fontColor: "#FF9F0A",
            },
          },
        ],
      });
    }, 2000);
  });
}
