const CHO = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

function getChosung(str: string): string {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const cho = Math.floor((code - 0xac00) / 588);
      result += CHO[cho];
    } else {
      result += str[i];
    }
  }
  return result;
}

function isChosungOnly(str: string): boolean {
  return /^[ㄱ-ㅎ]+$/.test(str);
}

export function hangulIncludes(target: string, search: string): boolean {
  if (!search) return true;
  if (isChosungOnly(search)) {
    const targetChosung = getChosung(target);
    return targetChosung.startsWith(search);
  }
  return target.startsWith(search);
}
