# Ficha Técnica — Ascendify

> Sistema de gamificação de desenvolvimento pessoal inspirado em Solo Leveling.
> Última atualização: 17/07/2026

## 1. Visão Geral

O Ascendify transforma atividades da vida real em "quests", permitindo que o
usuário evolua um personagem através de XP, níveis, atributos, conquistas e
desafios. Este documento define as decisões técnicas do projeto e serve como
referência para implementação.

**Tipo de projeto:** Solo dev
**Arquitetura:** Monorepo (frontend + backend no mesmo repositório)

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Motivo |
|---|---|---|
| Monorepo | npm workspaces | Leve, sem curva de aprendizado extra (vs Turborepo) |
| Frontend | React + TypeScript | Tipagem forte, produtividade, ecossistema maduro |
| Build tool | Vite | Dev server rápido, substitui CRA (deprecated) |
| Roteamento | React Router | Padrão de mercado para SPAs React |
| Estado local | Zustand | Leve, sem boilerplate, ideal para estado do "personagem" |
| Estado servidor | TanStack Query | Cache, refetch e sincronização com a API |
| Styling | Tailwind CSS | Utility-first, produtividade solo |
| Componentes UI | shadcn/ui | Componentes prontos e customizáveis (cards, progress bar, etc) |
| Backend | Node.js + Express | Simplicidade e controle explícito das rotas |
| Banco de dados | PostgreSQL | Relacional, robusto, ótimo suporte a integridade referencial |
| ORM | Prisma | Migrations versionadas + types gerados automaticamente para TS |
| Autenticação | Better Auth | TypeScript-first, self-hosted, sem vendor lock-in, plugins (2FA, social login) |
| Linguagem | TypeScript (front e back) | Consistência de tipos em todo o projeto |

### Descartados (e por quê)
- **Lucia Auth** — descontinuado desde março/2025, hoje é só material de estudo, não uma lib instalável.
- **Auth.js/NextAuth** — está em modo manutenção de segurança apenas; não é mais recomendado para projetos novos.
- **Turborepo** — overhead desnecessário para escala solo inicial.
- **Redux** — verboso demais para o tamanho do projeto; Zustand cobre a necessidade.

---

## 3. Estrutura de Pastas (Monorepo)

```
ascendify/
├── apps/
│   ├── web/                      # Frontend React
│   │   ├── src/
│   │   │   ├── assets/           # Imagens, ícones, fontes
│   │   │   ├── components/       # Componentes reutilizáveis
│   │   │   │   └── ui/           # Componentes shadcn/ui
│   │   │   ├── features/         # Organização por feature (ver seção 5)
│   │   │   │   ├── auth/
│   │   │   │   ├── character/
│   │   │   │   ├── quests/
│   │   │   │   └── achievements/
│   │   │   ├── hooks/            # Hooks customizados globais
│   │   │   ├── lib/              # Config de libs (queryClient, authClient)
│   │   │   ├── pages/            # Páginas/rotas
│   │   │   ├── stores/           # Stores Zustand globais
│   │   │   ├── types/            # Tipos TS compartilhados no front
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── api/                      # Backend Express
│       ├── src/
│       │   ├── modules/          # Organização por domínio (ver seção 5)
│       │   │   ├── auth/
│       │   │   ├── character/
│       │   │   ├── quests/
│       │   │   └── achievements/
│       │   ├── middlewares/      # Auth guard, error handler, etc
│       │   ├── lib/              # Config (prisma client, betterAuth)
│       │   ├── routes/           # Agregador de rotas
│       │   ├── utils/
│       │   └── server.ts
│       ├── prisma/
│       │   ├── schema.prisma
│       │   └── migrations/
│       └── package.json
│
├── packages/
│   └── shared/                   # Tipos e schemas compartilhados front/back
│       ├── src/
│       │   ├── types/
│       │   └── schemas/          # Zod schemas de validação
│       └── package.json
│
├── docs/                         # Documentação do projeto
│   └── ficha-tecnica.md
│
├── .env.example
├── package.json                  # Root — define os workspaces
└── README.md
```

**Por que `apps/` + `packages/shared/`:** evita duplicar tipos entre front e
back. Um `type Quest` ou schema de validação Zod definido uma vez em
`packages/shared` é importado nos dois lados.

---

## 4. Convenções de Código

### 4.1 Nomenclatura

| Item | Convenção | Exemplo |
|---|---|---|
| Componentes React | PascalCase | `QuestCard.tsx` |
| Hooks | camelCase com prefixo `use` | `useCharacterStats.ts` |
| Funções/variáveis | camelCase | `calculateXpForLevel()` |
| Constantes globais | UPPER_SNAKE_CASE | `MAX_LEVEL` |
| Tipos/Interfaces | PascalCase | `interface Quest {}` |
| Arquivos de rota (API) | kebab-case | `quest-routes.ts` |
| Tabelas do banco (Prisma) | PascalCase singular | `model Quest {}` |
| Colunas do banco | camelCase | `experiencePoints` |

### 4.2 TypeScript
- `strict: true` obrigatório em ambos `tsconfig.json` (web e api).
- Proibido usar `any` — usar `unknown` + type narrowing quando o tipo é incerto.
- Tipos de entidades de domínio (Quest, Character, Achievement) vivem em `packages/shared`.

### 4.3 Componentes React
- Function components + hooks (sem class components).
- Um componente por arquivo.
- Props tipadas via `interface`, nunca `type` solto para props (padronização).
- Lógica de dados (fetch, mutation) fica em hooks customizados, não dentro do JSX do componente.

```tsx
// ✅ Bom
interface QuestCardProps {
  quest: Quest;
  onComplete: (id: string) => void;
}

export function QuestCard({ quest, onComplete }: QuestCardProps) {
  // ...
}
```

### 4.4 Backend (Express)
- Arquitetura em camadas por módulo: `routes → controller → service → repository (Prisma)`.
- Regra de negócio nunca dentro do controller — sempre no `service`.
- Validação de entrada com Zod nas rotas, usando os schemas de `packages/shared`.

```
modules/quests/
├── quest.routes.ts       # Define endpoints
├── quest.controller.ts   # Recebe request, chama service, devolve response
├── quest.service.ts      # Regra de negócio (ex: cálculo de XP)
└── quest.repository.ts   # Acesso ao Prisma
```

### 4.5 Commits (Conventional Commits)
```
feat: adiciona sistema de cálculo de XP
fix: corrige overflow de nível máximo
docs: atualiza ficha técnica com stack de auth
refactor: extrai lógica de XP para service separado
```

### 4.6 Variáveis de ambiente
- Nunca commitar `.env`. Sempre manter `.env.example` atualizado.
- Prefixo `VITE_` obrigatório para variáveis expostas ao frontend (padrão Vite).

---

## 5. Organização por Feature/Domínio

Tanto front quanto back seguem organização por **domínio de negócio**, não por
tipo técnico. Os domínios do MVP são:

1. **auth** — cadastro, login, sessão
2. **character** — ficha do personagem, atributos, level
3. **quests** — quests diárias/semanais, conclusão, cálculo de XP
4. **achievements** — conquistas desbloqueáveis

Cada novo domínio (ex: `inventory`, `rankings`) segue o mesmo padrão de pastas
já estabelecido nas seções 3 e 4.4.

---

## 6. Scripts Padrão (root `package.json`)

```json
{
  "scripts": {
    "dev:web": "npm run dev -w apps/web",
    "dev:api": "npm run dev -w apps/api",
    "db:migrate": "npm run prisma migrate dev -w apps/api",
    "db:studio": "npm run prisma studio -w apps/api",
    "build": "npm run build -w apps/web && npm run build -w apps/api"
  }
}
```

---

## 7. Próximos Documentos (Roadmap de Docs)

Seguindo a estratégia doc → prática, os próximos documentos planejados são:

1. ✅ Ficha técnica (este documento)
2. ⬜ Modelagem do banco de dados (schema Prisma: User, Character, Quest, Achievement)
3. ⬜ Especificação do sistema de XP e níveis (fórmulas de progressão)
4. ⬜ Fluxo de autenticação (Better Auth) — rotas e telas
5. ⬜ Especificação de quests diárias/semanais

---

## 8. Decisões em Aberto

- [ ] Definir provider de hosting (Vercel para front, Railway/Render para API+DB?)
- [ ] Definir se Better Auth usará social login (Google/GitHub) no MVP ou só email/senha
- [ ] Definir estratégia de testes (Vitest? Testing Library? Cobertura mínima?)