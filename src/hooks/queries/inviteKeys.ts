export const inviteKeys = {
  // 초대 링크는 계정마다 다르므로 userId를 키에 포함 (계정 전환 시 캐시 혼선 방지)
  link: (userId?: number) => ['invite', 'link', userId] as const,
};
