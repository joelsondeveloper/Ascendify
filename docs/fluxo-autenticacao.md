# Fluxo de Autenticação — Better Auth

> Última atualização: 21/07/2026

## 1. Visão Geral

Este documento define como a autenticação vai funcionar no Ascendify usando
o **Better Auth**, e como o `User` (gerado pelo Better Auth) se conecta ao
nosso `Character` (definido na doc de modelagem do banco).

**Método de autenticação no MVP:** email + senha. Social login (Google/GitHub)
fica como decisão em aberto para uma iteração futura.

---

## 2. Como o Better Auth se encaixa na nossa arquitetura

```
Frontend (apps/web)              Backend (apps/api)
┌─────────────────┐              ┌──────────────────────┐
│  authClient      │  requests   │  Express              │
│  (better-auth/   │ ───────────>│  app.all("/api/auth/*")│
│   react)         │              │  → Better Auth handler│
└─────────────────┘              └──────────┬────────────┘
                                             │
                                             │ Prisma Adapter
                                             ▼
                                       PostgreSQL
                                (tabelas User, Session,
                                 Account, Verification)
```

O Better Auth expõe uma rota "coringa" (`/api/auth/*`) que lida com **todas**
as operações de auth (cadastro, login, logout, sessão) — não criamos rotas
manuais pra isso.

---

## 3. Passo a passo de instalação (referência)

> Esta seção documenta os comandos que vamos rodar na parte prática — serve
> de referência para não esquecer a ordem.

1. Instalar o pacote: `better-auth` no `apps/api`
2. Criar `apps/api/src/lib/auth.ts` com a configuração (`betterAuth({...})`)
3. Gerar os models de auth no `schema.prisma` via CLI:
   `npx @better-auth/cli generate`
4. Rodar `prisma migrate dev` para criar as tabelas `User`, `Session`,
   `Account`, `Verification` no banco
5. Montar o handler no Express (`server.ts`)
6. No frontend, criar o `authClient` (`apps/web/src/lib/auth-client.ts`)

---

## 4. Configuração do backend (`auth.ts`)

```typescript
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },
});
```

**Variáveis de ambiente necessárias** (`apps/api/.env`):

```
BETTER_AUTH_SECRET=<gerado, chave aleatória>
BETTER_AUTH_URL=http://localhost:3333
DATABASE_URL=<já configurado>
```

`BETTER_AUTH_SECRET` assina os tokens de sessão — precisa ser uma string
aleatória longa (o CLI do Better Auth consegue gerar uma).

---

## 5. Montagem no Express — ordem importa

Este é o ponto de atenção mais importante desta doc.

```typescript
import express from "express";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app = express();

// 1º: o handler do Better Auth, ANTES do express.json()
app.all("/api/auth/*", toNodeHandler(auth));

// 2º: só depois disso o parser de JSON pras outras rotas
app.use(express.json());

// demais rotas da aplicação (quests, character, etc) vêm aqui
```

**Por que essa ordem?** O Better Auth usa seu próprio parser de corpo de
requisição internamente. Se o `express.json()` rodar antes, ele consome o
`body` da requisição primeiro, e o Better Auth não recebe os dados
corretamente — resultando em erros difíceis de debugar (login "falhando"
sem motivo aparente).

---

## 6. Geração das tabelas de auth

O Better Auth não deixa você escrever os models `User`/`Session`/`Account`/
`Verification` manualmente — ele gera via CLI, lendo a configuração do
`auth.ts`:

```powershell
npx @better-auth/cli generate
```

Isso adiciona os models direto no `schema.prisma`, já com os campos padrão
(`id`, `email`, `emailVerified`, `name`, `image`, `createdAt`, `updatedAt`
no `User`; tokens e expiração no `Session`; etc).

Depois disso, rodamos a migration normalmente:

```powershell
npm exec --workspace=apps/api -- prisma migrate dev --name add_auth
```

---

## 7. Conectando `User` ao `Character`

O Better Auth gera o `User`, mas **não sabe nada sobre `Character`** — essa
relação é nossa. Depois que o CLI gerar o model `User`, vamos adicionar
manualmente a ponta que falta:

```prisma
model User {
  // ...campos gerados pelo Better Auth (não mexer)

  character Character?
}

model Character {
  // ...campos que já definimos

  userId String @unique
  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

### Quando o `Character` é criado?

Decisão de design: o `Character` **não** é criado automaticamente no
cadastro. Vamos usar um **hook do Better Auth** (`databaseHooks.user.create.after`)
que roda logo após um novo `User` ser persistido, criando o `Character`
correspondente com valores padrão (nível 1, XP zerado). Isso garante que
todo usuário sempre tenha um personagem, sem depender do frontend lembrar de
chamar uma rota separada.

```typescript
export const auth = betterAuth({
  // ...
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await prisma.character.create({
            data: {
              userId: user.id,
              name: user.name ?? "Aventureiro",
            },
          });
        },
      },
    },
  },
});
```

---

## 8. Frontend — `authClient`

Dentro de `apps/web/src/lib/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3333",
});
```

Esse client expõe hooks/métodos prontos: `authClient.signUp.email(...)`,
`authClient.signIn.email(...)`, `authClient.signOut()`,
`authClient.useSession()` (hook reativo pra saber se o usuário está logado).

---

## 9. Fluxo de telas (MVP)

1. **Cadastro** (`/cadastro`) — formulário nome, email, senha →
   `authClient.signUp.email()` → Better Auth cria `User` → hook cria
   `Character` → redireciona pro dashboard
2. **Login** (`/login`) — email, senha → `authClient.signIn.email()` →
   sessão criada → redireciona pro dashboard
3. **Dashboard** (`/`) — rota protegida, usa `authClient.useSession()` pra
   checar se está logado; se não, redireciona pro login
4. **Logout** — botão que chama `authClient.signOut()`

---

## 10. Protegendo rotas no backend

Rotas de domínio (ex: `GET /api/character/me`) precisam validar a sessão.
Fazemos isso com um middleware simples que consulta a sessão via `auth.api`:

```typescript
import type { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  req.userId = session.user.id;
  next();
}
```

---

## 11. Decisões em Aberto

- [ ] Social login (Google/GitHub) — entra no MVP ou fica para depois?
- [ ] Verificação de email obrigatória antes do primeiro login?
- [ ] Política de expiração de sessão (quanto tempo o usuário fica logado?)

---

## 12. Próximos Passos (prática)

1. Instalar `better-auth` no `apps/api`
2. Criar `src/lib/auth.ts` com a config
3. Rodar `npx @better-auth/cli generate`
4. Adicionar a relação `Character.user` manualmente no schema
5. Rodar a migration
6. Montar o handler no `server.ts` (atenção à ordem do `express.json()`)
7. Testar cadastro via `curl`/Postman antes de integrar o frontend