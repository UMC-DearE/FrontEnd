import ReanalyzeBtn from '@/assets/report/reanalyze-btn.svg';
import ReanalyzeBtnDisabled from '@/assets/report/reanalyze-disable-btn.svg';

interface ReanalyzeButtonProps {
  disabled: boolean;
  isPending?: boolean;
  onClick: () => void;
}

export default function ReanalyzeButton({
  disabled,
  isPending = false,
  onClick,
}: ReanalyzeButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isPending}
      onClick={onClick}
      className={[
        'flex shrink-0 items-center justify-center gap-1',
        'rounded-[6px] px-[6px] py-1',
        'text-[12px] font-semibold leading-none',
        disabled || isPending ? 'bg-[#EBEDF0] text-[#A1A4AA]' : 'bg-primary text-white',
      ].join(' ')}
    >
      <img
        src={disabled || isPending ? ReanalyzeBtnDisabled : ReanalyzeBtn}
        alt=""
        className="h-4 w-4 shrink-0"
      />

      <span>다시 분석하기</span>
    </button>
  );
}
