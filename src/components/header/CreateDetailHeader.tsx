// 편지 추가 - 내용 분석 페이지 헤더

import { useNavigate } from "react-router-dom";
import ThumbnailHeader from "./presets/ThumbnailHeader";

export default function CreateDetailHeader() {
  const navigate = useNavigate();

  return (
    <ThumbnailHeader
      title="내용 확인"
      confirmTitle="편지 추가 취소"
      confirmDescription="편지 추가를 취소할까요? 편지는 저장되지 않아요."
      onConfirmExit={() => navigate("/")}
    />
  );
}
