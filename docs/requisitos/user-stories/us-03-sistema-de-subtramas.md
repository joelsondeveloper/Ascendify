# EP-03 — Sistema de Subtramas

**Épico:** EP-03 — Sistema de Subtramas

## Objetivo

Permitir que o jogador organize seu Arco Principal em Subtramas, dividindo grandes objetivos em etapas menores, organizadas e acompanhadas pelo Sistema.

As Subtramas representam áreas fundamentais da jornada do jogador e podem possuir requisitos, dependências, Bosses e narrativas próprias.

---

# US-03.01 — Criar uma Subtrama

## História

Como jogador,

Quero criar uma Subtrama,

Para dividir meu Arco Principal em objetivos menores e mais organizados.

### Critérios de Aceitação

* Permitir informar um nome.
* Associar a Subtrama a um Arco ativo.
* Salvar corretamente a Subtrama.
* Exibir a nova Subtrama na jornada do jogador.

### Prioridade

Must Have

### Dependências

US-02.01 — Criar um Arco

---

# US-03.02 — Criar Subtrama com auxílio da IA

## História

Como jogador,

Quero que a IA sugira Subtramas,

Para organizar meu Arco de forma mais eficiente.

### Critérios de Aceitação

* A IA poderá sugerir uma ou mais Subtramas.
* O jogador poderá aceitar, editar ou rejeitar qualquer sugestão.
* As Subtramas aprovadas deverão ser criadas automaticamente.

### Prioridade

Must Have

### Dependências

US-02.02 — Criar um Arco no Modo Guiado

---

# US-03.03 — Definir Dependências entre Subtramas

## História

Como jogador,

Quero definir dependências entre Subtramas,

Para criar uma ordem lógica de evolução.

### Critérios de Aceitação

* Permitir definir que uma Subtrama depende de outra.
* O Sistema deve exibir claramente essa relação.
* A IA poderá sugerir dependências, mas nunca criá-las automaticamente.
* O jogador poderá alterar ou remover dependências.

### Prioridade

Must Have

### Dependências

US-03.01

---

# US-03.04 — Definir Requisitos de Conclusão

## História

Como jogador,

Quero definir requisitos para concluir uma Subtrama,

Para representar melhor os objetivos que preciso alcançar.

### Critérios de Aceitação

* Permitir adicionar requisitos.
* Permitir remover requisitos.
* Permitir editar requisitos.
* Os requisitos poderão incluir missões, Bosses e outros marcos definidos pelo jogador.

### Prioridade

Must Have

### Dependências

US-03.01

---

# US-03.05 — Receber Sugestões da IA

## História

Como jogador,

Quero receber sugestões da IA,

Para melhorar a organização das minhas Subtramas.

### Critérios de Aceitação

* A IA poderá sugerir novos requisitos.
* A IA poderá sugerir dependências.
* A IA poderá sugerir reorganizações.
* Nenhuma alteração deverá ocorrer sem aprovação do jogador.

### Prioridade

Should Have

### Dependências

US-03.01

---

# US-03.06 — Editar uma Subtrama

## História

Como jogador,

Quero editar uma Subtrama,

Para adaptá-la conforme minha evolução.

### Critérios de Aceitação

* Alterar nome.
* Alterar descrição.
* Alterar requisitos.
* Alterar dependências.

### Prioridade

Must Have

### Dependências

US-03.01

---

# US-03.07 — Excluir uma Subtrama

## História

Como jogador,

Quero remover uma Subtrama,

Para reorganizar meu Arco.

### Critérios de Aceitação

* Solicitar confirmação antes da exclusão.
* Remover vínculos com Missões.
* Atualizar automaticamente o progresso do Arco.

### Prioridade

Should Have

### Dependências

US-03.01

---

# US-03.08 — Sugerir Bosses

## História

Como jogador,

Quero que a IA sugira Bosses para minhas Subtramas,

Para tornar minha jornada mais estratégica e imersiva.

### Critérios de Aceitação

* A IA deve analisar a complexidade da Subtrama.
* A IA poderá sugerir um Boss quando considerar adequado.
* O jogador poderá aceitar, editar ou rejeitar a sugestão.

### Prioridade

Should Have

### Dependências

EP-10 — Sistema de Bosses

---

# US-03.09 — Concluir uma Subtrama

## História

Como jogador,

Quero concluir uma Subtrama,

Para avançar no meu Arco Principal.

### Critérios de Aceitação

* Todos os requisitos obrigatórios devem estar concluídos.
* Caso exista um Boss obrigatório, ele deverá estar derrotado.
* O Sistema deve registrar a conclusão.
* O progresso do Arco deve ser atualizado.

### Prioridade

Must Have

### Dependências

US-03.04

---

# US-03.10 — Visualizar o Progresso das Subtramas

## História

Como jogador,

Quero visualizar o progresso das minhas Subtramas,

Para acompanhar minha evolução durante o Arco.

### Critérios de Aceitação

* Exibir percentual de progresso.
* Exibir requisitos concluídos.
* Exibir requisitos pendentes.
* Exibir dependências.
* Exibir Bosses associados, quando existirem.

### Prioridade

Must Have

### Dependências

US-03.01

---

# US-03.11 — Classificar uma Subtrama

## História

Como jogador,

Quero definir um tipo para minha Subtrama,

Para que o Sistema compreenda melhor o contexto da minha jornada e ofereça sugestões mais relevantes.

### Critérios de Aceitação

- O jogador poderá selecionar um tipo para a Subtrama.
- O sistema deverá disponibilizar categorias pré-definidas.
- O jogador poderá criar uma categoria personalizada.
- A IA utilizará essa classificação para fornecer sugestões mais inteligentes e contextualizadas.

### Categorias Sugeridas

- 📚 Aprendizado
- 💼 Carreira
- 💪 Saúde
- 💰 Financeiro
- ✝️ Espiritual
- ❤️ Relacionamentos
- 🎨 Criatividade
- 🧠 Desenvolvimento Pessoal
- 🏠 Casa
- 📂 Personalizado

### Prioridade

Should Have

### Dependências

US-03.01 — Criar uma Subtrama

### Observações

A classificação da Subtrama servirá como contexto para a Inteligência Artificial compreender melhor os objetivos do jogador e gerar recomendações mais precisas.

> **Nota para versões futuras:** cada categoria poderá estar associada a um ou mais atributos do personagem (como Disciplina, Inteligência, Fé ou Carisma), permitindo que a conclusão de Subtramas influencie diretamente a evolução desses atributos.

---

# Melhorias Futuras

Estas funcionalidades poderão ser implementadas em versões futuras.

* Templates de Subtramas.
* Compartilhamento de Subtramas.
* Subtramas reutilizáveis entre Arcos.
* Subtramas criadas pela comunidade.
* Sugestões baseadas em jogadores com objetivos semelhantes.
* Visualização em formato de árvore de progressão.