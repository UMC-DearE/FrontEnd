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
        <h1 className="flex items-center text-lg font-semibold leading-none text-black">
          {title}
        </h1>
      }
      right={<CloseButton />}
    />
  );
}