# Sistema de Rotina (Agenda de Blocos de Tempo)

> Última atualização: 25/07/2026

## 1. Visão Geral

Transforma o Ascendify de "lista de tarefas gamificada" em uma **agenda de
vida gamificada**: o jogador organiza Missões, Hábitos, Compromissos e
Descanso em blocos de tempo fixos ao longo do dia/semana.

**Escopo deste MVP:** organização **manual** (o jogador arrasta/posiciona
os blocos). Reorganização automática por algoritmo/IA ("O Sistema") é uma
evolução **futura**, fora do escopo desta doc — mas o modelo de dados já é
desenhado para não precisar de retrabalho quando isso for implementado.

---

## 2. Conceitos

- **Slot** — unidade fixa de tempo (ex: 30 minutos). O tamanho do slot é
  configurável por personagem (`scheduleSlotMinutes`, default 30).
- **Bloco (`ScheduleBlock`)** — ocupa um ou mais slots consecutivos, num
  dia específico. Todo bloco é de um dos 3 tipos:
  - **Missão** — vincula um `Mission` existente
  - **Hábito** — vincula um `Habit` existente
  - **Descanso** — bloco livre, sem vínculo com nada; o jogador pode gastar
    esse tempo como quiser, exceto itens da Loja (que continuam exigindo
    Coins normalmente — não há regra nova aqui, é só a mecânica de Loja já
    existente se aplicando).

### Compromissos

**Não é uma entidade nova.** Um "Compromisso" (ex: consulta médica,
reunião) é simplesmente uma **Missão ou Hábito com recompensa zero ou
opcional** — usado apenas para ocupar um horário na agenda, sem
necessariamente dar XP/Coins.

**Mudança necessária:** hoje `Mission.xpReward` e `Habit.coinsReward`
exigem valor mínimo de 1. Precisamos relaxar isso para aceitar `0`,
permitindo criar uma Missão/Hábito "compromisso" sem recompensa.

---

## 3. Entidade `ScheduleBlock`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `characterId` | String | FK para `Character` |
| `date` | DateTime | Data do bloco (só a data, sem componente de hora relevante) |
| `startSlot` | Int | Índice do slot inicial no dia (ex: slot 0 = 00:00, slot 1 = 00:30, se `scheduleSlotMinutes = 30`) |
| `durationSlots` | Int | Quantos slots consecutivos o bloco ocupa (default 1) |
| `blockType` | Enum (`MISSION`, `HABIT`, `REST`) | Tipo do bloco |
| `missionId` | String? | FK para `Mission`, obrigatório se `blockType = MISSION` |
| `habitId` | String? | FK para `Habit`, obrigatório se `blockType = HABIT` |
| `label` | String? | Texto livre, usado principalmente em blocos `REST` (ex: "Lazer", "Jogar") |
| `createdAt` | DateTime | Criação |

**Regra de validação:** não pode haver dois blocos do mesmo personagem, na
mesma data, com slots sobrepostos.

### Campo novo no `Character`

| Campo | Tipo | Descrição |
|---|---|---|
| `scheduleSlotMinutes` | Int | Duração de cada slot em minutos (default 30, configurável pelo jogador) |

---

## 4. Fluxo de Agendamento (MVP)

1. Jogador escolhe um dia (visão diária ou semanal)
2. Seleciona uma Missão ou Hábito já existente (ou cria um novo Descanso)
3. Escolhe o slot inicial e quantos slots o bloco ocupa
4. Sistema valida que não há sobreposição, cria o `ScheduleBlock`

### Conveniência para Hábitos recorrentes

Como um Hábito se repete (diário/semanal), agendar manualmente toda vez
seria cansativo. No MVP, ao agendar um Hábito, o jogador pode marcar
**"repetir pelos próximos N dias"** — isso cria vários `ScheduleBlock`
de uma vez (um por dia), no mesmo horário. Não é um "modelo recorrente
vivo" (mudar um não muda os outros depois de criados) — é só um atalho de
criação em lote, mantendo o modelo de dados simples.

---

## 5. Rascunho do `schema.prisma`

```prisma
model ScheduleBlock {
  id             String        @id @default(cuid())
  characterId    String
  date           DateTime
  startSlot      Int
  durationSlots  Int           @default(1)
  blockType      ScheduleBlockType
  missionId      String?
  habitId        String?
  label          String?
  createdAt      DateTime      @default(now())

  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  mission   Mission?  @relation(fields: [missionId], references: [id], onDelete: Cascade)
  habit     Habit?    @relation(fields: [habitId], references: [id], onDelete: Cascade)
}

enum ScheduleBlockType {
  MISSION
  HABIT
  REST
}
```

**No `Character`:** adiciona `scheduleBlocks ScheduleBlock[]` e
`scheduleSlotMinutes Int @default(30)`.

**No `Mission`:** adiciona `scheduleBlocks ScheduleBlock[]` (relação
inversa) e relaxa a validação de `xpReward` para aceitar `0` (mínimo
passa de 1 para 0).

**No `Habit`:** adiciona `scheduleBlocks ScheduleBlock[]` (relação
inversa) e relaxa a validação de `coinsReward` para aceitar `0`.

---

## 6. Onde a lógica vive

| Responsabilidade | Local |
|---|---|
| CRUD de blocos + validação de sobreposição | `schedule.service.ts` (novo módulo `schedule`) |
| Criação em lote (repetir Hábito por N dias) | `schedule.service.ts` |
| Consulta de agenda por dia/semana | `schedule.repository.ts` |

---

## 7. Evolução Futura: "O Sistema" (fora de escopo agora)

Registrado aqui só como visão, para não esquecer o objetivo final:

- Reorganização automática dos blocos quando um imprevisto ocorre (ex: uma
  Missão "vaza" do horário, o Sistema realoca o restante do dia)
- Possivelmente sugestões de encaixe baseadas em prioridade, energia, ou
  padrões de conclusão do jogador
- Esse é um problema de **algoritmo de scheduling/otimização** — só faz
  sentido atacar depois que o CRUD manual estiver validado com uso real

---

## 8. Decisões em Aberto

- [ ] Visão de semana precisa existir no MVP, ou começamos só com visão
      diária e adicionamos semana depois?
- [ ] O que acontece se o jogador tentar agendar um Hábito/Missão que já
      está `COMPLETED`/arquivado? Deveria bloquear?
- [ ] Blocos `REST` podem ser editados/removidos livremente, sem
      confirmação (já que não têm consequência de XP/Coins)?