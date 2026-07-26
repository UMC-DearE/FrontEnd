import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import { BottomButton } from '@/components/common/BottomButton';
import erasebtn from '@/assets/create/erasebtn.svg';
import useToast from '@/hooks/useToast';
import { useCreateFrom } from '@/hooks/mutations/useCreateFrom';
import { useFromDraftForm } from '@/hooks/useFromDraftForm';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import { FROM_NAME_MAX_LENGTH } from '@/constants/from';

export default function FromCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const createFromMutation = useCreateFrom();
  const { setFixedAction } = useOutletContext<AppLayoutContext>();

  const {
    name: input,
    setName: setInput,
    selectedColor,
    setSelectedColor,
    buildDraftOrWarn,
    fromList,
  } = useFromDraftForm();

  const handleCreateImmediate = async () => {
    if (createFromMutation.isPending) return;

    const draft = buildDraftOrWarn();
    if (!draft) return;

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
        <div className="text-sm font-medium text-[#A1A4AA]">
          {input.length}/{FROM_NAME_MAX_LENGTH}
        </div>
      </div>
      <InputField
        value={input}
        onChange={setInput}
        placeholder="편지를 준 사람의 이름"
        useGrayWhenBlurred
        maxLength={FROM_NAME_MAX_LENGTH}
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
