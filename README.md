# 🌙 Fases da Lua — Visualização, Simulação e Quiz

Aplicação web interativa para estudar as fases da Lua, desenvolvida com o auxílio do **Google Antigravity** e do **Claude AI**.

- **Autor:** Jonas Kauã
- **Curso / Disciplina:** GTI — Linguagem de Programação
- **Professor:** Juan
- **Data:** 02/11/2026

## Sobre o projeto

A aplicação reúne três módulos em uma única página:

1. **Fases:** visualização das oito fases principais do ciclo lunar.
2. **Simulação:** animação do ciclo lunar de aproximadamente 29,5 dias.
3. **Quiz:** avaliação de conhecimentos com feedback e pontuação.

Usa apenas HTML, CSS e JavaScript puro, sem dependências, frameworks ou instalação.

## Como executar

**Opção 1: abrir direto no navegador**

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kauzalidade/projectMoon.git
   cd projectMoon
   ```
2. Abra o arquivo `index.html` com duplo clique (ou arraste para o navegador).

**Opção 2: servidor local (opcional)**

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000`.

Requisitos: um navegador moderno (Chrome, Edge, Firefox ou Safari). Não é necessária conexão com a internet.

## Estrutura do repositório

```
.
├── index.html      # Estrutura semântica dos três módulos
├── style.css       # Estilização, tema espacial escuro e responsividade
├── script.js       # Lógica dos três módulos, animações e renderização vetorial SVG
├── README.md       # Documentação do projeto
└── Capturas/       # Capturas de tela dos critérios de aceite
```

## Funcionalidades

### Especificação 1 — Visualização das fases

| Requisito | Atendimento |
|---|---|
| RF01 | As oito fases estão disponíveis: Lua Nova, Crescente Inicial, Quarto Crescente, Gibosa Crescente, Lua Cheia, Gibosa Minguante, Quarto Minguante e Minguante Final. |
| RF02 | Cada fase tem uma representação gráfica em SVG, gerada com iluminação e relevo proporcionais à posição da Lua no ciclo. |
| RF03 | A seleção é feita por botões; o botão da fase ativa fica destacado com miniatura correspondente. |
| RF04 | Nome, métricas e descrição da fase selecionada são exibidos ao lado da Lua. |

### Especificação 2 — Simulação do ciclo lunar

| Requisito | Atendimento |
|---|---|
| RF05 | Animação contínua (`requestAnimationFrame`) percorrendo o ciclo de aproximadamente 29,5 dias. |
| RF06 | Botões **Iniciar**, **Pausar** e **Reiniciar**. |
| RF07 | Contador do dia do ciclo (de 0,0 a 29,5 dias), nome da fase atual, barra de progresso e órbita animada. |
| RF08 | Controle deslizante de velocidade de 0,25x a 4,0x com cálculo em *delta time*, sem saltos ou travamentos. |

Ao completar o ciclo de 29,5 dias, a simulação continua em loop contínuo suave, permitindo observar transições cíclicas consecutivas. O botão Pausar preserva o momento exato do ciclo e Reiniciar retorna ao dia 0.

### Especificação 3 — Quiz

| Requisito | Atendimento |
|---|---|
| RF09 | 6 questões sobre as fases da Lua e astronomia. |
| RF10 | 4 alternativas por questão (A, B, C, D), com apenas uma correta. |
| RF11 | Feedback imediato (correto ou incorreto com justificativa científica), destacando a alternativa certa e a errada. |
| RF12 | Pontuação final (acertos / total), percentual de aproveitamento e botão para reiniciar o quiz. |

As alternativas são bloqueadas imediatamente após a primeira resposta, impedindo múltiplas seleções.

## Critérios de aceite e evidências

As capturas de tela ficam armazenadas na pasta `Capturas/`.

| Critério | Evidência |
|---|---|
| As oito fases estão na interface | `Capturas/01-fases.png` |
| A imagem muda ao selecionar outra fase | `Capturas/02-troca-fase.png` |
| Nome e descrição correspondem à fase | `Capturas/02-troca-fase.png` |
| Interface responsiva | `Capturas/03-mobile.png` |
| Simulação em andamento com contador de dias | `Capturas/04-simulacao.png` |
| Pausa, reinício e alteração de velocidade | `Capturas/05-controles.png` |
| Quiz: feedback após responder | `Capturas/06-quiz-feedback.png` |
| Quiz: pontuação final e reinício | `Capturas/07-quiz-resultado.png` |

## Como a Lua é desenhada

A fase é calculada pela fração do ciclo ao longo dos 29,5 dias. A base da Lua é formada por um disco escuro que simula o relevo e as crateras do lado não iluminado; a porção iluminada é construída através de um caminho vetorial SVG dinâmico (`<path>`) utilizando arcos trigonométricos e máscaras de recorte (`<mask>`), acompanhados de gradientes radiais dourados. Na fase crescente a luz se expande pela borda direita, atinge a plenitude na Lua Cheia e, na fase minguante, a luz se recolhe gradativamente pelo lado esquerdo.

## Uso de IA no desenvolvimento

### Ferramentas

- **Google Antigravity:** Utilizado como ambiente e agente assistente de pair programming para estruturação do projeto, refatoração em arquivos modulares (HTML, CSS e JS puros), geração vetorial das fases da Lua em SVG e criação dos testes automatizados de aceite.
- **Claude AI:** Utilizado no processo de auxílio conceitual, formulação inicial das especificações e refinamento da lógica de programação.

### Principais prompts

1. **Prompt inicial:** Solicitação dos três módulos da aplicação em HTML, CSS e JavaScript puro (visualização interativa das 8 fases, simulação animada do ciclo de 29,5 dias e quiz de múltipla escolha com pontuação).
2. **Refinamento 1:** Separação estrita em arquivos `index.html`, `style.css` e `script.js`, padronização formal dos nomes das 8 fases, inclusão de controle de velocidade sem saltos temporais e garantia de bloqueio de respostas múltiplas no quiz.
3. **Prompt de teste e validação:** Validação sistemática de todos os critérios de aceite um por um através de testes automatizados com Node.js.

### Dificuldades encontradas

- Representar geometricamente a transição das fases crescentes e gibosas com SVG (diferenciação de curvas convexas e côncavas).
- Manter a velocidade da animação precisa ao pausar e alterar o slider de velocidade sem provocar saltos temporais.
- Impedir que cliques repetidos nas opções do quiz alterassem a pontuação após a resposta.
- Garantir a separação estrita do projeto em três arquivos desacoplados mantendo a reatividade e a responsividade em telas menores.

### Correções realizadas

| Problema | Causa | Correção |
|---|---|---|
| Manter a velocidade da animação contínua sem saltos | Mudar o slider ou pausar causaria descontinuidade caso fosse usado contador de passos fixos | Implementação de cálculo com *delta time* via `requestAnimationFrame`, multiplicando a velocidade instantânea a cada frame |
| Múltiplos cliques nas alternativas do quiz | Os botões continuavam ativos e escutando eventos de clique após a primeira seleção | Desativação imediata de todas as opções (`disabled = true`) e verificação pela flag `hasAnsweredCurrent` |
| Representação geométrica das fases gibosas e crescentes | Dificuldade em desenhar a curvatura convexa e côncava da sombra da Lua em SVG puro | Criação de gerador vetorial SVG com arcos, máscaras circulares e gradientes específicos para cada uma das 8 fases |
| Isolamento do teste de pausa nos critérios de aceite | A rotina de reset chamava a pausa, interferindo no analisador léxico de testes | Refinamento do analisador de testes para inspecionar o escopo isolado da função `pauseSimulation` |

### Reflexão

A utilização de IA no desenvolvimento proporcionou agilidade substancial na prototipagem inicial e na criação dos caminhos vetoriais para desenhar a Lua. No entanto, a intervenção humana e o processo de refinamento iterativo foram fundamentais para exigir a separação limpa dos arquivos (`index.html`, `style.css` e `script.js`), garantir a precisão astronômica nos nomes das 8 fases, evitar bugs de concorrência de cliques no quiz e validar rigorosamente cada critério de aceite com testes automatizados.

## Licença

Projeto acadêmico sob licença [MIT](https://opensource.org/licenses/MIT).
