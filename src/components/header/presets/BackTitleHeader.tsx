import TopSection from "../TopSection";
import BackButton from "../../common/header/BackButton";
import type { JSX } from "react";

export default function BackTitleHeader({
  title,
}: {
  title?: string;
}): JSX.Element {
  return (
    <TopSection
      left={<BackButton />}
      center={
        <div className="flex items-center text-lg font-semibold leading-none text-primary">
          {title}
        </div>
      }
    />
  );
}
