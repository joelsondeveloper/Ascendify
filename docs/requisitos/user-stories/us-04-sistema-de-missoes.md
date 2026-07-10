# EP-04 — Sistema de Missões

**Épico:** EP-04 — Sistema de Missões

## Objetivo

Permitir que o jogador realize atividades que impulsionem sua evolução dentro do Arco Principal.

As Missões representam as ações executadas pelo jogador para alcançar seus objetivos. Elas podem ser criadas manualmente ou sugeridas pela Inteligência Artificial, adaptando-se dinamicamente à rotina e ao desempenho do jogador.

---

# US-04.01 — Criar uma Missão Manualmente

## História

Como jogador,

Quero criar uma missão manualmente,

Para registrar atividades importantes da minha jornada.

### Critérios de Aceitação

- Informar título da missão.
- Selecionar uma Subtrama.
- Caso não exista uma Subtrama, utilizar automaticamente a "Subtrama Principal".
- Permitir adicionar descrição.
- Salvar a missão.

### Prioridade

Must Have

### Dependências

US-03.01 — Criar uma Subtrama

---

# US-04.02 — Criar Missões com auxílio da IA

## História

Como jogador,

Quero receber sugestões de missões,

Para acelerar o planejamento da minha jornada.

### Critérios de Aceitação

- A IA poderá sugerir uma ou mais missões.
- O jogador poderá editar qualquer sugestão.
- O jogador poderá aceitar ou rejeitar cada missão.
- Apenas missões aprovadas serão criadas.

### Prioridade

Must Have

### Dependências

US-03.02 — Criar Subtrama com auxílio da IA

---

# US-04.03 — Classificar uma Missão

## História

Como jogador,

Quero definir o tipo de uma missão,

Para organizar melhor minha jornada.

### Critérios de Aceitação

- Permitir selecionar um tipo.
- Permitir alterar posteriormente.
- O tipo deverá ser utilizado pela IA para futuras análises.

### Prioridade

Should Have

### Dependências

US-04.01

---

# US-04.04 — Editar uma Missão

## História

Como jogador,

Quero editar uma missão,

Para adaptá-la quando necessário.

### Critérios de Aceitação

- Alterar nome.
- Alterar descrição.
- Alterar Subtrama.
- Alterar recorrência.
- Alterar prazo.

### Prioridade

Must Have

### Dependências

US-04.01

---

# US-04.05 — Excluir uma Missão

## História

Como jogador,

Quero excluir uma missão,

Para reorganizar minha jornada.

### Critérios de Aceitação

- Solicitar confirmação.
- Remover a missão da rotina.
- Atualizar os dados relacionados.

### Prioridade

Should Have

### Dependências

US-04.01

---

# US-04.06 — Concluir uma Missão

## História

Como jogador,

Quero concluir uma missão,

Para receber minhas recompensas.

### Critérios de Aceitação

- Permitir conclusão manual.
- Registrar data e horário.
- Liberar recompensas.
- Atualizar progresso da Subtrama.
- Atualizar progresso do Arco.

### Prioridade

Must Have

### Dependências

US-04.01

---

# US-04.07 — Criar Missões Recorrentes

## História

Como jogador,

Quero criar missões recorrentes,

Para representar hábitos e atividades frequentes.

### Critérios de Aceitação

- Permitir frequência diária.
- Permitir frequência semanal.
- Permitir frequência mensal.
- Gerar automaticamente novas ocorrências.

### Prioridade

Must Have

### Dependências

US-04.01

---

# US-04.08 — Criar Missões com Pré-requisitos

## História

Como jogador,

Quero definir pré-requisitos para algumas missões,

Para criar uma progressão lógica.

### Critérios de Aceitação

- Permitir adicionar uma ou mais dependências.
- A missão permanecerá bloqueada até que seus pré-requisitos sejam concluídos.
- Missões recorrentes não poderão possuir pré-requisitos.

### Prioridade

Should Have

### Dependências

US-04.01

---

# US-04.09 — Definir Prazo para uma Missão

## História

Como jogador,

Quero definir um prazo,

Para limitar o período disponível para sua conclusão.

### Critérios de Aceitação

- Permitir escolher data.
- Permitir definir horário.
- Permitir criar missões sem prazo.

### Prioridade

Must Have

### Dependências

US-04.01

---

# US-04.10 — Expirar uma Missão

## História

Como jogador,

Quero que missões possam expirar,

Para representar atividades que perderam o momento ideal de execução.

### Critérios de Aceitação

- Missões com prazo poderão expirar.
- A IA decidirá se a missão será adaptada, reagendada ou encerrada.
- Penalidades poderão ser aplicadas.

### Prioridade

Should Have

### Dependências

US-04.09

---

# US-04.11 — Adaptar uma Missão

## História

Como jogador,

Quero que a IA adapte uma missão,

Para que ela continue compatível com minha rotina.

### Critérios de Aceitação

- A IA poderá diminuir a duração da missão.
- A IA poderá aumentar a duração da missão.
- A IA poderá dividir uma missão em etapas menores.
- Nenhuma alteração ocorrerá sem aprovação do jogador.

### Prioridade

Must Have

### Dependências

US-04.02

---

# US-04.12 — Reorganizar Missões na Rotina

## História

Como jogador,

Quero que minhas missões sejam reorganizadas automaticamente,

Para lidar com imprevistos.

### Critérios de Aceitação

- A IA poderá alterar horários.
- A IA poderá alterar dias.
- A missão continuará sendo a mesma.
- O histórico da missão será preservado.

### Prioridade

Must Have

### Dependências

EP-05 — Sistema de Rotina Dinâmica

---

# US-04.13 — Aplicar Penalidades

## História

Como jogador,

Quero que existam consequências por abandonar minhas missões,

Para tornar minha evolução mais significativa.

### Critérios de Aceitação

- Reduzir HP quando aplicável.
- Reduzir recompensas.
- Dobrar objetivos de missões futuras quando apropriado.
- Registrar a penalidade no histórico.

### Prioridade

Must Have

### Dependências

EP-07 — Sistema de Progressão

---

# US-04.14 — Receber Recompensas

## História

Como jogador,

Quero receber recompensas após concluir missões,

Para sentir minha evolução.

### Critérios de Aceitação

O Sistema poderá conceder:

- XP
- Ouro
- HP
- Itens
- Boosts

A quantidade será calculada automaticamente pela IA conforme a dificuldade da missão.

### Prioridade

Must Have

### Dependências

EP-07 — Sistema de Progressão

---

# US-04.15 — Validar Recompensas Reais

## História

Como jogador,

Quero cadastrar recompensas da vida real,

Para utilizá-las como incentivo durante minha jornada.

### Critérios de Aceitação

- O jogador poderá sugerir recompensas.
- A IA analisará se a recompensa está alinhada ao objetivo do Arco.
- O Sistema poderá aprovar ou rejeitar a recompensa.
- Apenas recompensas aprovadas poderão ser adquiridas na Loja.

### Prioridade

Must Have

### Dependências

EP-08 — Loja

---

# US-04.16 — Desbloquear Missões Especiais

## História

Como jogador,

Quero desbloquear missões especiais,

Para tornar minha jornada mais surpreendente.

### Critérios de Aceitação

- O Sistema poderá criar missões ocultas.
- As missões serão desbloqueadas ao cumprir requisitos específicos.
- O jogador receberá uma notificação ao desbloqueá-las.
- As recompensas dessas missões serão superiores às missões comuns.

### Prioridade

Could Have

### Dependências

US-04.06

---

# Melhorias Futuras

Estas funcionalidades poderão ser implementadas em versões futuras.

- Conclusão automática por integrações (Google Fit, Apple Health, Strava, GitHub etc.).
- Missões colaborativas.
- Missões em grupo.
- Missões criadas pela comunidade.
- Missões sazonais.
- Missões por localização (GPS).
- Missões geradas por eventos do calendário.
- Missões baseadas em clima.