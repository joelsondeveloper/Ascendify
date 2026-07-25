import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { SystemPanel } from "../components/SystemPanel";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { authClient } from "../lib/auth-client";

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Não foi possível criar a conta.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Auth">
          <h1 className="font-display text-2xl font-semibold mb-6">
            Criar Personagem
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="name"
              label="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              id="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />

            {error && (
              <p className="text-danger text-sm font-body">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Criando..." : "Começar Jornada"}
            </Button>
          </form>

          <p className="text-text-muted text-sm font-body mt-6 text-center">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Entrar
            </Link>
          </p>
        </SystemPanel>
      </div>
    </div>
  );
}