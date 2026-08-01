import type { RealLifeReward } from "../types/shop";
import { useRedeemItem } from "../hooks/useShop";

export function RewardCard({ reward }: { reward: RealLifeReward }) {
  const { mutate, isPending, error } = useRedeemItem();

  function handleRedeem() {
    if (
      window.confirm(`Resgatar "${reward.title}" por ${reward.currentPrice} coins?`)
    ) {
      mutate(reward.id);
    }
  }

  const inflated = reward.currentPrice > reward.basePrice;

  return (
    <div className="py-3 border-b border-border last:border-0">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-semibold text-text">{reward.title}</p>
        <span
          className={`font-mono text-xs whitespace-nowrap ml-2 ${
            inflated ? "text-danger" : "text-accent-xp"
          }`}
        >
          {reward.currentPrice} coins
        </span>
      </div>

      <button
        onClick={handleRedeem}
        disabled={isPending}
        className="text-xs font-display uppercase tracking-wide text-accent hover:underline disabled:opacity-50 mt-2"
      >
        Resgatar
      </button>

      {error && <p className="text-danger text-xs font-body mt-1">{error.message}</p>}
    </div>
  );
}