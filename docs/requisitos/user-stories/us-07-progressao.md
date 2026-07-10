# EP-07 — Sistema de Progressão

**Épico:** EP-07 — Sistema de Progressão

## Objetivo

Representar visualmente a evolução do jogador através de níveis, experiência, HP, ouro, títulos e outras mecânicas que reforcem seu progresso durante a jornada.

O Sistema deverá recompensar a consistência, incentivar a evolução contínua e buscar recuperar o jogador antes de aplicar penalidades severas.

---

# US-07.01 — Ganhar Experiência (XP)

## História

Como jogador,

Quero ganhar experiência ao concluir atividades,

Para evoluir meu personagem.

### Critérios de Aceitação

- Conceder XP ao concluir missões.
- Conceder XP ao derrotar Bosses.
- Conceder XP ao concluir Subtramas.
- Conceder XP ao concluir Arcos.
- Registrar todo XP obtido.

### Prioridade

Must Have

### Dependências

EP-04

---

# US-07.02 — Evoluir de Nível

## História

Como jogador,

Quero subir de nível,

Para visualizar minha evolução.

### Critérios de Aceitação

- Cada nível deverá exigir determinada quantidade de XP.
- O Sistema deverá atualizar o nível automaticamente.
- O jogador deverá ser notificado ao subir de nível.

### Prioridade

Must Have

### Dependências

US-07.01

---

# US-07.03 — Desbloquear Conteúdo

## História

Como jogador,

Quero desbloquear novos recursos ao evoluir,

Para sentir que minha progressão possui impacto.

### Critérios de Aceitação

Ao subir de nível, o Sistema poderá desbloquear:

- Itens
- Boosts
- Funcionalidades
- Eventos especiais

### Prioridade

Should Have

### Dependências

US-07.02

---

# US-07.04 — Gerenciar HP

## História

Como jogador,

Quero possuir um indicador de HP,

Para representar minha capacidade de continuar evoluindo.

### Critérios de Aceitação

- O HP deverá aumentar ou diminuir conforme as ações do jogador.
- O Sistema deverá atualizar o HP automaticamente.
- O HP nunca poderá ultrapassar o limite máximo.

### Prioridade

Must Have

### Dependências

EP-04

---

# US-07.05 — Recuperar HP

## História

Como jogador,

Quero recuperar HP,

Para continuar minha jornada.

### Critérios de Aceitação

O HP poderá ser recuperado através de:

- Descanso
- Missões
- Itens
- Boosts

O Sistema deverá atualizar automaticamente o HP recuperado.

### Prioridade

Must Have

### Dependências

US-07.04

---

# US-07.06 — Ganhar Ouro

## História

Como jogador,

Quero ganhar ouro,

Para adquirir recursos na Loja.

### Critérios de Aceitação

O Sistema poderá conceder ouro através de:

- Missões
- Bosses
- Subtramas
- Arcos
- Eventos
- Missões Especiais
- Outras fontes definidas pelo Sistema

### Prioridade

Must Have

### Dependências

EP-04

---

# US-07.07 — Aplicar Penalidades

## História

Como jogador,

Quero que minhas escolhas tenham consequências,

Para tornar minha jornada significativa.

### Critérios de Aceitação

O Sistema poderá aplicar penalidades como:

- Redução de HP.
- Redução de Ouro.
- Aumento da dificuldade.
- Reforço de objetivos futuros.
- Outras penalidades definidas pelo Sistema.

Antes de aplicar penalidades severas, o Sistema deverá tentar recuperar o jogador através de adaptações e recomendações.

### Prioridade

Must Have

### Dependências

US-07.04

---

# US-07.08 — Perder Experiência

## História

Como jogador,

Quero que exista risco de perder experiência,

Para que minhas escolhas tenham peso.

### Critérios de Aceitação

- A perda de XP deverá ocorrer apenas em situações extremas.
- O Sistema deverá esgotar todas as estratégias de recuperação antes dessa decisão.
- A quantidade perdida deverá ser calculada automaticamente.
- O jogador deverá ser informado sobre o motivo da perda.

### Prioridade

Could Have

### Dependências

US-07.07

---

# US-07.09 — Receber Títulos

## História

Como jogador,

Quero receber títulos,

Para representar minhas conquistas.

### Critérios de Aceitação

Os títulos poderão ser desbloqueados por:

- Conclusão de Arcos.
- Bosses derrotados.
- Quantidade de missões.
- Eventos especiais.
- Outros critérios definidos pelo Sistema.

Os títulos deverão permanecer permanentemente na conta do jogador.

### Prioridade

Should Have

### Dependências

US-07.02

---

# US-07.10 — Visualizar Estatísticas

## História

Como jogador,

Quero visualizar minha evolução,

Para acompanhar meu desempenho.

### Critérios de Aceitação

Exibir informações como:

- Nível.
- XP.
- HP.
- Ouro.
- Missões concluídas.
- Arcos concluídos.
- Bosses derrotados.
- Títulos conquistados.

### Prioridade

Must Have

### Dependências

US-07.02

---

# US-07.11 — Receber Recompensas por Marcos

## História

Como jogador,

Quero receber recompensas ao atingir determinados marcos,

Para sentir que minha evolução é reconhecida.

### Critérios de Aceitação

O Sistema poderá conceder recompensas ao atingir:

- Níveis.
- Sequências de missões.
- Arcos concluídos.
- Quantidade de XP.
- Outros marcos definidos pelo Sistema.

### Prioridade

Should Have

### Dependências

US-07.02

---

# Melhorias Futuras

Estas funcionalidades poderão ser implementadas em versões futuras.

- Sistema de Atributos.
- Prestígio.
- Árvore de Habilidades.
- Reencarnação do Personagem.
- Ranking entre amigos.
- Medalhas especiais.