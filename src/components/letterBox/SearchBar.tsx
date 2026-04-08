// 검색창

export default function SearchBar({
  value,
  onChange,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="relative h-[50px] w-full max-w-[440px] rounded-xl border-[1.2px] border-[#C2C4C7] bg-white shadow-[0px_0px_12px_0px_#0000001A] focus-within:border-black">
      <p
        className={`pointer-events-none absolute left-[22px] top-1/2 -translate-y-1/2 text-[16px] font-medium text-[#C2C4C7] transition-opacity ${
          value ? 'opacity-0' : 'opacity-100'
        }`}
      >
        편지 내용 검색
      </p>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        className="h-full w-full bg-transparent pl-[22px] pr-13 text-[16px] font-medium text-black outline-none caret-transparent"
      />

      <button
        type="button"
        onClick={() => {
          onChange('');
          onClose();
        }}
        className="absolute right-3 top-1/2 -translate-y-1/2 -translate-y-1/2 cursor-pointer text-[14px] font-medium text-[#BEBEBE]"
      >
        취소
      </button>
    </div>
  );
}
