interface PaymentButtonProps {
  amountText?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PaymentButton({
  amountText = "1,990원",
  onClick,
  disabled,
  className = "",
}: PaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "w-full rounded-[10px] py-[15.5px]",
        "text-[16px] font-bold text-white",
        "shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
        "bg-gradient-to-r from-[#5B53F1] to-[#FB49A6]",
        "active:scale-[0.99] transition-transform",
        disabled ? "opacity-50 cursor-not-allowed active:scale-100" : "",
        className,
      ].join(" ")}
    >
      {amountText} 결제하기
    </button>
  );
}
