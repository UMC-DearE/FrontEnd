import TopSection from "../TopSection";
import logo from "@/assets/logo/main-logo.svg";
import type { BaseHeaderProps } from "@/types/header";

export default function LeftOnlyHeader({
  title,
}: BaseHeaderProps) {
  return (
    <TopSection
      left={
        title ? (
          <span className="font-semibold text-xl leading-none">
            {title}
          </span>
        ) : (
          <img src={logo} alt="logo" />
        )
      }
    />
  );
}

