// 초대 링크로 진입한 코드를 소셜 로그인이 시작될 때까지 임시 보관
// 링크만 열고 가입은 안 한 사람의 코드를 언제까지 localStorage에 들고 있을지

const KEY = 'deare-invite-code';
const TTL = 1000 * 60 * 60 * 24; // 24시간

type StoredInviteCode = {
  code: string;
  savedAt: number;
};

export function savePendingInviteCode(code: string) {
  try {
    const payload: StoredInviteCode = { code, savedAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // localStorage 접근 불가 시 무시
  }
}

export function readPendingInviteCode(): string | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<StoredInviteCode>;
    if (!parsed?.code || typeof parsed.savedAt !== 'number') {
      clearPendingInviteCode();
      return null;
    }

    // 오래된 코드가 남아 나중의 가입에 잘못 붙는 걸 방지
    if (Date.now() - parsed.savedAt > TTL) {
      clearPendingInviteCode();
      return null;
    }

    return parsed.code;
  } catch {
    return null;
  }
}

export function clearPendingInviteCode() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // 무시
  }
}
