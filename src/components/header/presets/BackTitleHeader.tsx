import TopSection from "../TopSection";
import BackButton from "../../common/header/BackButton";
import type { JSX } from "react";
import { useLocation } from "react-router-dom";

export default function BackTitleHeader({
  title,
}: {
  title?: string;
}): JSX.Element {
  const { pathname } = useLocation();

  const isTermsDetail =
    pathname === "/auth/terms/service" ||
    pathname === "/auth/terms/privacy";

  return (
    <TopSection
      left={<BackButton to={isTermsDetail ? "/auth/terms" : undefined} />}
      center={
        <div className="flex items-center text-lg font-semibold leading-none text-primary">
          {title}
        </div>
      }
    />
  );
}
