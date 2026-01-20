import checkOn from "@/assets/terms/check_on.svg";
import checkOff from "@/assets/terms/check_off.svg";

interface CheckCircleProps {
  checked: boolean;
  onClick: () => void;
  ariaLabel: string;
}

export default function CheckCircle({
  checked,
  onClick,
  ariaLabel,
}: CheckCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      aria-label={ariaLabel}
      className="shrink-0 w-6 h-6 flex items-center justify-center"
    >
      <img
        src={checked ? checkOn : checkOff}
        alt=""
        className="w-6 h-6"
        draggable={false}
      />
    </button>
  );
}
