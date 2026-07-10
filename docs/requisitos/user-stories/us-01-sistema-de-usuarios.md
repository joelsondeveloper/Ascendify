# EP-01 — Sistema de Usuários

**Épico:** EP-01 — Sistema de Usuários

## Objetivo

Permitir que o jogador crie uma conta, autentique-se no sistema e configure seu perfil inicial para iniciar sua jornada.

---

# US-01.01 — Criar Conta

## História

Como visitante,

Quero criar uma conta utilizando meu e-mail e uma senha,

Para acessar o sistema e salvar meu progresso.

### Critérios de Aceitação

* O usuário deve informar um e-mail válido.
* O usuário deve criar uma senha.
* O sistema deve validar campos obrigatórios.
* O sistema não deve permitir e-mails duplicados.
* Após o cadastro, a conta deve ser criada com sucesso.

### Prioridade

Must Have

### Dependências

Nenhuma.

---

# US-01.02 — Fazer Login

## História

Como jogador,

Quero acessar minha conta,

Para continuar minha jornada.

### Critérios de Aceitação

* Permitir login utilizando e-mail e senha.
* Validar credenciais.
* Informar erro quando os dados forem inválidos.
* Redirecionar o jogador para o sistema após autenticação.

### Prioridade

Must Have

### Dependências

US-01.01

---

# US-01.03 — Recuperar Senha

## História

Como jogador,

Quero redefinir minha senha,

Para recuperar o acesso à minha conta caso eu a esqueça.

### Critérios de Aceitação

* Permitir solicitar recuperação utilizando o e-mail cadastrado.
* Enviar instruções para redefinição da senha.
* Permitir cadastrar uma nova senha.

### Prioridade

Must Have

### Dependências

US-01.01

---

# US-01.04 — Criar Perfil do Jogador

## História

Como jogador,

Quero configurar meu perfil no primeiro acesso,

Para iniciar minha jornada dentro do Sistema.

### Critérios de Aceitação

* O sistema deve exibir a tela de criação de perfil após o primeiro login.
* O jogador deve escolher um nome de usuário.
* O sistema deve atribuir um avatar padrão.
* O perfil deve ser salvo automaticamente.

### Prioridade

Must Have

### Dependências

US-01.02

---

# US-01.05 — Editar Perfil

## História

Como jogador,

Quero alterar as informações do meu perfil,

Para manter meus dados atualizados.

### Critérios de Aceitação

* Permitir alterar o nome de usuário.
* Permitir visualizar o avatar atual.
* Salvar automaticamente as alterações.

### Prioridade

Should Have

### Dependências

US-01.04

---

# US-01.06 — Manter Sessão Ativa

## História

Como jogador,

Quero permanecer autenticado entre acessos,

Para não precisar realizar login sempre que abrir o sistema.

### Critérios de Aceitação

* O sistema deve manter a sessão ativa de forma segura.
* O jogador deve permanecer autenticado até realizar logout ou a sessão expirar.
* O sistema deve solicitar novo login caso a sessão seja encerrada.

### Prioridade

Must Have

### Dependências

US-01.02

---

# US-01.07 — Encerrar Sessão

## História

Como jogador,

Quero sair da minha conta,

Para proteger meus dados quando utilizar dispositivos compartilhados.

### Critérios de Aceitação

* Permitir logout a qualquer momento.
* Encerrar a sessão do usuário.
* Redirecionar para a tela inicial ou de login.

### Prioridade

Must Have

### Dependências

US-01.02

---

# Melhorias Futuras

Estas funcionalidades não fazem parte do MVP, mas poderão ser adicionadas em versões futuras.

* Login com Google.
* Login com GitHub.
* Login com Apple.
* Autenticação em dois fatores (2FA).
* Upload de avatar personalizado.
* Alteração de e-mail.
* Exclusão da conta.
* Vinculação de múltiplos provedores de login.
