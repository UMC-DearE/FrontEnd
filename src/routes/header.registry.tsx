import { lazy } from "react";
import type { ReactNode } from "react";
import type { HeaderPresetKey } from "./route.meta";

const LeftOnlyHeader = lazy(
  () => import("@/components/header/presets/LeftOnlyHeader")
);
const BackTitleHeader = lazy(
  () => import("@/components/header/presets/BackTitleHeader")
);
const RightButtonHeader = lazy(
  () => import("@/components/header/presets/RightButtonHeader")
);
const CreateDetailHeader = lazy(
  () => import("@/components/header/CreateDetailHeader")
);
const SetFromHeader = lazy(
  () => import("@/components/header/SetFromHeader")
);
const LetterBoxHeader = lazy(
  () => import("@/components/header/LetterBoxHeader")
);

export type HeaderRenderContext = {
  title?: string;
};

export const HEADER_REGISTRY: Record<
  HeaderPresetKey,
  ((ctx: HeaderRenderContext) => ReactNode) | null
> = {
  LEFT_ONLY: ({ title }) => <LeftOnlyHeader title={title} />,

  BACK_TITLE: ({ title }) => (
    <BackTitleHeader title={title} />
  ),

  RIGHT_BUTTON: ({ title }) => (
    <RightButtonHeader title={title} />
  ),

  CREATE_DETAIL: () => <CreateDetailHeader />,
  SET_FROM: () => <SetFromHeader />,
  LETTER_BOX: ({ title }) => <LetterBoxHeader title={title} />,

  NONE: null,
};


