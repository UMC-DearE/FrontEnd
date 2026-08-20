export const inviteKeys = {
  link: ['invite', 'link'] as const,
  verify: (inviteCode: string) => ['invite', 'verify', inviteCode] as const,
};
