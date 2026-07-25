import { useEffect, useState } from "react";
import { SystemPanel } from "../components/SystemPanel";
import { Button } from "../components/Button";
import { authClient } from "../lib/auth-client";

interface Character {
  id: string;
  name: string;
  level: number;
  currentXp: number;
  totalXp: number;
  title: string | null;
}

export function Dashboard() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3333/api/character/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCharacter(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    window.location.href = "/login";
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Character">
          {loading ? (
            <p className="text-text-muted font-body">Carregando personagem...</p>
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

              <Button onClick={handleLogout} className="mt-6 w-full">
                Sair
              </Button>
            </>
          ) : (
            <p className="text-danger font-body">
              Não foi possível carregar o personagem.
            </p>
          )}
        </SystemPanel>
      </div>
    </div>
  );
}