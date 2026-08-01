import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import type { ShopCatalog } from "../types/shop";
import { CHARACTER_KEY } from "./useCharacter";

const SHOP_KEY = ["shop", "catalog"];

export function useShopCatalog() {
  return useQuery({
    queryKey: SHOP_KEY,
    queryFn: () => api.get<ShopCatalog>("/api/shop"),
  });
}

function useInvalidateShop() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: SHOP_KEY });
    queryClient.invalidateQueries({ queryKey: CHARACTER_KEY });
  };
}

export function useCreateReward() {
  const invalidate = useInvalidateShop();

  return useMutation({
    mutationFn: (data: { title: string; description?: string; basePrice: number }) =>
      api.post("/api/shop/rewards", data),
    onSuccess: invalidate,
  });
}

export function useRedeemItem() {
  const invalidate = useInvalidateShop();

  return useMutation({
    mutationFn: (itemId: string) => api.post(`/api/shop/${itemId}/redeem`),
    onSuccess: invalidate,
  });
}

export function useEquipTitle() {
  const invalidate = useInvalidateShop();

  return useMutation({
    mutationFn: (itemId: string) => api.post(`/api/shop/${itemId}/equip`),
    onSuccess: invalidate,
  });
}

export function useUseConsumable() {
  const invalidate = useInvalidateShop();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, habitId }: { itemId: string; habitId?: string }) =>
      api.post(`/api/shop/${itemId}/use`, { habitId }),
    onSuccess: () => {
      invalidate();
      queryClient.invalidateQueries({ queryKey: ["chapter", "active"] });
    },
  });
}