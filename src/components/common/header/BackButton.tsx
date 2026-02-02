import { useNavigate } from "react-router-dom";
import BackArrowIcon from "@/assets/header/back-arrow.svg";

type BackButtonProps = {
  to?: string | number;
  replace?: boolean;
  onClick?: () => void;
};

export default function BackButton({ to, replace, onClick }: BackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (onClick) return onClick();

    if (typeof to === "number") {
      navigate(to);
    } else if (typeof to === "string") {
      navigate(to, { replace: Boolean(replace) });
    } else {
      navigate(-1);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="back"
      className="w-6 h-6 flex items-center justify-center text-primary">
      <img src={BackArrowIcon} alt="back" className="w-[9px] h-[16px]" />
    </button>
  );
}

