export const inviteKeys = {
  verify: (inviteCode: string) => ['invite', 'verify', inviteCode] as const,
};
