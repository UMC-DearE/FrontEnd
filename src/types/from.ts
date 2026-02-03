export interface CreateFrom {
  name: string;
  backgroundColor: string;
  textColor: string;
  letterCount?: number; // 마이페이지 - 프롬 관리에서 목록 보여줄 때 개수 함께 보여줌
}

// 편지 생성할 때 같이 보낼 임시 draft 타입 - 서버에 저장하지 않고 내용 분석 페이지로 되돌려 보냄
export interface From {
  fromId: number;
  name: string;
  backgroundColor: string;
  textColor: string;
  letterCount?: number;
}

export interface FromListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    froms: From[];
  };
}
