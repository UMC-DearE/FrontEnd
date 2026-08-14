// 편지함 폴더 모달

import BottomSheet from '@/components/common/BottomSheet';
import FolderForm, { type FolderFormProps } from './FolderForm';

export type { FolderModalResult } from './FolderForm';

export default function FolderModal(props: FolderFormProps) {
  return (
    <BottomSheet open onClose={props.onCancel} className="px-[20px]" contentClassName="gap-[20px]">
      <FolderForm {...props} />
    </BottomSheet>
  );
}
