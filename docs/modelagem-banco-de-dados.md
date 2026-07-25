# Modelagem do Banco de Dados — Ascendify

> Última atualização: 21/07/2026

## 1. Visão Geral

Este documento define as entidades do MVP e como elas se relacionam, antes de
escrever o `schema.prisma`. O banco é PostgreSQL, acessado via Prisma.

**Importante:** o Better Auth **gera suas próprias tabelas** de autenticação
(`User`, `Session`, `Account`, `Verification`) através do próprio CLI
(`npx @better-auth/cli generate`). Não vamos criar um model `User` do zero —
vamos deixar o Better Auth gerar o dele (com `id`, `name`, `email`,
`emailVerified`, `image`, `createdAt`, `updatedAt`) e conectar nossas
entidades de domínio a ele por relação.

---

## 2. Entidades

### 2.1 `User` (gerado pelo Better Auth — não criamos manualmente)

Contém apenas dados de autenticação: identidade, email, sessão. **Não** deve
guardar dados de gameplay (XP, nível, etc) — isso é responsabilidade do
`Character`.

### 2.2 `Character`

Representa o "personagem" do usuário no sistema de gamificação. Relação
**1:1 com `User`** — cada usuário tem exatamente um personagem (no MVP; no
futuro poderia virar 1:N se quisermos múltiplos personagens por conta).

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `userId` | String | FK para `User`, único (garante 1:1) |
| `name` | String | Nome do personagem (pode ser diferente do nome do usuário) |
| `level` | Int | Nível atual, começa em 1 |
| `currentXp` | Int | XP acumulado dentro do nível atual |
| `totalXp` | Int | XP total acumulado na vida do personagem (histórico) |
| `title` | String? | Título desbloqueado (ex: "Caçador Iniciante") — opcional |
| `createdAt` | DateTime | Data de criação |
| `updatedAt` | DateTime | Última atualização |

**Por que separar `currentXp` de `totalXp`?**
`currentXp` é usado para calcular a barra de progresso até o próximo nível
(zera a cada level up). `totalXp` é histórico puro, útil pra rankings globais
futuros sem precisar recalcular.

**Atributos (força, inteligência, etc.):** ficam de fora do MVP inicial por
simplicidade — podem entrar como campos extras no `Character` ou uma tabela
separada `CharacterAttribute` numa iteração futura, dependendo de quantos
atributos o sistema de RPG for ter.

### 2.3 `Quest`

Representa uma tarefa/desafio que o personagem pode completar para ganhar XP.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `characterId` | String | FK para `Character` — de quem é essa quest |
| `title` | String | Título da quest |
| `description` | String? | Descrição opcional |
| `type` | Enum (`DAILY`, `WEEKLY`, `CUSTOM`) | Frequência/tipo da quest |
| `xpReward` | Int | Quanto XP a quest concede ao ser concluída |
| `status` | Enum (`PENDING`, `COMPLETED`, `EXPIRED`) | Estado atual |
| `dueDate` | DateTime? | Prazo (relevante para DAILY/WEEKLY) |
| `completedAt` | DateTime? | Quando foi concluída (null se ainda pendente) |
| `createdAt` | DateTime | Data de criação |

**Por que `status` como enum em vez de um boolean `completed`?**
Porque quests podem expirar (uma diária não feita até o fim do dia deveria
sair de "pendente" sem ter sido "completada"). Um boolean não representa esse
terceiro estado.

### 2.4 `Achievement`

Representa uma conquista que pode ser desbloqueada. Diferente de `Quest`
(instância pessoal), `Achievement` é uma **definição global** — a mesma
conquista "Complete 10 quests" existe para todos os usuários; o que muda é se
o personagem já desbloqueou ou não.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `title` | String | Nome da conquista |
| `description` | String | Como desbloqueá-la / o que representa |
| `iconKey` | String? | Referência a um ícone/asset no frontend |

### 2.5 `CharacterAchievement` (tabela de junção)

Como um personagem pode desbloquear várias conquistas, e uma conquista pode
ser desbloqueada por vários personagens, a relação é **N:N** — precisa de uma
tabela de junção.

| Campo | Tipo | Descrição |
|---|---|---|
| `characterId` | String | FK para `Character` |
| `achievementId` | String | FK para `Achievement` |
| `unlockedAt` | DateTime | Quando foi desbloqueada |

Chave primária composta: (`characterId`, `achievementId`) — impede duplicar o
desbloqueio da mesma conquista pro mesmo personagem.

---

## 3. Diagrama de Relacionamentos

```
User (Better Auth) 1───1 Character 1───N Quest
                              │
                              │ N
                              │
                              N
                        CharacterAchievement
                              │
                              │ N
                              │
                              1
                         Achievement
```

- `User` → `Character`: 1:1
- `Character` → `Quest`: 1:N (um personagem tem várias quests)
- `Character` ↔ `Achievement`: N:N (via `CharacterAchievement`)

---

## 4. Rascunho do `schema.prisma` (entidades de domínio)

> Este bloco cobre apenas as entidades de domínio. Os models de auth
> (`User`, `Session`, `Account`, `Verification`) serão gerados separadamente
> pelo CLI do Better Auth e colados no mesmo arquivo.

```prisma
model Character {
  id        String   @id @default(cuid())
  userId    String   @unique
  name      String
  level     Int      @default(1)
  currentXp Int      @default(0)
  totalXp   Int      @default(0)
  title     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  quests       Quest[]
  achievements CharacterAchievement[]

  // relação com User (gerado pelo Better Auth) entra aqui após o generate
}

model Quest {
  id          String      @id @default(cuid())
  characterId String
  title       String
  description String?
  type        QuestType
  xpReward    Int
  status      QuestStatus @default(PENDING)
  dueDate     DateTime?
  completedAt DateTime?
  createdAt   DateTime    @default(now())

  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
}

enum QuestType {
  DAILY
  WEEKLY
  CUSTOM
}

enum QuestStatus {
  PENDING
  COMPLETED
  EXPIRED
}

model Achievement {
  id          String  @id @default(cuid())
  title       String
  description String
  iconKey     String?

  characters CharacterAchievement[]
}

model CharacterAchievement {
  characterId   String
  achievementId String
  unlockedAt    DateTime @default(now())

  character   Character   @relation(fields: [characterId], references: [id], onDelete: Cascade)
  achievement Achievement @relation(fields: [achievementId], references: [id], onDelete: Cascade)

  @@id([characterId, achievementId])
}
```

---

## 5. Decisões em Aberto

- [ ] Sistema de atributos (força/inteligência/etc.) — entra como campos no
      `Character` ou tabela separada? Depende da complexidade que o sistema
      de RPG vai ter.
- [ ] Fórmula de XP necessário por nível (linear? exponencial?) — vira a
      próxima doc do roadmap.
- [ ] Quests recorrentes (diária que se repete todo dia) — a quest é
      recriada automaticamente ou é a mesma linha resetada? Precisa decidir
      antes de implementar o scheduler.

---

## 6. Próximos Passos

1. Rodar `npx prisma init` dentro de `apps/api` (ainda não feito)
2. Configurar `DATABASE_URL` no `.env`
3. Instalar e configurar o Better Auth (gera os models de auth)
4. Colar as entidades de domínio acima no `schema.prisma`
5. Rodar a primeira migration (`prisma migrate dev`)