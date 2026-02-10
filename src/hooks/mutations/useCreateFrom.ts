import { useMutation } from "@tanstack/react-query";
import { createFrom } from "@/api/from";

export function useCreateFrom() {
  return useMutation({
    mutationFn: createFrom,
  });
}
