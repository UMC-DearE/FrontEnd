interface ProfilePlaceholderIconProps {
  size?: number;
  color?: string;
}

export default function ProfilePlaceholderIcon({
  size = 32,
  color = "#C2C4C7",
}: ProfilePlaceholderIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="8" r="4" fill={color} />
      <path
        d="M4 20c0-4 4-6 8-6s8 2 8 6"
        fill={color}
      />
    </svg>
  );
}
