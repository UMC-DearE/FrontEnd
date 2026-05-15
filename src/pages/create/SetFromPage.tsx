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
  const [tab, setTab] = useState<'select' | 'add'>('select');
  const [searchInput, setSearchInput] = useState('');
  const [addInput, setAddInput] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SetFromPageState;

  const { data: fromList = [] } = useFromList();

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
      {/* 상단 탭 */}
      <div className="flex mt-1 gap-[20px] w-full px-3">
        <button
          className={"flex-1 flex items-center justify-center bg-transparent"}
          onClick={() => setTab('select')}>
          <span
            className={`w-full h-[40px] flex items-center justify-center text-base border-b-[3px] transition-colors duration-150 ${tab === 'select' ? 'text-primary border-primary font-semibold' : 'text-[#A1A4AA] border-transparent font-normal'}`}>
            기존에서 선택
          </span>
        </button>
        <button
          className={"flex-1 flex items-center justify-center bg-transparent"}
          onClick={() => setTab('add')}>
          <span
            className={`w-full h-[40px] flex items-center justify-center text-base border-b-[3px] transition-colors duration-150 ${tab === 'add' ? 'text-primary border-primary font-semibold' : 'text-[#A1A4AA] border-transparent font-normal'}`}>
            새로 추가
          </span>
        </button>
      </div>

      {tab === 'select' && (
        <div className="flex flex-col h-full mt-5">
          <div className="pt-2">
            <InputField
              value={searchInput}
              onChange={setSearchInput}
              placeholder="이름 검색"
              useGrayWhenBlurred
              maxLength={9}
              inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary mb-4"
              rightElement={
                searchInput ? (
                  <button
                    onClick={() => setSearchInput('')}
                    className="flex items-center justify-center w-6 h-6"
                  >
                    <img src={erasebtn} alt="clear" className="w-5 h-5 block" />
                  </button>
                ) : undefined
              }
            />
            <div className="flex flex-col gap-[24px] mt-2 justify-center">
              {fromList.length === 0 ? (
                <div className="w-full flex flex-col items-center gap-[16px] justify-center">
                  <p className="font-normal text-[15px] text-[#A1A4AA]">
                    추가된 From이 없어요
                  </p>

                  <button
                    className="w-[125px] h-[38px] bg-[#ffffff] text-[#585A5F] border-[1.2px] border-[#E7E8EB] rounded-lg text-sm font-medium"
                    onClick={() => setTab('add')}
                  >
                    새로 추가
                  </button>
                </div>
              ) : (
                fromList
                  .filter((from) => from.name.includes(searchInput))
                  .map((from) => (
                    <div
                      key={from.fromId}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FromBadge
                          size="lg"
                          name={from.name}
                          bgColor={from.bgColor}
                          fontColor={from.fontColor}
                        />
                      </div>
                      <button
                        onClick={() => handleSelect(from)}
                        className="text-[13px] font-normal text-[#A1A4AA] border border-[#CACBD1] rounded-lg px-[12px] py-[5px]"
                      >
                        선택
                      </button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}

      {tab === 'add' && (
        <div className="flex flex-col h-full mt-5">
          <div className="flex mb-4 justify-between">
            <div className="text-sm font-medium text-[#A1A4AA]">이름 입력</div>
            <div className="text-sm font-medium text-[#CACBD1]">{addInput.length}/10</div>
          </div>
          <InputField
            value={addInput}
            onChange={setAddInput}
            placeholder="편지를 준 사람의 이름"
            useGrayWhenBlurred
            maxLength={9}
            inputClassName="h-[50px] rounded-xl px-4 text-base font-medium outline-none cursor-text focus:bg-white focus:ring-1 focus:ring-primary mb-4"
            rightElement={
              addInput ? (
                <button
                  onClick={() => setAddInput('')}
                  className="flex items-center justify-center w-6 h-6"
                >
                  <img src={erasebtn} alt="clear" className="w-5 h-5 block" />
                </button>
              ) : undefined
            }
          />
          <FromCreator
            onDraftCreate={goBackWithDraft}
            name={addInput}
            onNameChange={setAddInput}
            fromCount={fromList.length}
          />
        </div>
      )}
    </div>
  );
}
