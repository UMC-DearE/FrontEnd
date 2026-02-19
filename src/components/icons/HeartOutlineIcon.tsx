import type React from "react";

export type HeartOutlineIconProps = React.SVGProps<SVGSVGElement>;

export default function HeartOutlineIcon(props: HeartOutlineIconProps) {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.05 12.7C7.05 12.7 1 7.6 1 4C1 2.1 2.4 1 4.1 1C5.2 1 6.2 1.7 7 2.5C7.8 1.7 8.8 1 9.9 1C11.6 1 13 2.1 13 4C13 7.6 7.05 12.7 7.05 12.7Z"
        fill="none"
        stroke="#FF5F2F"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

    </svg>
  );
}
