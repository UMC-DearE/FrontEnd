// 서버 응답 X - goBackWithDraft로 상태 전달하여 이전 페이지에서 처리

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { CreateResultPayload } from '@/types/create';
import type { CreateFrom } from '@/types/from';
import { FromBadge } from '@/components/common/FromBadge';
import { InputField } from '@/components/common/InputField';
import FromCreator from '@/components/common/FromCreator';
import erasebtn from '@/assets/create/erasebtn.svg';
import type { From } from '@/types/from';
import { useFromList } from '@/hooks/queries/useFromList';

type FromItem = From;

type SetFromPageState =
  | (CreateResultPayload & {
      selectedFromDraft?: CreateFrom;
      date?: string;
      unknownDate?: boolean;
    })
  | {
      mode: 'edit';
      letterId: string;
      selectedFromDraft?: CreateFrom;
      date?: string;
      unknownDate?: boolean;
    }
  | null;

export default function SetFromPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SetFromPageState;

  const { data: fromList = [] } = useFromList();
  const [input, setInput] = useState('');

  const goBackWithDraft = (draft: CreateFrom) => {
    if (state && 'mode' in state && state.mode === 'edit') {
      navigate(`/letter/${state.letterId}/edit`, {
        replace: true,
        state: {
          ...state,
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
      fromId: from.fromId,
      name: from.name,
      bgColor: from.bgColor,
      fontColor: from.fontColor,
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
                    bgColor={from.bgColor}
                    fontColor={from.fontColor}
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
