import type { LetterDetailResponse } from "@/types/letter";

export function getMockLetterDetail(_letterId: number): Promise<LetterDetailResponse> {
  return Promise.resolve({
    success: true,
    code: "200",
    message: "편지 조회를 성공하였습니다.",
    data: {
      content: "이것은 모의 편지 내용입니다. 편지 작성자가 전달하고자 하는 감정과 생각이 담겨 있습니다. 편지를 통해 소중한 사람과의 연결을 느껴보세요.이것은 모의 편지 내용입니다. 편지 작성자가 전달하고자 하는 감정과 생각이 담겨 있습니다. 편지를 통해 소중한 사람과의 연결을 느껴보세요.",
      receivedAt: "2026-01-01",
      aiSummary: "AI가 편지 내용을 한 줄로 요약해줍니다.",
      emotions: [
        {
          emotionId: 1,
          emotionName: "사랑",
          category: {
            categoryId: 1,
            type: "따뜻함 & 애정",
            bgColor: "#FFE8E8",
            fontColor: "#FF5A5A",
          },
        },
        {
          emotionId: 2,
          emotionName: "감사",
          category: {
            categoryId: 1,
            type: "따뜻함 & 애정",
            bgColor: "#FFE8E8",
            fontColor: "#FF5A5A",
          },
        },
      ],
      isLiked: false,
      reply: "공백 포함 100자, 하나의 편지당 1개의 답장을 저장할 수 있습니다.",
      fromName: "엄마",
      fromBgColor: "#FEEFEF",
      fromFontColor: "#333333",
      createdAt: "2026-01-09T12:00:00",
      imageUrls: [
        "https://bucket.s3.ap-northeast-2.amazonaws.com/images/imgaasdf32579.jpg",
        "https://bucket.s3.ap-northeast-2.amazonaws.com/images/12345.jpg",
        "https://bucket.s3.ap-northeast-2.amazonaws.com/images/190847agjsd.jpg",
      ],
      inFolder: true,
      folderId: 1,
      folderName: "가족",
    },
  });
}


