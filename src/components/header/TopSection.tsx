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
    <header className="w-full h-[105px] bg-white px-4 border-b border-[#E6E7E9]">
      <div className="h-full flex items-center pt-13">
        <div className="w-1/4 flex items-center">{left}</div>
        <div className="w-2/4 flex justify-center items-center">
          {center}
        </div>
        <div className="w-1/4 flex justify-end items-center">
          {right}
        </div>
      </div>
    </header>
  );
}


