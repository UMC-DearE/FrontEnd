// 편지 상세 - 편지 수정 페이지 헤더

import { useNavigate, useParams } from "react-router-dom";
import ThumbnailHeader from "./presets/ThumbnailHeader";

export default function EditLetterHeader() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <ThumbnailHeader
      title="편지 수정"
      confirmTitle="편지 수정 취소"
      confirmDescription="편지 수정을 취소할까요? 내용은 저장되지 않아요"
      onConfirmExit={() => {
        if (id) {
          navigate(`/letter/${id}`, { replace: true });
        } else {
          navigate("/");
        }
      }}
    />
  );
}
