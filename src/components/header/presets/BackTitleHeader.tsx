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
        <h1 className="flex items-center text-lg font-semibold leading-none text-black">
          {title}
        </h1>
      }
    />
  );
}
