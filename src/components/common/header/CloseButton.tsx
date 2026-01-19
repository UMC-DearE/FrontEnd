import { useNavigate } from "react-router-dom";
import CloseIcon from "@/components/icons/CloseIcon";

export default function CloseButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      aria-label="close"
      onClick={() => navigate(-1)}
      className="
        w-12.1 h-12.1
        flex items-center justify-center
        text-gray-900
      "
    >
      <CloseIcon />
    </button>
  );
}
