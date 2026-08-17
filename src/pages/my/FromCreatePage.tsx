import { useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import { BottomButton } from '@/components/common/BottomButton';
import erasebtn from '@/assets/create/erasebtn.svg';
import { useFromDraftForm } from '@/hooks/useFromDraftForm';
import type { AppLayoutContext } from '@/layouts/AppLayout';
import { FROM_NAME_MAX_LENGTH } from '@/constants/from';

export default function FromCreatePage() {
  const navigate = useNavigate();
  const { setFixedAction } = useOutletContext<AppLayoutContext>();

  const {
    name: input,
    setName: setInput,
    selectedColor,
    setSelectedColor,
    createFromAndGetDraft,
    isCreating,
    fromList,
  } = useFromDraftForm();

  const handleCreateImmediate = async () => {
    const draft = await createFromAndGetDraft();
    if (!draft) return;

    navigate('/my/from', {
      replace: true,
      state: { createdFrom: draft },
    });
  };

  useEffect(() => {
    setFixedAction({
      node: (
        <BottomButton disabled={!input.trim() || isCreating} onClick={handleCreateImmediate}>
          추가하기
        </BottomButton>
      ),
    });

    return () => setFixedAction(null);
  }, [input, selectedColor, isCreating, fromList]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex mb-3 justify-between mt-3">
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

      <FromCreator name={input} selectedColor={selectedColor} onColorChange={setSelectedColor} />
    </div>
  );
}
