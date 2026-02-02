import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/header/close-btn.svg";

export default function CloseButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="close"
      onClick={() => navigate(-1)}
      className="w-6 h-6 flex items-center justify-center text-primary">
      <img src={CloseIcon} alt="close" className="w-[12px] h-[12px]" />
    </button>
  );
}
