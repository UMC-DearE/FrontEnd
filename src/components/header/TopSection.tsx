export default function TopSection({
  left,
  center,
  right,
}: {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <header
      className="w-full bg-white border-b border-[#E6E7E9]"
      style={{
        paddingTop: 'min(env(safe-area-inset-top), 32px)',
      }}
    >
      <div className="h-[78px] px-4 flex items-end pb-[20px]">
        <div className="w-1/4 min-w-0 flex items-center">{left}</div>
        <div className="w-2/4 min-w-0 flex justify-center items-center">{center}</div>
        <div className="w-1/4 min-w-0 flex justify-end items-center">{right}</div>
      </div>
    </header>
  );
}
