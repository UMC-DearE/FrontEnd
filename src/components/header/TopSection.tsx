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
    <header className="w-full bg-white border-b border-[#E6E7E9] pt-safe-top">
      <div className="h-[105px] px-4 flex items-center pt-13">
        <div className="w-1/4 flex items-center">{left}</div>
        <div className="w-2/4 flex justify-center items-center">{center}</div>
        <div className="w-1/4 flex justify-end items-center">{right}</div>
      </div>
    </header>
  );
}
