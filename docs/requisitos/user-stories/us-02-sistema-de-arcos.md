# EP-02 — Sistema de Arcos

**Épico:** EP-02 — Sistema de Arcos

## Objetivo

Permitir que o jogador crie, desenvolva e conclua um Arco Principal, representando um grande objetivo pessoal dentro do Sistema.

O Arco funciona como a principal estrutura da jornada do jogador, organizando Subtramas, Missões, Bosses e toda a narrativa.

---

# US-02.01 — Criar um Arco

## História

Como jogador,

Quero criar um novo Arco,

Para iniciar uma nova jornada em direção a um objetivo importante.

### Critérios de Aceitação

* O sistema deve permitir criar um Arco.
* O Arco deve possuir um nome.
* O sistema deve impedir a criação de um novo Arco caso já exista um Arco ativo.
* O Arco deve ser salvo corretamente.

### Prioridade

Must Have

### Dependências

US-01.04 — Criar Perfil do Jogador

---

# US-02.02 — Criar um Arco no Modo Guiado

## História

Como jogador,

Quero criar um Arco utilizando a ajuda da IA,

Para que ela organize meu objetivo automaticamente.

### Critérios de Aceitação

* A IA deve conduzir uma conversa com o jogador.
* A IA deve sugerir objetivos.
* A IA deve sugerir Subtramas.
* A IA deve sugerir Bosses.
* A IA deve sugerir Missões iniciais.
* O jogador deve aprovar o resultado antes da criação.

### Prioridade

Must Have

### Dependências

US-02.01

---

# US-02.03 — Criar um Arco Manualmente

## História

Como jogador,

Quero criar meu Arco manualmente,

Para possuir controle total sobre minha jornada.

### Critérios de Aceitação

* O jogador poderá preencher todas as informações manualmente.
* A IA poderá apresentar sugestões sem modificar o conteúdo automaticamente.
* O jogador poderá aceitar ou rejeitar cada sugestão.

### Prioridade

Should Have

### Dependências

US-02.01

---

# US-02.04 — Definir Prazo do Arco

## História

Como jogador,

Quero definir um prazo para meu Arco,

Para acompanhar meu progresso dentro de um período específico.

### Critérios de Aceitação

* O prazo deverá ser opcional.
* O jogador poderá definir uma data prevista para conclusão.
* O jogador poderá criar Arcos sem prazo definido.
* A IA poderá sugerir alterações no prazo.

### Prioridade

Should Have

### Dependências

US-02.01

---

# US-02.05 — Editar um Arco

## História

Como jogador,

Quero editar meu Arco,

Para adaptá-lo conforme minha realidade.

### Critérios de Aceitação

* Permitir alterar nome.
* Permitir alterar descrição.
* Permitir alterar objetivo.
* Permitir alterar prazo.
* Permitir atualizar informações gerais.

### Prioridade

Must Have

### Dependências

US-02.01

---

# US-02.06 — Cancelar um Arco

## História

Como jogador,

Quero cancelar meu Arco,

Para desistir voluntariamente da jornada atual.

### Critérios de Aceitação

* O sistema deverá solicitar confirmação.
* O progresso deverá permanecer registrado no histórico.
* O jogador poderá iniciar um novo Arco após o cancelamento.

### Prioridade

Must Have

### Dependências

US-02.01

---

# US-02.07 — Concluir um Arco

## História

Como jogador,

Quero concluir meu Arco,

Para finalizar minha jornada e receber minhas recompensas.

### Critérios de Aceitação

* Todas as Subtramas obrigatórias devem estar concluídas.
* O Boss Final deve ter sido derrotado.
* O sistema deve registrar a conclusão.
* O sistema deve liberar as recompensas finais.
* O sistema deve gerar um relatório da jornada.

### Prioridade

Must Have

### Dependências

EP-03 — Sistema de Subtramas

EP-10 — Sistema de Bosses

---

# US-02.08 — Fracassar um Arco

## História

Como jogador,

Quero que o Sistema encerre meu Arco caso eu esgote meu HP,

Para que existam consequências reais durante minha jornada.

### Critérios de Aceitação

* O Arco deve ser encerrado quando o HP chegar a zero.
* O sistema deve registrar o fracasso.
* O jogador poderá reiniciar o Arco posteriormente.
* A narrativa deverá refletir o fracasso da jornada.

### Prioridade

Must Have

### Dependências

EP-07 — Sistema de Progressão

---

# US-02.09 — Visualizar o Progresso do Arco

## História

Como jogador,

Quero acompanhar meu progresso,

Para entender o quanto falta para concluir meu objetivo.

### Critérios de Aceitação

* Exibir progresso geral do Arco.
* Exibir Subtramas concluídas.
* Exibir Bosses derrotados.
* Exibir percentual de conclusão.
* Exibir tempo restante, quando houver prazo.

### Prioridade

Must Have

### Dependências

EP-03 — Sistema de Subtramas

---

# US-02.10 — Receber Recompensas Finais

## História

Como jogador,

Quero receber recompensas ao concluir um Arco,

Para sentir que todo meu esforço foi reconhecido.

### Critérios de Aceitação

* O sistema deve conceder uma quantidade significativa de XP.
* O sistema deve conceder Ouro.
* O sistema pode desbloquear recompensas exclusivas.
* O sistema deve registrar a conquista permanentemente.

### Prioridade

Must Have

### Dependências

US-02.07

---

# Melhorias Futuras

Estas funcionalidades não fazem parte do MVP, mas poderão ser adicionadas em versões futuras.

* Múltiplos Arcos simultâneos.
* Arcos compartilhados entre jogadores.
* Arcos criados pela comunidade.
* Templates de Arcos.
* Importação e exportação de Arcos.
* Recomendações automáticas baseadas em Arcos semelhantes.
