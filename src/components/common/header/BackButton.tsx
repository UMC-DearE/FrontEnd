import { useNavigate } from "react-router-dom";
import BackArrowIcon from "@/components/icons/BackArrowIcon";

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="back"
      className="
        w-9 h-16
        flex items-center justify-center
        -ml-3
        text-primary
      "
    >
      <BackArrowIcon />
    </button>
  );
}

