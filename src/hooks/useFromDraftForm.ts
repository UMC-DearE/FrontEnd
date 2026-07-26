import { useState } from 'react';
import { useFromList } from '@/hooks/queries/useFromList';
import { getHarmoniousTextColor } from '@/utils/color';
import useToast from '@/hooks/useToast';
import { FROM_NAME_MAX_LENGTH } from '@/constants/from';
import type { CreateFrom } from '@/types/from';

const normalizeFromName = (name: string) =>
  name.trim().replace(/\s+/g, ' ').toLowerCase();

export function useFromDraftForm(initialColor = '#FFA2A2') {
  const [name, setNameRaw] = useState('');
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const { data: fromList = [] } = useFromList();
  const toast = useToast();

  const setName = (v: string) => setNameRaw(v.slice(0, FROM_NAME_MAX_LENGTH));

  const isDuplicateName = (candidate: string) => {
    const normalized = normalizeFromName(candidate);
    return fromList.some((from) => normalizeFromName(from.name) === normalized);
  };

  // 중복이면 토스트 띄우고 null 반환, 아니면 draft 객체 반환
  const buildDraftOrWarn = (): CreateFrom | null => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    if (isDuplicateName(trimmed)) {
      toast.show('같은 이름의 프롬이 이미 있어요');
      return null;
    }

    return {
      name: trimmed.slice(0, FROM_NAME_MAX_LENGTH),
      bgColor: selectedColor,
      fontColor: getHarmoniousTextColor(selectedColor),
    };
  };

  const reset = () => {
    setNameRaw('');
    setSelectedColor(initialColor);
  };

  return {
    name,
    setName,
    selectedColor,
    setSelectedColor,
    buildDraftOrWarn,
    isDuplicateName,
    fromList,
    reset,
  };
}