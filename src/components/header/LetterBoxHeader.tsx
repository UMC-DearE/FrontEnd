import TopSection from "./TopSection";
import type { JSX } from "react";
import SearchButton from "@/components/common/header/SearchButton";

export default function LetterBoxHeader({
  title,
}: {
  title?: string;
}): JSX.Element {
  return (
    <TopSection
      left={<h1 className="flex items-center text-xl font-semibold leading-none text-primary">
          {title}
        </h1>}
      right={<SearchButton />}
    />
  );
}