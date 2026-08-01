export interface ShopItem {
  id: string;
  characterId: string | null;
  type: "REAL_LIFE" | "COSMETIC";
  cosmeticKind: "PERMANENT" | "CONSUMABLE" | null;
  title: string;
  description: string | null;
  effectType: string | null;
  effectValue: string | null;
  basePrice: number;
  isArchived: boolean;
  createdAt: string;
  owned?: boolean;
  quantity?: number;
}

export interface RealLifeReward extends ShopItem {
  currentPrice: number;
}

export interface ShopCatalog {
  cosmetics: ShopItem[];
  realLifeRewards: RealLifeReward[];
}