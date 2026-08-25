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
      className="w-full bg-[#FFFFFF] border-b border-[#E7E8EB]"
      style={{
        paddingTop: 'min(env(safe-area-inset-top), 32px)',
      }}
    >
      <div className="h-[78px] px-4 flex items-end pb-[20px]">
        <div className="flex h-9 w-1/4 min-w-0 items-center">{left}</div>

        <div className="flex h-9 w-2/4 min-w-0 items-center justify-center">{center}</div>

        <div className="flex h-9 w-1/4 min-w-0 items-center justify-end">{right}</div>
      </div>
    </header>
  );
}
