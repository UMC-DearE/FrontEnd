import { useQuery } from "@tanstack/react-query";
import { getLetterDetail } from "@/api/letter";

export function useLetterDetail(letterId: number) {
  return useQuery({
    queryKey: ["letter", letterId],
    queryFn: () => getLetterDetail(letterId),
    enabled: Number.isFinite(letterId),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
