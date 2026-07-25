# Estrutura Narrativa — Capítulo, Subtrama, Missão e Hábito

> Última atualização: 24/07/2026
>
> **Esta doc substitui a entidade genérica `Quest`** definida na doc de
> modelagem original. `Quest` deixa de existir como entidade única e dá
> lugar a `Mission` (tarefa única) e `Habit` (tarefa recorrente), ambas
> organizadas dentro da hierarquia narrativa abaixo.

## 1. Visão Geral

O Ascendify organiza a vida do usuário como uma **história em progresso**,
não uma lista de tarefas solta:

```
Chapter (Capítulo)
  └── Subplot (Subtrama)
        ├── Mission (Missão)   — tarefa única, dá XP
        └── Habit (Hábito)     — tarefa recorrente, dá Coins
```

- **Capítulo** — um arco de vida definido de forma **subjetiva** pelo
  próprio usuário (ex: "Meu Glow Up", "Reconstrução"). Não tem prazo fixo
  nem regra numérica — é sobre a intenção que o usuário quer perseguir.
  **Apenas um Capítulo ativo por vez**, como capítulos de um livro
  (sequencial, não paralelo).
- **Subtrama** — quebra a meta subjetiva do Capítulo em fios mais
  concretos (ex: dentro de "Meu Glow Up": "Corpo", "Skincare",
  "Confiança").
- **Missão** — uma tarefa pontual dentro da Subtrama (ex: "Comprar creme
  facial"). Concluir dá **XP** ao personagem.
- **Hábito** — uma tarefa recorrente dentro da Subtrama (ex: "Skincare
  todo dia antes de dormir"). Cada check-in dá **Coins**, e a
  consistência ao longo do tempo é o que importa, não uma execução única.

O sistema pode ajudar a preencher lacunas que o usuário não definir
explicitamente (ex: sugerir Subtramas/Missões a partir do título do
Capítulo) — funcionalidade planejada para uma fase futura, fora do escopo
desta doc.

---

## 2. Duas moedas de recompensa

| Recompensa | Vem de | Efeito |
|---|---|---|
| **XP** | Missões concluídas, bônus de Capítulo/Subtrama | Progride nível do personagem (ver doc de XP e Níveis) |
| **Coins** | Cada check-in de Hábito | Moeda separada, para uso futuro em inventário/recompensas |

Essa separação reflete a natureza diferente de cada tarefa: Missão é sobre
**resultado** (fez ou não fez → força o personagem). Hábito é sobre
**processo** (repetição vira moeda, recompensando a jornada mesmo antes de
qualquer "resultado final").

---

## 3. Consolidação de Hábito (streak)

Um Hábito não tem uma conclusão binária como uma Missão — ele "amadurece"
conforme é repetido consistentemente.

- Cada `Habit` tem uma **meta de streak** (`streakGoal`), definida
  automaticamente pela frequência:
  - `DAILY` → 21 dias seguidos
  - `WEEKLY` → 8 semanas seguidas
- Cada check-in (`HabitCompletion`) atualiza o `currentStreak`:
  - Se o check-in respeita a frequência esperada (ex: check-in diário sem
    pular um dia) → `currentStreak += 1`
  - Se o usuário deixa passar o período esperado sem check-in → o streak
    zera (`currentStreak = 0`)
- Quando `currentStreak >= streakGoal` → o Hábito fica **consolidado**
  (`consolidated = true`). O usuário pode continuar praticando (o hábito
  não é "desativado"), mas ele deixa de bloquear a conclusão da Subtrama.
- Hábitos **arquivados** (`isArchived = true`, o usuário desistiu
  explicitamente) também não bloqueiam a conclusão — são simplesmente
  ignorados na checagem.

---

## 4. Conclusão em Cascata

- **Subtrama completa automaticamente quando:** todas as Missões estão
  `COMPLETED` **e** todos os Hábitos não-arquivados estão `consolidated`.
- **Capítulo completa automaticamente quando:** todas as Subtramas estão
  `COMPLETED`.

Isso garante que o fechamento de um Capítulo — um momento narrativamente
importante — só acontece quando tanto as ações pontuais (Missões) quanto
os comportamentos que deveriam se tornar hábito (Hábitos) realmente se
consolidaram.

---

## 5. Entidades

### 5.1 `Chapter` (Capítulo)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `characterId` | String | FK para `Character` |
| `title` | String | Título subjetivo (ex: "Meu Glow Up") |
| `description` | String? | Contexto/intenção do capítulo |
| `status` | Enum (`IN_PROGRESS`, `COMPLETED`) | Estado atual |
| `xpBonus` | Int | XP concedido ao completar o capítulo inteiro |
| `order` | Int | Ordem sequencial entre capítulos do personagem |
| `createdAt` | DateTime | Criação |
| `completedAt` | DateTime? | Quando foi concluído |

**Regra de negócio:** um `Character` só pode ter **um** `Chapter` com
`status = IN_PROGRESS` por vez.

### 5.2 `Subplot` (Subtrama)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `chapterId` | String | FK para `Chapter` |
| `title` | String | Título da subtrama |
| `description` | String? | Descrição |
| `status` | Enum (`IN_PROGRESS`, `COMPLETED`) | Estado atual |
| `xpBonus` | Int | XP concedido ao completar a subtrama |
| `createdAt` | DateTime | Criação |
| `completedAt` | DateTime? | Quando foi concluída |

### 5.3 `Mission` (Missão)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `subplotId` | String | FK para `Subplot` |
| `title` | String | Título da missão |
| `description` | String? | Descrição |
| `xpReward` | Int | XP ao concluir (1–1000, ver doc de XP) |
| `status` | Enum (`PENDING`, `COMPLETED`) | Estado atual |
| `completedAt` | DateTime? | Quando foi concluída |
| `createdAt` | DateTime | Criação |

### 5.4 `Habit` (Hábito)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `subplotId` | String | FK para `Subplot` |
| `title` | String | Título do hábito |
| `description` | String? | Descrição |
| `frequency` | Enum (`DAILY`, `WEEKLY`) | Frequência esperada |
| `coinsReward` | Int | Coins concedidos a cada check-in |
| `streakGoal` | Int | Meta de streak para consolidar (21 se `DAILY`, 8 se `WEEKLY`, definido na criação) |
| `currentStreak` | Int | Sequência atual (default 0) |
| `longestStreak` | Int | Maior sequência já alcançada (default 0, histórico) |
| `consolidated` | Boolean | Se já atingiu a meta de streak (default `false`) |
| `lastCompletedAt` | DateTime? | Último check-in, usado para detectar quebra de streak |
| `isArchived` | Boolean | Se o usuário encerrou o hábito (default `false`) |
| `createdAt` | DateTime | Criação |

### 5.5 `HabitCompletion` (log de check-ins)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `habitId` | String | FK para `Habit` |
| `completedAt` | DateTime | Data/hora do check-in |

### 5.6 `Character` — campo novo

Adiciona o saldo de moedas:

| Campo | Tipo | Descrição |
|---|---|---|
| `coins` | Int | Saldo acumulado de Coins (default 0) |

---

## 6. Diagrama de Relacionamentos

```
Character 1─N Chapter 1─N Subplot ─┬─N Mission
                                    └─N Habit 1─N HabitCompletion

Character.coins ← incrementado a cada HabitCompletion
Character.currentXp/totalXp ← incrementado a cada Mission concluída
                               e a cada Chapter/Subplot completado (xpBonus)
```

---

## 7. Rascunho do `schema.prisma` (substitui o model `Quest`)

```prisma
model Chapter {
  id          String        @id @default(cuid())
  characterId String
  title       String
  description String?
  status      ChapterStatus @default(IN_PROGRESS)
  xpBonus     Int           @default(0)
  order       Int
  createdAt   DateTime      @default(now())
  completedAt DateTime?

  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  subplots  Subplot[]
}

enum ChapterStatus {
  IN_PROGRESS
  COMPLETED
}

model Subplot {
  id          String        @id @default(cuid())
  chapterId   String
  title       String
  description String?
  status      ChapterStatus @default(IN_PROGRESS)
  xpBonus     Int           @default(0)
  createdAt   DateTime      @default(now())
  completedAt DateTime?

  chapter  Chapter   @relation(fields: [chapterId], references: [id], onDelete: Cascade)
  missions Mission[]
  habits   Habit[]
}

model Mission {
  id          String        @id @default(cuid())
  subplotId   String
  title       String
  description String?
  xpReward    Int
  status      MissionStatus @default(PENDING)
  completedAt DateTime?
  createdAt   DateTime      @default(now())

  subplot Subplot @relation(fields: [subplotId], references: [id], onDelete: Cascade)
}

enum MissionStatus {
  PENDING
  COMPLETED
}

model Habit {
  id              String         @id @default(cuid())
  subplotId       String
  title           String
  description     String?
  frequency       HabitFrequency
  coinsReward     Int
  streakGoal      Int
  currentStreak   Int            @default(0)
  longestStreak   Int            @default(0)
  consolidated    Boolean        @default(false)
  lastCompletedAt DateTime?
  isArchived      Boolean        @default(false)
  createdAt       DateTime       @default(now())

  subplot     Subplot           @relation(fields: [subplotId], references: [id], onDelete: Cascade)
  completions HabitCompletion[]
}

enum HabitFrequency {
  DAILY
  WEEKLY
}

model HabitCompletion {
  id          String   @id @default(cuid())
  habitId     String
  completedAt DateTime @default(now())

  habit Habit @relation(fields: [habitId], references: [id], onDelete: Cascade)
}
```

**No `Character`:** remover `quests Quest[]`, adicionar `chapters Chapter[]`
e o campo `coins Int @default(0)`. O model `Quest` e seus enums
(`QuestType`, `QuestStatus`) devem ser removidos do schema.

---

## 8. Onde a lógica vive (arquitetura)

| Responsabilidade | Local |
|---|---|
| Concluir Missão → dar XP → checar cascata | `mission.service.ts` |
| Check-in de Hábito → dar Coins → atualizar streak/consolidação → checar cascata | `habit.service.ts` |
| Verificar se todas Missões/Hábitos de uma Subtrama permitem conclusão | `subplot.service.ts` (chamado pelos services acima) |
| Verificar se todas Subtramas de um Capítulo permitem conclusão | `chapter.service.ts` (chamado pelo `subplot.service.ts`) |

Controllers permanecem finos — só recebem request, chamam o service, devolvem resposta.

---

## 9. Decisões em Aberto

- [ ] O que fazer quando o Capítulo ativo é concluído — o próximo Capítulo
      precisa ser criado manualmente pelo usuário, ou o sistema sugere um
      automaticamente?
- [ ] Existe alguma penalidade por quebrar um streak (ex: perder Coins), ou
      só reseta o contador sem punição adicional?
- [ ] Uso futuro dos Coins (loja de cosméticos pro personagem? troca por
      títulos?) — fora do escopo desta doc, mas vale registrar a ideia.