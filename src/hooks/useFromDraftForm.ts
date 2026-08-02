import { useState } from 'react';
import { useFromList } from '@/hooks/queries/useFromList';
import { useCreateFrom } from '@/hooks/mutations/useCreateFrom';
import { getHarmoniousTextColor } from '@/utils/color';
import useToast from '@/hooks/useToast';
import { FROM_NAME_MAX_LENGTH } from '@/constants/from';
import type { CreateFrom } from '@/types/from';

const normalizeFromName = (name: string) => name.trim().replace(/\s+/g, ' ').toLowerCase();

export function useFromDraftForm(initialColor = '#FFA2A2') {
  const [name, setNameRaw] = useState('');
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const { data: fromList = [] } = useFromList();
  const createFromMutation = useCreateFrom();
  const toast = useToast();

  const setName = (v: string) => setNameRaw(v.slice(0, FROM_NAME_MAX_LENGTH));

  const isDuplicateName = (candidate: string) => {
    const normalized = normalizeFromName(candidate);
    return fromList.some((from) => normalizeFromName(from.name) === normalized);
  };

  // 서버에 실제로 생성까지 완료 - 성공 시 fromId 포함된 draft 반환 / 실패, 중복, 빈값이면 null
  const createFromAndGetDraft = async (): Promise<CreateFrom | null> => {
    if (createFromMutation.isPending) return null;

    const trimmed = name.trim();
    if (!trimmed) return null;

    if (isDuplicateName(trimmed)) {
      toast.show('같은 이름의 프롬이 이미 있어요');
      return null;
    }

    const payload = {
      name: trimmed.slice(0, FROM_NAME_MAX_LENGTH),
      bgColor: selectedColor,
      fontColor: getHarmoniousTextColor(selectedColor),
    };

    try {
      const res = await createFromMutation.mutateAsync(payload);

      if (!res.success) {
        toast.show(res.message || '프롬 생성에 실패했어요');
        return null;
      }

      return { ...payload, fromId: res.data.fromId };
    } catch {
      toast.show('프롬 생성 중 오류가 발생했어요');
      return null;
    }
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
    createFromAndGetDraft,
    isCreating: createFromMutation.isPending,
    isDuplicateName,
    fromList,
    reset,
  };
}
