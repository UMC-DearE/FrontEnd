import { useNavigate } from "react-router-dom";
import BackArrowIcon from "@/components/icons/BackArrowIcon";

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

