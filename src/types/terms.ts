export type TermsKey = "service" | "privacy";

export type TermsState = Record<TermsKey, boolean>;

export type TermsItem = {
  key: TermsKey;
  title: string;
  required: boolean;
};
