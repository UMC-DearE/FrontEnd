// 초대 링크 공유 문구

const INVITE_SHARE_MESSAGE = `[dear.e] 서랍 속에 간직해 둔 편지들, 이제 디어리에 보관해요 📮
아래 링크로 1초 만에 가입하고, 소중한 추억을 차곡차곡 쌓아볼까요?`;

export function buildInviteShareText(inviteUrl: string) {
  return `${INVITE_SHARE_MESSAGE}\n${inviteUrl}`;
}
