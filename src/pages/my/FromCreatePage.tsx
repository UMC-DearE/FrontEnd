import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import { BottomButton } from '@/components/common/BottomButton';
import erasebtn from '@/assets/create/erasebtn.svg';
import useToast from '@/hooks/useToast';
import { useCreateFrom } from '@/hooks/mutations/useCreateFrom';
import { useFromList } from '@/hooks/queries/useFromList';
import { getHarmoniousTextColor } from '@/utils/color';
import type { AppLayoutContext } from '@/layouts/AppLayout';

export default function FromCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const [input, setInput] = useState('');
  const [selectedColor, setSelectedColor] = useState('#FFA2A2');
  const createFromMutation = useCreateFrom();
  const { setFixedAction } = useOutletContext<AppLayoutContext>();

  const { data: fromList = [] } = useFromList();

  const normalizeFromName = (name: string) =>
    name.trim().replace(/\s+/g, ' ').toLocaleLowerCase();

  const handleCreateImmediate = async () => {
    if (createFromMutation.isPending) return;

    const trimmedName = input.trim();
    if (!trimmedName) return;

    const normalizedName = normalizeFromName(trimmedName);
    const isDuplicate = fromList.some(
      (from) => normalizeFromName(from.name) === normalizedName,
    );

    if (isDuplicate) {
      toast.show('같은 이름의 프롬이 이미 있어요');
      return;
    }

    const draft = {
      name: trimmedName.slice(0, 7),
      bgColor: selectedColor,
      fontColor: getHarmoniousTextColor(selectedColor),
    };

    try {
      const res = await createFromMutation.mutateAsync(draft);

      if (!res.success) {
        toast.show(res.message || '프롬 생성에 실패했어요.');
        return;
      }

      navigate('/my/from', {
        replace: true,
        state: {
          createdFrom: {
            ...draft,
            fromId: res.data.fromId,
          },
        },
      });
    } catch {
      toast.show('프롬 생성 중 오류가 발생했어요.');
    }
  };

  useEffect(() => {
    setFixedAction({
      node: (
        <BottomButton
          disabled={!input.trim() || createFromMutation.isPending}
          onClick={handleCreateImmediate}
        >
          추가하기
        </BottomButton>
      ),
    });

    return () => setFixedAction(null);
  }, [input, selectedColor, createFromMutation.isPending, fromList]);

return (
  <div className="flex flex-col h-full">
    <div className="flex mb-3 justify-between mt-1">
      <div className="text-sm font-medium text-[#A1A4AA]">이름 입력</div>
      <div className="text-sm font-medium text-[#A1A4AA]">{input.length}/10</div>
    </div>
    <InputField
      value={input}
      onChange={(v) => setInput(v.slice(0, 10))}
      placeholder="편지를 준 사람의 이름"
      useGrayWhenBlurred
      maxLength={10}
      inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary"
      rightElement={
        input ? (
          <button
            onClick={() => setInput('')}
            className="flex items-center justify-center w-6 h-6"
          >
            <img src={erasebtn} alt="clear" className="w-5 h-5 block" />
          </button>
        ) : undefined
      }
    />

    <FromCreator
      name={input}
      selectedColor={selectedColor}
      onColorChange={setSelectedColor}
    />
  </div>
);
}
