import { useState } from "react";
import TopSection from "../TopSection";
import CancelButton from "@/components/common/header/CancelButton";
import LetterThumbnail from "@/components/common/header/LetterThumbnail";
import ConfirmModal from "@/components/common/ConfirmModal";
import ImageViewer from "@/components/common/ImageViewer";

type ImageSource = File | string;

type Props = {
  title: string;
  confirmTitle: string;
  confirmDescription: string;
  onConfirmExit: () => void;
  images?: ImageSource[];
};

export default function ThumbnailHeader({
  title,
  confirmTitle,
  confirmDescription,
  onConfirmExit,
  images,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openViewer, setOpenViewer] = useState(false);

  return (
    <>
      <TopSection
        left={<CancelButton onClick={() => setOpenConfirm(true)} />}
        center={<div className="text-lg font-semibold">{title}</div>}
        right={
        images && images.length > 0 ? (
          <LetterThumbnail
            source={images[0]}
            onClick={() => setOpenViewer(true)}
          />
        ) : null
      } // 이미지 썸네일 조건부 렌더링 - 텍스트 모드인 경우 null
            />

      {openViewer && images && (
      <ImageViewer
        images={images}
        initialIndex={0}
        onClose={() => setOpenViewer(false)}
      />
    )}

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
