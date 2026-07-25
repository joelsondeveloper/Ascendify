import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { SystemPanel } from "../components/SystemPanel";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { authClient } from "../lib/auth-client";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Email ou senha inválidos.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <SystemPanel eyebrow="Auth">
          <h1 className="font-display text-2xl font-semibold mb-6">
            Entrar no Sistema
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              required
            />

            {error && (
              <p className="text-danger text-sm font-body">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <p className="text-text-muted text-sm font-body mt-6 text-center">
            Ainda não tem conta?{" "}
            <Link to="/cadastro" className="text-accent hover:underline">
              Criar personagem
            </Link>
          </p>
        </SystemPanel>
      </div>
    </div>
  );
}