export type HeaderPresetKey =
  | 'LEFT_ONLY'
  | 'BACK_TITLE'
  | 'CREATE_DETAIL'
  | 'RIGHT_BUTTON'
  | 'NONE'
  | 'SET_FROM'
  | 'LETTER_BOX'
  | 'MY_FROM'
  | 'MY_STYLE'
  | 'LETTER_DETAIL'
  | 'EDIT_LETTER';

export const ROUTE_META: Array<{
  match: (pathname: string) => boolean;
  header: HeaderPresetKey;
  title?: string;
  bg?: 'gray' | 'white';
  hideHeader?: boolean;
}> = [
  {
    match: (pathname) => pathname === '/login',
    header: 'LEFT_ONLY',
    bg: 'gray',
  },

  // 회원가입 플로우
  {
    match: (pathname) => pathname === '/auth/terms',
    header: 'BACK_TITLE',
    title: '약관 동의',
    bg: 'white',
  },
  {
    match: (pathname) => pathname === '/auth/signup',
    header: 'BACK_TITLE',
    title: '회원 가입',
    bg: 'white',
  },

  // 홈
  {
    match: (pathname) => pathname === '/',
    header: 'LEFT_ONLY',
    bg: 'gray',
  },

  // 편지 추가 플로우
  {
    match: (pathname) => pathname === '/create',
    header: 'RIGHT_BUTTON',
    title: '편지 추가',
    bg: 'white',
  },

  // 편지 추가 내용 확인
  {
    match: (pathname) => pathname === '/create/detail',
    header: 'CREATE_DETAIL',
    bg: 'white',
  },

  // 편지 추가 프롬 선택
  {
    match: (pathname) => pathname === '/create/from',
    header: 'SET_FROM',
    bg: 'white',
  },

  // 편지함
  {
    match: (pathname) => pathname === '/letter',
    header: 'LETTER_BOX',
    title: '편지함',
    bg: 'gray',
    hideHeader: true,
  },

  // 편지 상세 - 편지 수정
  {
    match: (pathname) => pathname.startsWith('/letter/') && pathname.endsWith('/edit'),
    header: 'EDIT_LETTER',
    bg: 'white',
  },

  // 편지 상세
  {
    match: (pathname) => pathname.startsWith('/letter/'),
    header: 'LETTER_DETAIL',
    title: '편지 상세',
    bg: 'gray',
  },

  // 리포트
  {
    match: (pathname) => pathname.startsWith('/report'),
    header: 'LEFT_ONLY',
    title: '리포트',
    bg: 'gray',
  },

  // 마이 - 따로 만들어야 함
  {
    match: (pathname) => pathname === '/my',
    header: 'LEFT_ONLY',
    title: 'MY',
    bg: 'gray',
  },

  // 마이 - 프로필 수정
  {
    match: (pathname) => pathname === '/my/profile',
    header: 'BACK_TITLE',
    title: '프로필 수정',
    bg: 'white',
  },
  // 마이 - 계정 관리
  {
    match: (pathname) => pathname === '/my/account',
    header: 'BACK_TITLE',
    title: '계정 관리',
    bg: 'gray',
  },
  // 마이 - 프롬 관리
  {
    match: (pathname) => pathname === '/my/from',
    header: 'MY_FROM',
    title: 'From 관리',
    bg: 'gray',
  },
  // 마이 - 프롬 생성
  {
    match: (pathname) => pathname === '/my/from/create',
    header: 'RIGHT_BUTTON',
    title: 'From 생성',
    bg: 'white',
  },
  // 마이 - 프롬 수정
  {
    match: (pathname) => pathname.startsWith('/my/from/') && pathname.endsWith('/edit'),
    header: 'BACK_TITLE',
    title: 'From 수정',
    bg: 'gray',
  },
  // 마이 - 스타일
  {
    match: (pathname) => pathname === '/my/style',
    header: 'MY_STYLE',
    bg: 'gray',
  },
];
