import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CreateResultPayload } from '@/types/create';
import type { CreateFrom } from '@/types/from';
import { FromBadge } from '@/components/common/FromBadge';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import erasebtn from '@/assets/create/erasebtn.svg';

type FromItem = CreateFrom & { fromId: number };

type SetFromPageState =
  | (CreateResultPayload & {
      selectedFromDraft?: CreateFrom;
    })
  | {
      mode: 'edit';
      letterId: string;
      selectedFromDraft?: CreateFrom;
    }
  | null;

export default function SetFromPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SetFromPageState;

  const [fromList, setFromList] = useState<FromItem[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchFromList = async () => {
      const res: FromItem[] = [
        {
          fromId: 1,
          name: '엄마',
          backgroundColor: '#FEEFEF',
          textColor: '#333333',
        },
        {
          fromId: 2,
          name: '아빠',
          backgroundColor: '#EAF6FF',
          textColor: '#333333',
        },
      ];
      setFromList(res);
    };

    fetchFromList();
  }, []);

  const goBackWithDraft = (draft: CreateFrom) => {
    if (state && 'mode' in state && state.mode === 'edit') {
      navigate(`/letter/${state.letterId}/edit`, {
        replace: true,
        state: {
          selectedFromDraft: draft,
        },
      });
      return;
    }

    navigate('/create/detail', {
      replace: true,
      state: {
        ...(state ?? {}),
        selectedFromDraft: draft,
      },
    });
  };

  const handleSelect = (from: FromItem) => {
    goBackWithDraft({
      name: from.name,
      backgroundColor: from.backgroundColor,
      textColor: from.textColor,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-0 mt-3 px-0">
        <InputField
          value={input}
          onChange={(v) => setInput(v)}
          placeholder="이름을 생성하거나 선택하세요"
          useGrayWhenBlurred
          maxLength={7}
          inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary"
          rightElement={
            input ? (
              <button
                onClick={() => setInput('')}
                className="flex items-center justify-center w-6 h-6"
              >
                <img src={erasebtn} alt="clear" />
              </button>
            ) : undefined
          }/>
      </div>

      <div className="p-4 mt-3">
        <div className="text-sm text-[#555557] font-medium mb-4">기존 목록</div>

        <div className="flex flex-col gap-5">
          {fromList.length === 0 ? (
            <div className="w-full text-center text-sm text-[#9D9D9F] py-6">
              저장된 목록이 없어요
            </div>
          ) : (
            fromList.map((from) => (
              <div
                key={from.fromId}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <FromBadge
                    name={from.name}
                    backgroundColor={from.backgroundColor}
                    textColor={from.textColor}
                  />
                </div>
                <button
                  onClick={() => handleSelect(from)}
                  className="text-sm font-normal text-[#9D9D9F] border border-[#C2C4C7] rounded-lg px-[10px] py-[2px]"
                >
                  선택
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <FromCreator
        onDraftCreate={goBackWithDraft}
        name={input}
        onNameChange={setInput}
      />
    </div>
  );
}
