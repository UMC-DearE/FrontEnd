export interface CreateFrom {
  name: string;
  backgroundColor: string;
  textColor: string;
}

export interface From {
  fromId: number;
  name: string;
  backgroundColor: string;
  textColor: string;
}

export interface FromListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    froms: From[];
  };
}
