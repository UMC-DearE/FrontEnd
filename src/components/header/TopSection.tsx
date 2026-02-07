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
      className="w-full px-4 border-b border-[#E6E7E9] box-border"
      style={{
        height: 105,
        paddingTop: 'env(safe-area-inset-top)',
        backgroundColor: 'white',
      }}
    >
      <div
        className="flex items-center h-full pt-15"
        style={{
          height: 'calc(105px - env(safe-area-inset-top))',
        }}
      >
        <div className="w-1/4 flex items-center">
          {left}
        </div>

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


