import { useState } from 'react';

import BottomSheet from '@/components/common/BottomSheet';
import ConfirmModal from '@/components/common/ConfirmModal';
import FromCreator from '@/components/common/FromCreator';
import { BottomButton } from '@/components/common/BottomButton';

import type { From } from '@/types/from';

import { getHarmoniousTextColor } from '@/utils/color';

interface FromEditSheetProps {
  open: boolean;
  from: From | null;
  isSaving?: boolean;
  onClose: () => void;
  onSave: (updated: From) => void;
  onDelete: (fromId: number) => void;
}

export default function FromEditSheet(props: FromEditSheetProps) {
  const { from } = props;

  if (!from) return null;

  return <FromEditSheetContent key={from.fromId} {...props} from={from} />;
}

interface FromEditSheetContentProps extends Omit<FromEditSheetProps, 'from'> {
  from: From;
}

function FromEditSheetContent({
  open,
  from,
  isSaving = false,
  onClose,
  onSave,
  onDelete,
}: FromEditSheetContentProps) {
  const [name, setName] = useState(from.name);
  const [selectedColor, setSelectedColor] = useState(from.bgColor);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const trimmedName = name.trim();

  const handleSave = () => {
    if (!trimmedName || isSaving) return;

    onSave({
      ...from,
      name: trimmedName,
      bgColor: selectedColor,
      fontColor: getHarmoniousTextColor(selectedColor),
    });
  };

  const handleDelete = () => {
    setShowDeleteConfirm(false);
    onDelete(from.fromId);
  };

  return (
    <>
      <BottomSheet open={open} onClose={onClose}>
        <div className="w-full px-5 pt-4">
          <div className="text-[16px] font-semibold text-primary">From 수정</div>

          <div className="mt-6 flex items-center justify-between">
            <label className="text-[14px] font-medium text-[#A1A4AA]">이름(최대 10자)</label>

            <span className="text-[12px] font-medium text-[#A1A4AA]">{name.length}/10</span>
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 10))}
            maxLength={10}
            className="mt-3 h-[50px] w-full rounded-xl border-[1.2px] border-primary px-4 text-base font-medium text-black outline-none focus:border-primary"
          />

          <FromCreator name={name} selectedColor={selectedColor} onColorChange={setSelectedColor} />

          <div className="mt-7">
            <BottomButton
              variant="black"
              fontWeight="semibold"
              disabled={!trimmedName || isSaving}
              onClick={handleSave}
            >
              완료
            </BottomButton>
          </div>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="mt-[26px] w-full text-center text-[16px] font-medium text-[#F02E2E]"
          >
            삭제하기
          </button>
        </div>
      </BottomSheet>

      <ConfirmModal
        open={showDeleteConfirm}
        title={`'${from.name}' 삭제`}
        description={'이 사람에게 받은 모든 편지도 함께 삭제돼요\n정말로 삭제할까요?'}
        cancelText="취소"
        confirmText="확인"
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        titleClassName="text-[#FF143B]"
      />
    </>
  );
}
