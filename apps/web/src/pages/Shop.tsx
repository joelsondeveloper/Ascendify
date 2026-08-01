import { useState } from "react";
import { Link } from "react-router";
import { SystemPanel } from "../components/SystemPanel";
import { ShopItemCard } from "../components/ShopItemCard";
import { RewardCard } from "../components/RewardCard";
import { Modal } from "../components/Modal";
import { CreateRewardForm } from "../components/CreateRewardForm";
import { useShopCatalog } from "../hooks/useShop";

export function Shop() {
  const { data, isLoading } = useShopCatalog();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gap-6">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="text-xs font-display uppercase tracking-wide text-text-muted hover:text-accent"
        >
          ← Voltar
        </Link>
      </div>

      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Cosmetics">
          <h2 className="font-display text-xl font-semibold mb-2">Cosméticos</h2>
          {isLoading ? (
            <p className="text-text-muted font-body text-sm">Carregando...</p>
          ) : data?.cosmetics.length === 0 ? (
            <p className="text-text-muted font-body text-sm">Nenhum item disponível.</p>
          ) : (
            data?.cosmetics.map((item) => <ShopItemCard key={item.id} item={item} />)
          )}
        </SystemPanel>
      </div>

      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Rewards">
          <h2 className="font-display text-xl font-semibold mb-2">Recompensas de Vida Real</h2>
          {isLoading ? (
            <p className="text-text-muted font-body text-sm">Carregando...</p>
          ) : data?.realLifeRewards.length === 0 ? (
            <p className="text-text-muted font-body text-sm">Nenhuma recompensa criada ainda.</p>
          ) : (
            data?.realLifeRewards.map((reward) => (
              <RewardCard key={reward.id} reward={reward} />
            ))
          )}

          <button
            onClick={() => setShowModal(true)}
            className="text-xs font-display uppercase tracking-wide text-accent hover:underline mt-4"
          >
            + Recompensa
          </button>
        </SystemPanel>
      </div>

      {showModal && (
        <Modal eyebrow="New Reward" onClose={() => setShowModal(false)}>
          <CreateRewardForm onDone={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  );
}