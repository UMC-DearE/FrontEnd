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
      left={<span style={{width: 24}} />}
      center={
        <div className="text-lg font-semibold">
          {title}
        </div>
      }
      right={<CloseButton />}
    />
  );
}