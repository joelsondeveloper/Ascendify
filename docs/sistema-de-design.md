# Sistema de Design — Ascendify

> Última atualização: 24/07/2026

## 1. Direção Visual

O Ascendify remete à estética de **janela de sistema** de RPGs como Solo
Leveling: painéis escuros com bordas sutis e um leve glow, tipografia com
cara de HUD, e uma sensação de "status window" abrindo na tela. Não é um
dashboard SaaS genérico — a interface deve parecer parte do "jogo".

**Referência de humor:** confirmação de ação = "System" reconhecendo o
input do jogador. Level up = momento de destaque visual (accent dourado).
Erro = alerta do sistema, direto e sem rodeios.

---

## 2. Paleta de Cores

| Token | Papel | Hex | Uso |
|---|---|---|---|
| `--color-bg` | Fundo da aplicação | `#0B0E14` | Body, fundo geral |
| `--color-panel` | Fundo de cards/painéis | `#131720` | Cards, modais, inputs |
| `--color-border` | Bordas | `#2A3142` | Bordas de painéis, divisores |
| `--color-accent` | Accent primário (System) | `#5B8DEF` | Links, botões primários, foco, glow |
| `--color-accent-xp` | Accent de XP/Level-up | `#F5B942` | Barra de XP, badges de nível, celebrações |
| `--color-text` | Texto principal | `#E4E7EC` | Títulos, corpo de texto |
| `--color-text-muted` | Texto secundário | `#8B93A7` | Legendas, placeholders, labels |
| `--color-danger` | Erro/perigo | `#E5484D` | Mensagens de erro, ações destrutivas |
| `--color-success` | Sucesso | `#4ADE80` | Confirmações, quest completada |

### Configuração no Tailwind v4

No Tailwind v4, tokens de cor customizados são definidos direto no CSS via
`@theme`, dentro de `apps/web/src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-bg: #0b0e14;
  --color-panel: #131720;
  --color-border: #2a3142;
  --color-accent: #5b8def;
  --color-accent-xp: #f5b942;
  --color-text: #e4e7ec;
  --color-text-muted: #8b93a7;
  --color-danger: #e5484d;
  --color-success: #4ade80;

  --font-display: "Rajdhani", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

Isso gera automaticamente classes utilitárias como `bg-bg`, `text-accent`,
`border-border`, `font-display`, etc.

---

## 3. Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display | **Rajdhani** | Títulos, headers, labels de HUD (`[ SYSTEM ]`) |
| Corpo | **Inter** | Parágrafos, textos de formulário, descrições |
| Dados/Mono | **JetBrains Mono** | Números (XP, nível), timers, valores numéricos |

**Importação (Google Fonts) —** adicionar no `apps/web/index.html`, dentro
do `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Escala tipográfica

| Classe Tailwind | Tamanho | Uso |
|---|---|---|
| `text-3xl font-display font-semibold` | 30px | Título principal de tela |
| `text-xl font-display font-semibold` | 20px | Título de card/seção |
| `text-sm font-display uppercase tracking-widest` | 14px | Eyebrow (`[ SYSTEM ]`) |
| `text-base font-body` | 16px | Corpo de texto padrão |
| `text-sm font-body text-text-muted` | 14px | Legendas, helper text |
| `font-mono` | — | Qualquer valor numérico de gameplay |

---

## 4. Elemento-Assinatura: Janela de Sistema

Componente base reutilizável para cards de autenticação, modais e painéis
de destaque — simula uma janela de sistema abrindo.

**Características:**
- Fundo `--color-panel`, borda `1px solid --color-border`
- Glow sutil: `box-shadow: 0 0 24px rgba(91, 141, 239, 0.15)`
- Cantos com brackets decorativos (`⌐` no topo-esquerdo, `¬` invertido no
  topo-direito) — feito com pseudo-elementos ou SVG, não texto real
- Eyebrow acima do título: `[ SYSTEM ]`, `[ AUTH ]`, `[ QUEST ]` — muda
  conforme o contexto
- Animação de entrada: fade + leve scale (0.97 → 1), ~200ms, para simular
  "abertura" da janela — sem exagerar, é um detalhe único, não uma festa de
  efeitos

```
┌─ [ AUTH ] ──────────────┐
│                          │
│   Entrar no Sistema      │
│                          │
│   [ email input ]        │
│   [ senha input ]        │
│                          │
│   [ Entrar → ]           │
│                          │
└──────────────────────────┘
```

---

## 5. Padrões de Componente

### Botão primário
- Fundo `--color-accent`, texto `--color-bg` (contraste alto)
- `font-display font-semibold uppercase tracking-wide`
- Hover: leve brilho (`brightness-110`) + glow suave
- Estados: default, hover, disabled (opacity reduzida), loading (spinner)

### Input
- Fundo `--color-bg` (mais escuro que o painel, efeito "afundado")
- Borda `--color-border`, foco → borda `--color-accent` + glow sutil
- Label acima do input, `text-sm text-text-muted font-body`

### Mensagens de erro
- Cor `--color-danger`, ícone de alerta, tom direto ("System": e-mail ou
  senha inválidos — sem "Ops! Algo deu errado 😅")

### Barra de XP (uso futuro)
- Trilho: `--color-border`
- Preenchimento: gradiente `--color-accent` → `--color-accent-xp`
- Número de XP sempre em `font-mono`

---

## 6. Motion

- Transições padrão: `150–200ms ease-out`
- Abertura de painel: fade + scale sutil (ver seção 4)
- Barra de XP enchendo: transição suave do `width`, nunca instantânea
- Level up: pulso único no accent dourado (`--color-accent-xp`), sem loop
  infinito — motion deliberado, não decoração constante
- Respeitar `prefers-reduced-motion`: desativar scale/fade em favor de
  aparecer direto, quando o usuário tiver essa preferência do sistema

---

## 7. Acessibilidade (piso de qualidade)

- Contraste mínimo AA entre texto e fundo (já validado nas cores acima)
- Foco visível em todo elemento interativo (outline usando `--color-accent`)
- Responsivo até mobile (formulários de auth devem funcionar bem em telas
  pequenas — painel ocupa a largura quase total, sem cortar conteúdo)

---

## 8. Próximos Passos (prática)

1. Adicionar as fontes no `index.html`
2. Configurar `@theme` no `index.css`
3. Criar componente `SystemPanel` (a "janela de sistema" reutilizável)
4. Criar componentes de `Button` e `Input` seguindo os padrões acima
5. Construir as telas de Cadastro e Login usando esses componentes