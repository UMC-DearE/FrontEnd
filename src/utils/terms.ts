import type { TermsKey } from "@/types/terms";

export function termTypeToKey(type: string): TermsKey | null {
  switch ((type ?? "").toUpperCase()) {
    case "SERVICE":
      return "service";
    case "PRIVACY":
      return "privacy";
    case "MARKETING":
      return "marketing";
    default:
      return null;
  }
}