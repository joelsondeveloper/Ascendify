# MVP (Minimum Viable Product)

## Objetivo

O MVP tem como objetivo validar a principal proposta de valor do sistema: permitir que um jogador evolua na vida real através de uma experiência gamificada, onde uma Inteligência Artificial atua como o Sistema, adaptando desafios, criando narrativas e auxiliando na conclusão de objetivos pessoais.

Ao final do MVP, o jogador deve ser capaz de iniciar, evoluir e concluir um arco completo utilizando todas as mecânicas essenciais do sistema.

---

# Escopo do MVP

## 1. Sistema de Usuários

O sistema deverá permitir:

* Cadastro da Conta.
* Login e autenticação.
* Criação do Perfil do Jogador no primeiro acesso.
* Gerenciamento do Perfil do Jogador.
* Armazenamento do progresso do Jogador.

---

## 2. Sistema de Arcos

Cada jogador poderá possuir apenas um Arco Principal ativo por vez.

O arco representa o grande objetivo que o jogador deseja conquistar.

Exemplos:

* Conseguir o primeiro emprego.
* Emagrecer 15kg.
* Passar em um concurso.
* Aprender um novo idioma.

Todo o restante do sistema será construído em função desse arco.

---

## 3. Sistema de Subtramas

Cada Arco poderá conter diversas Subtramas.

As subtramas representam áreas importantes necessárias para concluir o Arco Principal.

Exemplo:

Arco:
Conseguir o primeiro emprego como Desenvolvedor Front-end.

Subtramas:

* Aprender React.
* Construir Portfólio.
* Melhorar Inglês.
* Networking.
* Saúde.

Cada subtrama possui seu próprio progresso e conjunto de missões.

---

## 4. Sistema de Missões

O jogador poderá criar missões manualmente.

A IA poderá sugerir novas missões de acordo com:

* objetivo do arco;
* desempenho do jogador;
* histórico de conclusão;
* rotina disponível.

As missões serão classificadas em:

### Quanto à recorrência

* Recorrentes
* Não recorrentes

### Quanto à importância

* Principais
* Secundárias

As missões principais impactam diretamente a evolução do Arco Principal.

---

## 5. Sistema de Rotina Dinâmica

O jogador informará:

* horários livres;
* disponibilidade semanal;
* preferências.

Com essas informações, a IA será responsável por gerar automaticamente a rotina semanal.

Caso ocorram imprevistos, o jogador poderá informar ao sistema, que reorganizará automaticamente toda a agenda.

O planejamento deverá se adaptar continuamente à realidade do jogador.

---

## 6. Inteligência Artificial

A IA representa o Sistema.

Ela será responsável por:

* analisar o histórico do jogador;
* reorganizar a rotina;
* adaptar dificuldades;
* sugerir novas missões;
* criar narrativas;
* auxiliar na criação e evolução dos arcos;
* oferecer recomendações personalizadas.

Seu comportamento deverá evoluir conforme o progresso do jogador.

---

## 7. Sistema de Progressão

Ao concluir missões, o jogador poderá receber:

* Experiência (XP);
* Ouro;
* Recompensas;
* Avanços na narrativa.

O sistema registrará toda a evolução do jogador.

---

## 8. Loja

A loja permitirá adquirir:

* Boosts;
* Consumíveis;
* Recompensas reais.

A IA atuará como um conselho responsável por avaliar se determinada recompensa está alinhada com os objetivos do jogador.

Ela poderá:

* aprovar;
* negar;
* sugerir alternativas.

---

## 9. Inventário

O inventário permitirá:

* armazenar itens;
* consumir itens;
* equipar itens.

Os itens poderão modificar temporariamente algumas mecânicas do sistema.

---

## 10. Sistema de HP e Penalidades

O jogador possuirá uma barra de HP.

Ao falhar repetidamente em missões ou ignorar compromissos importantes, poderá sofrer penalidades como:

* perda de HP;
* perda de ouro;
* perda de sequência;
* bloqueio temporário de recompensas;
* aumento da dificuldade de determinadas missões;
* outras consequências definidas pelo Sistema.

As penalidades também poderão afetar recompensas da vida real cadastradas pelo próprio jogador.

---

## 11. Sistema de Bosses

Cada Subtrama poderá possuir um Boss.

Os Bosses representam obstáculos reais que impedem o avanço do jogador.

Cada Boss possuirá mecânicas próprias e exigirá estratégias específicas para ser derrotado.

Exemplos:

* Procrastinação.
* Falta de disciplina.
* Processo seletivo.
* Sedentarismo.
* Organização financeira.

Cada Boss poderá possuir:

* condições para aparecer;
* pontos fracos;
* formas específicas de derrota;
* recompensas exclusivas.

---

## 12. Boss Final

Cada Arco Principal possuirá um Boss Final.

O Boss Final representa o maior desafio necessário para concluir o objetivo principal.

Sua derrota encerra oficialmente o Arco.

---

## 13. Conclusão de um Arco

Um Arco será considerado concluído quando:

* todas as Subtramas obrigatórias forem concluídas;
* o Boss Final for derrotado.

Ao concluir um Arco, o Sistema deverá:

* registrar a conquista;
* finalizar a narrativa;
* gerar um relatório da jornada;
* permitir o início de um novo Arco.

Caso o HP do jogador chegue a zero antes da conclusão, o Arco será considerado fracassado e poderá ser reiniciado.

---

# Critérios de Sucesso do MVP

O MVP será considerado validado quando um jogador conseguir:

* criar uma conta;
* criar um Arco Principal;
* criar Subtramas;
* criar missões;
* receber uma rotina gerada pela IA;
* concluir missões;
* ganhar XP e Ouro;
* utilizar a Loja;
* utilizar o Inventário;
* enfrentar Bosses;
* concluir ou falhar um Arco.

---

# Fora do Escopo do MVP

As funcionalidades abaixo não fazem parte da primeira versão:

* Sistema de atributos (Força, Inteligência, etc.);
* Guildas;
* Marketplace entre jogadores;
* Ranking global;
* Eventos mundiais;
* PvP;
* Criação pública de Arcos pela comunidade;
* Sistema de moderação;
* Economia avançada entre jogadores;
* Sistema completo de múltiplas IAs especializadas.
