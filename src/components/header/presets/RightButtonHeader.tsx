import TopSection from "../TopSection";
import CloseButton from "../../common/header/CloseButton";
import type { JSX } from "react";

export default function RightButtonHeader({
  title,
}: {
  title?: string;
}): JSX.Element {
  return (
    <TopSection
      center={
        <div className="flex items-center text-lg font-semibold leading-none text-primary">
          {title}
        </div>
      }
      right={<CloseButton />}
    />
  );
}