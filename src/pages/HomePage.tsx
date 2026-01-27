import { useState } from 'react';
import ProfileCard from '@/components/home/ProfileCard';
import ConfirmModal from '@/components/common/ConfirmModal';
import LetterCard, { type Letter } from '@/components/home/LetterCard';
import AddLetterButton from '@/components/home/AddLetterButton';
import ProfileCustomSheet from '@/components/home/ProfileCustomSheet';

export default function HomePage() {
  const [letter, setLetter] = useState<Letter | null>({
    id: 1,
    content:
      '책은 우리 안의 얼어붙은 바다를 깨부수는 도끼여야 한다. 우리가 책을 읽는 이유는 바로 그 때문이다.',
    month: 'Jan',
    day: 22,
    dayOfWeek: '월',
  });

  const [pinnedLetterId, setPinnedLetterId] = useState<number | null>(null);
  const [pendingUnpinId, setPendingUnpinId] = useState<number | null>(null);
  const [openSheet, setOpenSheet] = useState(false);

  const handlePin = (letterId: number) => {
    setPinnedLetterId(letterId);
  };

  const handleRequestUnpin = (letterId: number) => {
    setPendingUnpinId(letterId);
  };

  const handleCancelUnpin = () => {
    setPendingUnpinId(null);
  };

  const handleConfirmUnpin = () => {
    setPinnedLetterId(null);
    setPendingUnpinId(null);
  };

  return (
    <div>
      <ProfileCard
        nickname="키르"
        bio="안녕하세요 잘 부탁합니다 ദ്ദി^ᴗ ̫ ᴗ^₎"
        onClickSettings={() => setOpenSheet(true)}
      />

      <ProfileCustomSheet
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        onSelect={() => {}}
      />

      <LetterCard
        letter={letter}
        isPinned={letter?.id === pinnedLetterId}
        onPin={handlePin}
        onRequestUnpin={handleRequestUnpin}
      />

      <ConfirmModal
        open={pendingUnpinId !== null}
        title="편지 고정 해제"
        description="편지 고정을 해제할까요?"
        cancelText="취소"
        confirmText="해제"
        onCancel={handleCancelUnpin}
        onConfirm={handleConfirmUnpin}
      />

      <div className="absolute bottom-32 left-[282px]">
        <AddLetterButton />
      </div>
    </div>
  );
}
