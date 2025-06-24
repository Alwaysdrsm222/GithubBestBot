import { useQuery } from "@tanstack/react-query";
import type { Giveaway, CustomPage } from "@shared/schema";

export function useGiveaways() {
  return useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways"],
  });
}

export function useActiveGiveaways() {
  return useQuery<Giveaway[]>({
    queryKey: ["/api/giveaways/active"],
  });
}

export function useCustomPages() {
  return useQuery<CustomPage[]>({
    queryKey: ["/api/pages"],
  });
}

export function useStats() {
  return useQuery({
    queryKey: ["/api/stats"],
  });
}
