interface ChevronRightIconProps {
  className?: string;
}

export default function ChevronRightIcon({ className }: ChevronRightIconProps) {
  return (
    <svg
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.484314 14.0222C0.796733 14.3259 1.30327 14.3259 1.61568 14.0222L8.01569 7.79997C8.32811 7.49623 8.32811 7.00377 8.01569 6.70003L1.61569 0.477806C1.30327 0.174065 0.796734 0.174065 0.484315 0.477805C0.171895 0.781548 0.171895 1.27401 0.484315 1.57775L6.31863 7.25L0.484314 12.9222C0.171894 13.226 0.171894 13.7185 0.484314 14.0222Z"
        fill="#CACBD1"
        stroke="#CACBD1"
        strokeWidth="0.5"
      />
    </svg>
  );
}