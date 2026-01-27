interface ChevronRightIconProps {
  className?: string;
}

export default function ChevronRightIcon({
  className,
}: ChevronRightIconProps) {
  return (
    <svg
      width="5"
      height="10"
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1L4 5L1 9"
        stroke="#6C6C6C"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
