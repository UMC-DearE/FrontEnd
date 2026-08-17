import { useEffect, useMemo } from 'react';

/**
 * File이면 object URL을 만들어 반환하고, source가 바뀌거나 언마운트될 때 해제한다.
 * 이미 문자열(원격 URL)이면 그대로 반환한다.
 *
 * effect에서 setState 하지 않으므로 첫 렌더부터 URL이 준비된다.
 */
export default function useObjectUrl(source?: File | string | null): string | null {
  const url = useMemo(() => {
    if (!source) return null;
    return typeof source === 'string' ? source : URL.createObjectURL(source);
  }, [source]);

  useEffect(() => {
    // 문자열 source는 우리가 만든 게 아니라 해제 대상이 아님
    if (!url || typeof source === 'string') return;
    return () => URL.revokeObjectURL(url);
  }, [url, source]);

  return url;
}
