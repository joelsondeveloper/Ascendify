import { useState } from "react";
import { SystemPanel } from "../components/SystemPanel";
import { Button } from "../components/Button";
import { Link } from "react-router";
import { ChapterView } from "../components/ChapterView";
import { Modal } from "../components/Modal";
import { CreateChapterForm } from "../components/CreateChapterForm";
import { authClient } from "../lib/auth-client";
import { useActiveChapter } from "../hooks/useActiveChapter";
import { useCharacter } from "../hooks/useCharacter";

export function Dashboard() {
  const { data: character, isLoading: loading } = useCharacter();
  const { data: chapter, isLoading: chapterLoading } = useActiveChapter();
  const [showChapterModal, setShowChapterModal] = useState(false);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 gap-6">
      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Character">
          {loading ? (
            <p className="text-text-muted font-body">
              Carregando personagem...
            </p>
          ) : character ? (
            <>
              <h1 className="font-display text-2xl font-semibold">
                {character.name}
              </h1>
              {character.title && (
                <p className="text-text-muted text-sm font-body mt-1">
                  {character.title}
                </p>
              )}

              <div className="mt-6 flex items-center justify-between font-mono">
                <span className="text-text-muted text-sm">Nível</span>
                <span className="text-accent-xp text-xl font-semibold">
                  {character.level}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between font-mono">
                <span className="text-text-muted text-sm">XP</span>
                <span className="text-text text-sm">
                  {character.currentXp} / {character.totalXp}
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between font-mono">
                <span className="text-text-muted text-sm">Coins</span>
                <span className="text-accent-xp text-sm">
                  {character.coins}
                </span>
              </div>

              <Button onClick={handleLogout} className="mt-6 w-full">
                Sair
              </Button>
              <Link
                to="/shop"
                className="block text-center text-xs font-display uppercase tracking-wide text-accent hover:underline mt-3"
              >
                Ir para Loja
              </Link>
            </>
          ) : (
            <p className="text-danger font-body">
              Não foi possível carregar o personagem.
            </p>
          )}
        </SystemPanel>
      </div>

      <div className="w-full max-w-sm">
        {chapterLoading ? (
          <p className="text-text-muted font-body text-center">
            Carregando capítulo...
          </p>
        ) : chapter ? (
          <ChapterView chapter={chapter} />
        ) : (
          <SystemPanel eyebrow="Chapter">
            <p className="text-text-muted font-body text-center">
              Nenhum capítulo em progresso.
            </p>
            <Button
              onClick={() => setShowChapterModal(true)}
              className="w-full mt-4"
            >
              Iniciar Novo Capítulo
            </Button>
          </SystemPanel>
        )}
      </div>

      {showChapterModal && (
        <Modal eyebrow="New Chapter" onClose={() => setShowChapterModal(false)}>
          <CreateChapterForm onDone={() => setShowChapterModal(false)} />
        </Modal>
      )}
    </div>
  );
}
