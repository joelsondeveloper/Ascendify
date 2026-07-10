# EP-05 — Sistema de Rotina Dinâmica

**Épico:** EP-05 — Sistema de Rotina Dinâmica

## Objetivo

Permitir que o Sistema organize automaticamente a rotina do jogador com base em sua disponibilidade, prioridades, evolução e imprevistos, criando uma agenda inteligente e adaptável.

A rotina deve evoluir constantemente conforme o comportamento do jogador, sempre mantendo sua autonomia sobre as decisões.

---

# US-05.01 — Configurar Disponibilidade Semanal

## História

Como jogador,

Quero informar meus horários disponíveis,

Para que o Sistema consiga montar minha rotina.

### Critérios de Aceitação

- Permitir cadastrar horários livres durante a semana.
- Permitir editar a disponibilidade.
- Permitir remover horários.
- Salvar as alterações automaticamente.

### Prioridade

Must Have

### Dependências

US-01.04 — Criar Perfil do Jogador

---

# US-05.02 — Gerar Disponibilidade com auxílio da IA

## História

Como jogador,

Quero informar minha rotina através de um prompt,

Para que a IA organize automaticamente meus horários.

### Critérios de Aceitação

- O jogador poderá descrever sua rotina em linguagem natural.
- A IA interpretará o texto.
- A IA criará automaticamente os blocos da semana.
- O jogador deverá aprovar antes da criação.

### Prioridade

Must Have

### Dependências

US-05.01

---

# US-05.03 — Criar Blocos da Rotina

## História

Como jogador,

Quero organizar minha semana utilizando blocos,

Para representar diferentes momentos do meu dia.

### Critérios de Aceitação

Permitir criar blocos dos seguintes tipos:

- Livre
- Ocupado
- Fixo
- Descanso

O Sistema deverá respeitar as características de cada tipo.

### Prioridade

Must Have

### Dependências

US-05.01

---

# US-05.04 — Gerar Agenda Semanal

## História

Como jogador,

Quero que o Sistema organize automaticamente minhas missões,

Para facilitar meu planejamento.

### Critérios de Aceitação

- A IA deverá distribuir as missões disponíveis.
- O Sistema deverá respeitar os blocos fixos.
- O Sistema deverá utilizar os horários livres.
- O jogador deverá aprovar a agenda antes da aplicação.

### Prioridade

Must Have

### Dependências

EP-04 — Sistema de Missões

---

# US-05.05 — Reorganizar a Rotina

## História

Como jogador,

Quero informar imprevistos,

Para que o Sistema reorganize automaticamente minha agenda.

### Critérios de Aceitação

- O jogador poderá informar imprevistos através do chat.
- A IA deverá recalcular a rotina.
- A IA deverá preservar o maior número possível de missões.
- A nova agenda deverá ser apresentada ao jogador antes da aplicação.

### Prioridade

Must Have

### Dependências

US-05.04

---

# US-05.06 — Adaptar Missões

## História

Como jogador,

Quero que a IA adapte minhas missões quando necessário,

Para que continuem compatíveis com minha rotina.

### Critérios de Aceitação

A IA poderá:

- Diminuir duração.
- Aumentar duração.
- Dividir uma missão.
- Adiar uma missão.

Todas as alterações deverão ser aprovadas pelo jogador.

### Prioridade

Must Have

### Dependências

US-04.11 — Adaptar uma Missão

---

# US-05.07 — Inserir Blocos de Descanso

## História

Como jogador,

Quero que o Sistema reserve momentos para descanso,

Para manter uma rotina sustentável.

### Critérios de Aceitação

- A IA poderá sugerir blocos de descanso.
- Os blocos poderão ser editados.
- O jogador poderá aceitar ou rejeitar as sugestões.

### Prioridade

Must Have

### Dependências

US-05.04

---

# US-05.08 — Aprender com o Comportamento do Jogador

## História

Como jogador,

Quero que a IA aprenda com meus hábitos,

Para gerar rotinas cada vez melhores.

### Critérios de Aceitação

A IA poderá analisar:

- Horários de maior produtividade.
- Missões frequentemente adiadas.
- Missões frequentemente concluídas.
- Horários preferidos.
- Tempo médio de execução.

Nenhuma alteração será aplicada automaticamente.

### Prioridade

Should Have

### Dependências

US-05.05

---

# US-05.09 — Sugerir Melhorias na Rotina

## História

Como jogador,

Quero receber sugestões de melhoria,

Para tornar minha rotina mais eficiente.

### Critérios de Aceitação

- A IA poderá sugerir alterações permanentes.
- O jogador poderá aceitar ou rejeitar cada sugestão.
- Nenhuma mudança ocorrerá automaticamente.

### Prioridade

Should Have

### Dependências

US-05.08

---

# US-05.10 — Definir Prioridades da IA

## História

Como jogador,

Quero definir a ordem de prioridade entre as áreas da minha vida,

Para que o Sistema organize minha rotina de acordo com meus objetivos.

### Critérios de Aceitação

- Permitir ordenar categorias por prioridade.
- Permitir alterar a ordem a qualquer momento.
- A IA deverá utilizar essa configuração na geração da rotina.

### Prioridade

Must Have

### Dependências

US-05.04

---

# US-05.11 — Alterar o Modo da IA

## História

Como jogador,

Quero escolher o modo de atuação da IA,

Para adaptar o comportamento do Sistema ao meu momento atual.

### Critérios de Aceitação

O Sistema deverá oferecer modos como:

- Equilibrado
- Prioridade
- Recuperação
- Sprint

Cada modo deverá influenciar a tomada de decisões da IA.

### Prioridade

Could Have

### Dependências

US-05.10

---

# Melhorias Futuras

Estas funcionalidades poderão ser implementadas em versões futuras.

- Integração com Google Calendar.
- Integração com Apple Calendar.
- Integração com Outlook.
- Sugestões baseadas em clima.
- Sugestões baseadas em localização.
- Ajuste automático utilizando dados de sono.
- Ajuste automático utilizando dispositivos vestíveis (smartwatch).
- Planejamento mensal e anual.