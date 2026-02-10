export interface CreateFrom {
  fromId?: number; // 새 프롬 생성 시에는 없음 - optional
  name: string;
  bgColor: string;
  fontColor: string;
  letterCount?: number; // 마이페이지 - 프롬 관리에서 목록 보여줄 때 개수 함께 보여줌
}

// 서버에서 확정된 프롬 - 목록 조회, 서버 응답
export interface From {
  fromId: number; // 반드시 존재
  name: string;
  bgColor: string;
  fontColor: string;
  letterCount?: number;
}

export type FromListResponse = {
  success: boolean;
  code: string;
  message: string;
  data: {
    froms: From[];
  };
};
