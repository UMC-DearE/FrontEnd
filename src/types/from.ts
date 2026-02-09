import type { CommonResponse } from "./common";

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

export interface FromListResponseData {
  froms: From[];
}

export type FromListResponse = CommonResponse<FromListResponseData>;

// 프롬 생성
export interface CreateFromRequest {
  name: string;
  bgColor: string;
  fontColor: string;
}

export interface CreateFromResponseData {
  fromId: number;
}

export type CreateFromResponse = CommonResponse<CreateFromResponseData>;

// 프롬 수정
export interface UpdateFromRequest {
  name?: string;
  bgColor?: string;
  fontColor?: string;
}

export interface UpdateFromResponseData {
  fromId: number;
  name: string;
  bgColor: string;
  fontColor: string;
  updatedAt: string;
}

export type UpdateFromResponse = CommonResponse<UpdateFromResponseData>;

// 프롬 삭제
export interface DeleteFromResponseData {
  fromId: number;
}

export type DeleteFromResponse = CommonResponse<DeleteFromResponseData>;
