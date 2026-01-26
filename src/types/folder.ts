// 폴더 기본 구조
export interface FolderType {
  id: number;
  folderName: string;
  imageUrl?: string;
}

// 새 폴더 생성
export interface CreateFolderRequest {
  folder_name: string; // 6자 이내
  image_id: number;
}

// 폴더 목록 조회
export interface FolderListResponse {
  success: boolean;
  code: string;
  message: string;
  data: FolderType[];
}
