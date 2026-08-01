import type { ShopItem } from "../types/shop";
import { useRedeemItem, useEquipTitle, useUseConsumable } from "../hooks/useShop";

export function ShopItemCard({ item }: { item: ShopItem }) {
  const { mutate: redeem, isPending: redeeming, error: redeemError } = useRedeemItem();
  const { mutate: equip, isPending: equipping } = useEquipTitle();
  const { mutate: use, isPending: using } = useUseConsumable();

  const isPermanent = item.cosmeticKind === "PERMANENT";
  const isConsumable = item.cosmeticKind === "CONSUMABLE";

  function handleRedeem() {
    if (window.confirm(`Comprar "${item.title}" por ${item.basePrice} coins?`)) {
      redeem(item.id);
    }
  }

  function handleUse() {
    const habitId = window.prompt("Cole o ID do hábito para aplicar o congelamento:");
    if (habitId) {
      use({ itemId: item.id, habitId });
    }
  }

  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-sm font-semibold text-text">{item.title}</p>
          {item.description && (
            <p className="text-text-muted text-xs font-body mt-0.5">{item.description}</p>
          )}
        </div>
        <span className="font-mono text-xs text-accent-xp whitespace-nowrap ml-2">
          {item.basePrice} coins
        </span>
      </div>

      <div className="flex items-center gap-3 mt-2">
        {isPermanent && !item.owned && (
          <button
            onClick={handleRedeem}
            disabled={redeeming}
            className="text-xs font-display uppercase tracking-wide text-accent hover:underline disabled:opacity-50"
          >
            Comprar
          </button>
        )}
        {isPermanent && item.owned && (
          <button
            onClick={() => equip(item.id)}
            disabled={equipping}
            className="text-xs font-display uppercase tracking-wide text-accent-xp hover:underline disabled:opacity-50"
          >
            Equipar
          </button>
        )}
        {isConsumable && (
          <>
            <button
              onClick={handleRedeem}
              disabled={redeeming}
              className="text-xs font-display uppercase tracking-wide text-accent hover:underline disabled:opacity-50"
            >
              Comprar
            </button>
            {(item.quantity ?? 0) > 0 && (
              <button
                onClick={handleUse}
                disabled={using}
                className="text-xs font-display uppercase tracking-wide text-accent-xp hover:underline disabled:opacity-50"
              >
                Usar ({item.quantity})
              </button>
            )}
          </>
        )}
      </div>

      {redeemError && (
        <p className="text-danger text-xs font-body mt-1">{redeemError.message}</p>
      )}
    </div>
  );
}