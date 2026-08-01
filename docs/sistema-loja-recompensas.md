# Sistema de Loja e Recompensas (Coins)

> Última atualização: 25/07/2026

## 1. Visão Geral

Dá propósito aos Coins acumulados via Hábitos consolidados. Existem duas
categorias de item na loja:

1. **Recompensa de Vida Real** — criada pelo próprio jogador (ex: "Jogar
   30min", "Pedir aquele lanche"). Resgatável **repetidamente**, com preço
   que sobe conforme a demanda recente (inflação).
2. **Cosmético do Sistema** — catálogo fixo, definido pelo desenvolvedor.
   Se divide em:
   - **Permanente** (ex: Título) — compra única, fica pra sempre, pode
     ser equipado/desequipado.
   - **Consumível** (ex: Poções) — compra repetida, vai pro inventário do
     personagem, é "usado" numa ação separada que aciona um efeito.

---

## 2. Inflação por Demanda (Recompensas de Vida Real)

O preço de uma recompensa de vida real não é fixo — ele reflete quantas
vezes ela foi resgatada **recentemente**.

### Fórmula

```
precoAtual(item) = round(
  basePrice * (1 + INFLATION_RATE * resgatesNaJanela)
)

INFLATION_RATE = 0.15   (15% por resgate dentro da janela)
JANELA = 7 dias
```

`resgatesNaJanela` = quantidade de vezes que **esse item específico** foi
resgatado nos últimos 7 dias (rolling window).

**Por que uma janela de tempo, e não um contador que só sobe?** Porque o
preço precisa "esfriar" naturalmente conforme o tempo passa e os resgates
antigos saem da janela — sem isso, um item usado muito numa semana ficaria
caro pra sempre, mesmo que o jogador parasse de resgatar. A janela cria
inflação **e** deflação automáticas, sem precisar de um job/cron separado.

### Exemplo

Item "Jogar 30min", `basePrice = 20`:

| Resgates nos últimos 7 dias | Preço atual |
|---|---|
| 0 | 20 |
| 1 | 23 |
| 3 | 29 |
| 5 | 35 |

---

## 3. Cosméticos

### 3.1 Permanentes (ex: Título)

- Compra única — depois de resgatado, o item fica marcado como "possuído"
  pelo personagem (verificado pela existência de um registro de resgate).
- Tentar comprar de novo é bloqueado.
- Um cosmético do tipo Título tem um `effectValue` (o texto do título em
  si). Ao **equipar**, esse valor é copiado pro campo `Character.title`
  que já existe desde a doc de modelagem original.
- O jogador pode ter vários títulos possuídos, mas só um equipado por vez.

### 3.2 Consumíveis (ex: Poções)

- Compra repetida — cada resgate soma `+1` no inventário do personagem
  pra aquele item.
- Usar o item (ação separada de "comprar") subtrai `1` do inventário e
  aciona o `effectType` do item.
- **Arquitetura extensível de efeitos:** cada item consumível carrega um
  `effectType` (string/enum), permitindo adicionar novas poções no futuro
  sem redesenhar o sistema — só é preciso implementar o handler daquele
  efeito específico.

### Efeito implementado no MVP: `STREAK_FREEZE`

> Poção de Recuperação — funciona como um **congelamento preventivo**
> (estilo "streak freeze" do Duolingo), não uma restauração reativa.

- O jogador usa a poção **antes** de faltar um check-in.
- Isso marca `Habit.hasActiveFreeze = true`.
- Na próxima checagem de streak: se o período for pulado mas
  `hasActiveFreeze` estiver `true`, o streak **não** quebra — o freeze é
  consumido (`hasActiveFreeze` volta a `false`) e o streak continua de
  onde estava, sem incrementar nem resetar.

**Por que congelamento preventivo, e não restauração reativa?** Restaurar
um streak já quebrado exigiria guardar um histórico detalhado do valor
exato do streak antes de cada quebra (mais uma tabela, mais complexidade,
mais espaço pra bugs de sincronização). O congelamento preventivo é mais
simples de implementar corretamente, mais fácil de entender pelo jogador
("uso antes de faltar"), e é um padrão já validado por apps como Duolingo.

Outros efeitos (`effectType`) podem ser adicionados depois seguindo o
mesmo padrão — cada um implementado como uma função separada, mapeada pelo
código do efeito.

---

## 4. Entidades

### 4.1 `ShopItem`

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `characterId` | String? | `null` = cosmético global (mesmo catálogo pra todos); preenchido = recompensa de vida real criada por esse personagem |
| `type` | Enum (`REAL_LIFE`, `COSMETIC`) | Categoria do item |
| `cosmeticKind` | Enum? (`PERMANENT`, `CONSUMABLE`) | Só preenchido se `type = COSMETIC` |
| `title` | String | Nome do item |
| `description` | String? | Descrição |
| `effectType` | String? | Código do efeito (só para consumíveis, ex: `STREAK_FREEZE`) |
| `effectValue` | String? | Valor associado ao efeito (ex: texto do título, pra cosméticos permanentes) |
| `basePrice` | Int | Preço base, usado no cálculo de inflação (para `REAL_LIFE`) ou preço fixo (para `COSMETIC`) |
| `createdAt` | DateTime | Criação |

### 4.2 `RewardRedemption` (log de resgates)

Serve tanto de histórico quanto de base para o cálculo de inflação e para
verificar posse de cosméticos permanentes.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `shopItemId` | String | FK para `ShopItem` |
| `characterId` | String | FK para `Character` |
| `pricePaid` | Int | Preço efetivamente pago (registrado no momento, já que o preço flutua) |
| `redeemedAt` | DateTime | Quando foi resgatado |

### 4.3 `CharacterInventoryItem` (só para consumíveis)

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | String (cuid) | Identificador único |
| `characterId` | String | FK para `Character` |
| `shopItemId` | String | FK para `ShopItem` |
| `quantity` | Int | Quantidade em posse (default 0) |

### 4.4 `Habit` — campo novo

| Campo | Tipo | Descrição |
|---|---|---|
| `hasActiveFreeze` | Boolean | Se há um congelamento ativo protegendo o próximo período (default `false`) |

### 4.5 `Character` — sem novos campos

O campo `title` já existe desde a doc de modelagem original — cosméticos
de título apenas passam a **escrever** nesse campo ao equipar.

---

## 5. Rascunho do `schema.prisma`

```prisma
model ShopItem {
  id           String        @id @default(cuid())
  characterId  String?
  type         ShopItemType
  cosmeticKind CosmeticKind?
  title        String
  description  String?
  effectType   String?
  effectValue  String?
  basePrice    Int
  isArchived   Boolean       @default(false)
  createdAt    DateTime      @default(now())

  character   Character?               @relation(fields: [characterId], references: [id], onDelete: Cascade)
  redemptions RewardRedemption[]
  inventory   CharacterInventoryItem[]
}

enum ShopItemType {
  REAL_LIFE
  COSMETIC
}

enum CosmeticKind {
  PERMANENT
  CONSUMABLE
}

model RewardRedemption {
  id          String   @id @default(cuid())
  shopItemId  String
  characterId String
  pricePaid   Int
  redeemedAt  DateTime @default(now())

  shopItem  ShopItem  @relation(fields: [shopItemId], references: [id], onDelete: Cascade)
  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
}

model CharacterInventoryItem {
  id          String @id @default(cuid())
  characterId String
  shopItemId  String
  quantity    Int    @default(0)

  character Character @relation(fields: [characterId], references: [id], onDelete: Cascade)
  shopItem  ShopItem  @relation(fields: [shopItemId], references: [id], onDelete: Cascade)

  @@unique([characterId, shopItemId])
}
```

**No `Character`:** adiciona `shopItems ShopItem[]`,
`redemptions RewardRedemption[]`, `inventory CharacterInventoryItem[]`.

**No `Habit`:** adiciona `hasActiveFreeze Boolean @default(false)`.

---

## 6. Regras de Negócio (resumo)

| Ação | Regra |
|---|---|
| Criar recompensa de vida real | Livre, o próprio jogador define título e `basePrice` |
| Resgatar recompensa de vida real | Sempre permitido (se tiver Coins suficientes), preço calculado dinamicamente |
| Comprar cosmético permanente | Bloqueado se já possuído |
| Comprar cosmético consumível | Sempre permitido (se tiver Coins), soma no inventário |
| Equipar título | Copia `effectValue` pro `Character.title`; só pode equipar títulos já possuídos |
| Usar poção `STREAK_FREEZE` | Exige `quantity > 0` no inventário; marca `Habit.hasActiveFreeze = true`; consome 1 do inventário |
| Streak quebraria, mas `hasActiveFreeze = true` | Streak não reseta; freeze é consumido |

---

## 7. Onde a lógica vive

| Responsabilidade | Local |
|---|---|
| Cálculo de preço dinâmico (inflação) | `shop.service.ts` |
| Resgate de item (Coins, posse, inventário) | `shop.service.ts` |
| Uso de consumível + efeito `STREAK_FREEZE` | `shop.service.ts` chama `habit.service.ts` (função `applyFreeze`) |
| Verificação de streak considerando freeze | `habit.service.ts`, dentro de `calculateStreak`/`checkInHabit` |

---

## 8. Decisões Resolvidas

- **Seed de cosméticos:** o banco começa com 3–4 itens cosméticos
  pré-cadastrados (ex: 2 títulos + 1 poção `STREAK_FREEZE`) via script de
  seed, pra loja não começar vazia.
- **Editar/apagar recompensa de vida real:** editável livremente; "apagar"
  na verdade **arquiva** (`isArchived = true`), preservando o histórico em
  `RewardRedemption`. Mesmo padrão já usado em `Habit.isArchived`.
- **Limite de recompensas cadastradas:** 20 recompensas de vida real
  ativas (não arquivadas) por personagem — trava de sanidade, não uma
  decisão de produto elaborada.

### Campo adicional no `ShopItem`

| Campo | Tipo | Descrição |
|---|---|---|
| `isArchived` | Boolean | Se a recompensa de vida real foi arquivada pelo jogador (default `false`). Não se aplica a cosméticos globais. |