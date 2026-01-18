export type HeaderPresetKey =
  | "LEFT_ONLY"
  | "BACK_TITLE"
  | "CREATE_DETAIL"
  | "RIGHT_BUTTON"
  | "NONE"
  | "SET_FROM"
  | "LETTER_BOX";

export const ROUTE_META: Array<{
  match: (pathname: string) => boolean;
  header: HeaderPresetKey;
  title?: string;
  bg?: "gray" | "white";
    }> = [
  {
    match: (pathname) =>
    pathname === "/login" || pathname === "/splash",
    header: "NONE",
    bg: "white",
  },

    // 회원가입 플로우
  {
    match: (pathname) => pathname === "/setup/terms",
    header: "BACK_TITLE",
    title: "약관 동의",
    bg: "white",
  },
  {
    match: (pathname) => pathname === "/setup/setname",
    header: "BACK_TITLE",
    title: "회원 가입",
    bg: "white",
  },

    // 홈
  {
    match: (pathname) => pathname === "/",
    header: "LEFT_ONLY",
    bg: "gray",
  },

    // 편지 추가 플로우
  {
    match: (pathname) => pathname === "/create",
    header: "RIGHT_BUTTON",
    title: "편지 추가",
    bg: "white",
  },

    // 편지 추가 내용 확인
  {
    match: (pathname) => pathname === "/create/detail",
    header: "CREATE_DETAIL",
    bg: "white",
  },

    // 편지 추가 프롬 선택
  {
    match: (pathname) => pathname === "/create/from",
    header: "SET_FROM",
    bg: "white",
  },

    // 편지함
  {
    match: (pathname) => pathname === "/letter",
    header: "LETTER_BOX",
    title: "편지함",
    bg: "gray",
  },

    // 편지 상세
  {
    match: (pathname) => pathname.startsWith("/letter/"),
    header: "LEFT_ONLY",
    title: "편지 상세",
    bg: "white",
  },

    // 리포트
  {
    match: (pathname) => pathname.startsWith("/report"),
    header: "LEFT_ONLY",
    title: "리포트",
    bg: "gray",
  },

    // 마이
  {
    match: (pathname) => pathname === "/my",
    header: "LEFT_ONLY",
    title: "MY",
    bg: "gray",
  },

  {
    match: (pathname) => pathname.startsWith("/my/"),
    header: "LEFT_ONLY",
    bg: "white",
  },
];
