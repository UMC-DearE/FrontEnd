import { api } from "@/api/http";
import type { FontKey } from "@/stores/styleStores";

type ApiResponse<T> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type ServerFont = "PRETENDARD" | "CAFE24" | "LEE";

export type MyThemeData = {
  theme: "LIGHT" | "DARK";
  font: ServerFont;
};

export function serverFontToClient(font: ServerFont): FontKey {
  switch (font) {
    case "PRETENDARD":
      return "pretendard";
    case "CAFE24":
      return "cafe24";
    case "LEE":
      return "lee";
    default:
      return "pretendard";
  }
}

export function clientFontToServer(font: FontKey): ServerFont {
  switch (font) {
    case "pretendard":
      return "PRETENDARD";
    case "cafe24":
      return "CAFE24";
    case "lee":
      return "LEE";
    default:
      return "PRETENDARD";
  }
}

export async function getMyTheme(): Promise<MyThemeData> {
  const res = await api.get<ApiResponse<MyThemeData>>("/users/me/theme");
  return res.data.data;
}

export async function patchMyFont(font: FontKey) {
  const res = await api.patch<
    ApiResponse<{ font: ServerFont; updatedAt: string }>
  >("/users/me/theme/font", {
    font: clientFontToServer(font),
  });

  return res.data.data;
}
