import type { ReactNode } from "react";

type ImageBoxProps = {
  src?: string | null;
  alt?: string;
  size?: number;
  className?: string;
  placeholder?: ReactNode;
  onClick?: () => void;
  rounded?: "sm" | "md" | "lg" | "full";
};

export default function ImageBox({
  src = null,
  alt = "image",
  size = 40,
  className = "",
  placeholder,
  onClick,
  rounded = "md",
}: ImageBoxProps) {
  const dimension = `${size}px`;

  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  }[rounded];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={alt}
      className={`overflow-hidden flex items-center justify-center ${roundedClass} ${className}`}
      style={{
        width: dimension,
        height: dimension,
        backgroundColor: src ? undefined : "#F3F4F6",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        placeholder ?? (
          <div className="w-3 h-3 bg-neutral-300 rounded-full" />
        )
      )}
    </button>
  );
}
