import { useState } from "react";
import TopSection from "../TopSection";
import CancelButton from "@/components/common/header/CancelButton";
import LetterThumbnail from "@/components/common/header/LetterThumbnail";
import ConfirmModal from "@/components/common/ConfirmModal";

type Props = {
  title: string;
  confirmTitle: string;
  confirmDescription: string;
  onConfirmExit: () => void;
};

export default function ThumbnailHeader({
  title,
  confirmTitle,
  confirmDescription,
  onConfirmExit,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <TopSection
        left={<CancelButton onClick={() => setOpenConfirm(true)} />}
        center={<div className="text-lg font-semibold">{title}</div>}
        right={<LetterThumbnail />}
      />

      <ConfirmModal
        open={openConfirm}
        title={confirmTitle}
        description={confirmDescription}
        cancelText="아니오"
        confirmText="확인"
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => {
          setOpenConfirm(false);
          onConfirmExit();
        }}
      />
    </>
  );
}
