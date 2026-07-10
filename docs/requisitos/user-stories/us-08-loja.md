# EP-08 — Loja

**Épico:** EP-08 — Loja

## Objetivo

Permitir que o jogador utilize suas moedas para adquirir Boosts, Consumíveis e Recompensas Reais, negociando diretamente com o Mercador (personagem de IA), em um sistema com preços dinâmicos, itens raros e histórico completo de transações.

## Observações Gerais

* A moeda oficial do MVP é o **Ouro**. A existência de uma moeda premium adicional ainda não foi decidida e não faz parte deste documento.
* Toda compra confirmada gera automaticamente um item no Inventário do jogador (EP-09).
* A negociação de preços é conduzida pelo personagem **Mercador**, definido na US-06.09 (Utilizar Personagens Virtuais).
* A aprovação de Recompensas Reais continua sendo regida pela **US-04.15 — Validar Recompensas Reais**. O EP-08 trata da compra em si, não da validação de alinhamento com o Arco.

---

# US-08.01 — Visualizar a Loja

## História

Como jogador,

Quero navegar pela Loja,

Para conhecer os itens disponíveis para compra.

### Critérios de Aceitação

* Exibir itens organizados por categoria: Boosts, Consumíveis e Recompensas Reais.
* Exibir nome, descrição, preço atual e imagem/ícone de cada item.
* Exibir apenas Recompensas Reais previamente aprovadas pela IA (US-04.15).
* Permitir filtrar itens por categoria.

### Prioridade

Must Have

### Dependências

US-01.04 — Criar Perfil do Jogador

---

# US-08.02 — Negociar com o Mercador

## História

Como jogador,

Quero conversar com o Mercador antes de finalizar uma compra,

Para tentar obter um preço melhor.

### Critérios de Aceitação

* O jogador poderá iniciar uma negociação em linguagem natural com o Mercador.
* O Mercador poderá aceitar, recusar ou contrapropor um valor.
* A negociação deverá respeitar um valor mínimo definido pelo Sistema para cada item.
* O resultado da negociação deverá gerar um preço válido apenas para aquela compra.
* O jogador poderá encerrar a negociação sem comprar.

### Prioridade

Must Have

### Dependências

US-06.09 — Utilizar Personagens Virtuais

---

# US-08.03 — Comprar Boost

## História

Como jogador,

Quero comprar um Boost,

Para obter uma vantagem temporária na minha jornada.

### Critérios de Aceitação

* Exibir a duração e o efeito do Boost antes da compra.
* Debitar o valor em Ouro do saldo do jogador.
* Adicionar o Boost ao Inventário após a confirmação.
* Impedir a compra caso o jogador não possua saldo suficiente.

### Prioridade

Must Have

### Dependências

EP-07 — Sistema de Progressão

EP-09 — Inventário

---

# US-08.04 — Comprar Consumível

## História

Como jogador,

Quero comprar um Consumível,

Para utilizá-lo quando precisar durante minha jornada.

### Critérios de Aceitação

* Exibir o efeito do Consumível antes da compra (ex: recuperação de HP).
* Debitar o valor em Ouro do saldo do jogador.
* Adicionar o Consumível ao Inventário após a confirmação.
* Impedir a compra caso o jogador não possua saldo suficiente.

### Prioridade

Must Have

### Dependências

EP-07 — Sistema de Progressão

EP-09 — Inventário

---

# US-08.05 — Cadastrar Recompensa Real na Loja

## História

Como jogador,

Quero cadastrar uma Recompensa Real,

Para utilizá-la como incentivo dentro da minha jornada.

### Critérios de Aceitação

* Permitir informar nome, descrição e valor em Ouro sugerido.
* Enviar a recompensa para avaliação da IA, conforme US-04.15.
* Exibir o status da recompensa (em avaliação, aprovada ou rejeitada).
* Apenas recompensas aprovadas ficam visíveis na Loja.

### Prioridade

Must Have

### Dependências

US-04.15 — Validar Recompensas Reais

---

# US-08.06 — Comprar Recompensa Real

## História

Como jogador,

Quero comprar uma Recompensa Real aprovada,

Para desfrutar de um incentivo da vida real por minha evolução.

### Critérios de Aceitação

* Permitir a compra apenas de Recompensas Reais previamente aprovadas.
* Debitar o valor em Ouro negociado do saldo do jogador.
* Registrar a compra no histórico como uma Recompensa Real resgatada.
* Notificar o jogador com uma mensagem de reconhecimento pela conquista.

### Prioridade

Must Have

### Dependências

US-08.05

---

# US-08.07 — Ajustar Preço por Demanda

## História

Como jogador,

Quero que o preço de uma Recompensa Real aumente conforme eu a compro com frequência,

Para que o Sistema me incentive a diversificar minhas conquistas em vez de repetir sempre a mesma recompensa.

### Critérios de Aceitação

* O Sistema deverá aumentar gradualmente o preço de uma Recompensa Real a cada nova compra dentro de um período recente.
* O aumento de preço deverá ser proporcional à frequência de compra daquele item específico.
* O preço deverá reduzir gradualmente com o tempo caso o jogador pare de comprá-lo.
* O Mercador deverá comunicar ao jogador quando um item estiver com preço elevado por alta demanda.
* Essa regra se aplica apenas a Recompensas Reais, não a Boosts ou Consumíveis.

### Prioridade

Should Have

### Dependências

US-08.06

---

# US-08.08 — Itens Raros e de Edição Limitada

## História

Como jogador,

Quero encontrar itens raros na Loja,

Para tornar minha jornada mais especial e motivadora.

### Critérios de Aceitação

* O Sistema poderá classificar itens como raros ou de edição limitada.
* Itens raros poderão possuir estoque limitado ou tempo de disponibilidade reduzido.
* O Mercador poderá anunciar a chegada de um item raro ao jogador.
* Uma vez esgotado ou expirado, o item raro deixa de estar disponível para compra.

### Prioridade

Could Have

### Dependências

US-08.01

---

# US-08.09 — Cancelar uma Compra

## História

Como jogador,

Quero cancelar uma compra realizada por engano,

Para corrigir minhas decisões dentro da Loja.

### Critérios de Aceitação

* Permitir cancelamento apenas de itens ainda não consumidos ou equipados.
* Permitir cancelamento dentro de um prazo curto após a compra.
* Estornar o valor efetivamente pago (considerando eventual negociação com o Mercador).
* Remover o item do Inventário ao confirmar o cancelamento.
* Registrar o cancelamento no histórico de compras.

### Prioridade

Should Have

### Dependências

US-08.03, US-08.04, US-08.06

---

# US-08.10 — Visualizar Histórico de Compras

## História

Como jogador,

Quero visualizar meu histórico de compras,

Para acompanhar como tenho utilizado meu Ouro.

### Critérios de Aceitação

* Exibir data, item, categoria e valor pago de cada compra.
* Exibir compras canceladas separadamente das compras válidas.
* Permitir filtrar o histórico por categoria.

### Prioridade

Should Have

### Dependências

US-08.03, US-08.04, US-08.06

---

# US-08.11 — Receber Sugestões do Mercador

## História

Como jogador,

Quero receber sugestões de itens e recompensas do Mercador,

Para descobrir opções alinhadas com meus objetivos.

### Critérios de Aceitação

* O Mercador poderá sugerir Boosts e Consumíveis com base no desempenho recente do jogador.
* O Mercador poderá sugerir Recompensas Reais alinhadas ao Arco ativo.
* As sugestões deverão ser apresentadas de forma natural, dentro do estilo do personagem.
* O jogador poderá aceitar, ignorar ou pedir mais opções.

### Prioridade

Should Have

### Dependências

US-06.06 — Sugerir Melhorias

US-08.01

---

# US-08.12 — Verificar Saldo Insuficiente

## História

Como jogador,

Quero ser avisado quando não possuo Ouro suficiente,

Para entender por que não posso concluir uma compra.

### Critérios de Aceitação

* Exibir mensagem clara informando saldo insuficiente.
* Informar o valor que ainda falta para a compra.
* O Mercador poderá sugerir formas de obter mais Ouro (ex: missões disponíveis).

### Prioridade

Must Have

### Dependências

US-08.03, US-08.04, US-08.06

---

# Melhorias Futuras

Estas funcionalidades não fazem parte do MVP, mas poderão ser adicionadas em versões futuras.

* Moeda premium adicional (ex: gemas), com definição de uso ainda em aberto.
* Eventos sazonais com itens exclusivos.
* Cupons e descontos promocionais.
* Loja rotativa (itens diferentes a cada dia/semana).
* Avaliação e feedback de itens comprados pelo jogador.
* Presentear itens para outros jogadores (dependente de funcionalidades sociais futuras).
* Assinatura ou pacote de vantagens recorrentes.
* Personalização visual do Mercador conforme progressão do jogador.