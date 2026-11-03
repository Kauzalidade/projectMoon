# 🌙 Fases da Lua — Visualização, Simulação e Quiz

Aplicação web interativa para o estudo da mecânica celeste e das fases da Lua, com design de interface inspirado na estética oficial da **SpaceX (Human Spaceflight & Mars Exploration)**. Projeto desenvolvido com o auxílio do **Google Antigravity** e do **Claude AI**.

- **Autor:** Jonas Kauã
- **Curso / Disciplina:** GTI — Linguagem de Programação
- **Professor:** Juan
- **Data:** 03/11/2026

## Sobre o projeto

A aplicação reúne três módulos integrados em uma única página interativa, com layout moderno, alta fidelidade astronômica e design minimalista em alto contraste:

1. **Fases:** visualização das oito fases principais do ciclo lunar.
2. **Simulação:** animação orbital contínua do ciclo sinódico de aproximadamente 29,5 dias.
3. **Quiz:** avaliação de conhecimentos de tripulação com feedback imediato e pontuação.

Desenvolvida exclusivamente com HTML5, CSS3 e JavaScript puro, sem dependências, bibliotecas ou frameworks externos.

## Como executar

**Opção 1: abrir direto no navegador**

1. Clone o repositório:
   ```bash
   git clone https://github.com/Kauzalidade/projectMoon.git
   cd projectMoon
   ```
2. Abra o arquivo `index.html` com duplo clique (ou arraste para qualquer navegador moderno).

**Opção 2: servidor local (opcional)**

```bash
python3 -m http.server 8000
```

Acesse `http://localhost:8000` no seu navegador. Não é necessária conexão com a internet para executar.

## Estrutura do repositório

```
.
├── index.html      # Estrutura semântica dos três módulos e seções
├── style.css       # Estilização no design system SpaceX, responsividade e animações
├── script.js       # Lógica dos três módulos, controles de tempo e renderizador SVG
├── README.md       # Documentação completa do projeto
└── Capturas/       # Capturas de tela dos critérios de aceite
```

## Funcionalidades

### Especificação 1 — Visualização das fases

| Requisito | Atendimento |
|---|---|
| RF01 | As oito fases estão disponíveis: Lua Nova, Crescente Inicial, Quarto Crescente, Gibosa Crescente, Lua Cheia, Gibosa Minguante, Quarto Minguante e Minguante Final. |
| RF02 | Cada fase tem uma representação gráfica vetorial dinâmica em SVG, gerada com relevo e iluminação proporcionais à posição da Lua no ciclo. |
| RF03 | A seleção é feita por botões ghost; o botão da fase ativa fica destacado em branco sólido com texto em alto contraste. |
| RF04 | Nome, métricas astronômicas e descrição detalhada da fase selecionada são exibidos ao lado da Lua. |

### Especificação 2 — Simulação do ciclo lunar

| Requisito | Atendimento |
|---|---|
| RF05 | Animação contínua (`requestAnimationFrame`) percorrendo o ciclo de aproximadamente 29,5 dias. |
| RF06 | Botões de comando **Iniciar**, **Pausar** e **Reiniciar**. |
| RF07 | Contador do dia do ciclo (de 0,0 a 29,5 dias), nome da fase atual, barra de progresso, radar orbital e checklist de fases. |
| RF08 | Controle deslizante de velocidade de 0,25x a 4,0x com cálculo em *delta time*, sem saltos ou travamentos. |

Ao completar o ciclo de 29,5 dias, a simulação continua em loop contínuo suave, permitindo observar transições cíclicas consecutivas. O botão Pausar preserva o momento exato do ciclo e Reiniciar retorna ao dia 0.

### Especificação 3 — Quiz

| Requisito | Atendimento |
|---|---|
| RF09 | 6 questões sobre as fases da Lua e mecânica celeste. |
| RF10 | 4 alternativas por questão (A, B, C, D), com apenas uma correta. |
| RF11 | Feedback imediato (correto em verde ou incorreto em vermelho com justificativa científica), destacando as alternativas. |
| RF12 | Pontuação final (acertos / total), percentual de aproveitamento e botão para reiniciar o quiz. |

As alternativas são bloqueadas imediatamente após a primeira resposta, impedindo seleções múltiplas.

## Critérios de aceite e evidências

As capturas de tela foram registradas na pasta `Capturas/`, demonstrando o atendimento de todos os requisitos funcionais:

| Critério de Aceite | Descrição da Evidência | Arquivo em `Capturas/` |
|---|---|---|
| **Fase 1** | Lua Nova (0% de iluminação, início do ciclo sinódico) | `Capturas/01-lua-nova.png` |
| **Fase 2** | Crescente Inicial (arco fino crescente iluminado) | `Capturas/02-crescente-Inicial.png` |
| **Fase 3** | Quarto Crescente (50% da face direita iluminada) | `Capturas/3-quarto-crescente.png` |
| **Fase 4** | Gibosa Crescente (75% da face iluminada) | `Capturas/4-gibosa-crescente.png` |
| **Fase 5** | Lua Cheia (100% de iluminação visível da Terra) | `Capturas/05-lua-cheia.png` |
| **Fase 6** | Gibosa Minguante (luz recuando pelo oeste) | `Capturas/06-gibosa-minguante.png` |
| **Fase 7** | Quarto Minguante (50% da face esquerda iluminada) | `Capturas/07-quarto-minguante.png` |
| **Fase 8** | Minguante Final (fino crescente antes do amanhecer) | `Capturas/08-minguante-final.png` |
| **Responsividade** | Interface responsiva adaptada ao modo celular | `Capturas/modo-celular.png` |
| **Simulação em Execução** | Movimento orbital contínuo e contador ativo | `Capturas/simulação-orbital.png` |
| **Simulação em Pausa** | Estado congelado com o contador indicando dia 12,2 | `Capturas/simulação-orbital-em-pausa.png` |
| **Simulação Reiniciada** | Retorno ao dia 0,0 com botão redefinido para Iniciar | `Capturas/simulação-orbital-reiniciada.png` |
| **Controle de Velocidade** | Ajuste dinâmico do fator de aceleração temporal | `Capturas/simulação-orbital-com-tempo-alterado.png` |
| **Quiz: Resposta Correta** | Feedback imediato positivo com justificativa científica | `Capturas/quiz-resposta-certa.png` |
| **Quiz: Resposta Incorreta** | Feedback imediato negativo com destaque do erro | `Capturas/quiz-resposta-errada.png` |
| **Quiz: Conclusão** | Tela final com total de acertos, aproveitamento e reinício | `Capturas/tela-final-do-quiz.png` |

## Como a Lua é desenhada

A fase é calculada pela fração do ciclo ao longo dos 29,5 dias. A base da Lua é formada por um disco escuro que simula o relevo e as crateras do lado não iluminado; a porção iluminada é construída através de um caminho vetorial SVG dinâmico (`<path>`) utilizando arcos trigonométricos e máscaras de recorte (`<mask id="...">`), acompanhados de gradientes radiais. Na fase crescente a luz se expande pela borda direita, atinge a totalidade na Lua Cheia e, na fase minguante, a luz se recolhe gradativamente pelo lado esquerdo.

## Uso de IA no desenvolvimento

### Ferramentas

- **Google Antigravity:** Utilizado como ambiente e agente assistente de pair programming para estruturação do projeto, refatoração em arquivos modulares (HTML, CSS e JS puros), geração vetorial das fases da Lua em SVG, aplicação do design system SpaceX e criação dos testes automatizados de aceite.
- **Claude AI:** Utilizado no processo de auxílio conceitual, formulação inicial das especificações, planejamento das regras de negócio e refinamento da lógica de programação.

### Principais prompts

1. **Prompt 1 (Criação Inicial):** Solicitação dos três módulos da aplicação em HTML, CSS e JavaScript puro (visualização interativa das 8 fases, simulação animada do ciclo de 29,5 dias e quiz de múltipla escolha com pontuação).
2. **Prompt 2 (Refatoração Modular):** Separação estrita em arquivos `index.html`, `style.css` e `script.js`, padronização formal dos nomes das 8 fases, inclusão de controle de velocidade sem saltos temporais e garantia de bloqueio de respostas múltiplas no quiz.
3. **Prompt 3 (Testes de Aceite Automatizados):** Validação sistemática de todos os critérios de aceite um por um através de bateria de testes automatizados com Node.js (41/41 aprovados).
4. **Prompt 4 (Documentação e Pasta de Evidências):** Preenchimento completo do `README.md` e criação da pasta `Capturas/`.
5. **Prompt 5 (Exploração de Design NASA):** Reestruturação da interface inspirada no design oficial do portal da NASA (`nasa.gov`).
6. **Prompt 6 (Redesign Definitivo SpaceX Mars):** Reformulação visual e estrutural completa com base no estilo oficial da **SpaceX (Human Spaceflight & Mars Exploration)**: canvas preto puro (`#000000`), tipografia geométrica em caixa alta com *tracking*, *ghost buttons* retangulares com cantos vivos (`border-radius: 0px`), grid de especificações técnicas (*Specs Grid*) e radar de telemetria.
7. **Prompt 7 (Evidências e Atualização Final):** Inclusão das 16 capturas de tela dos critérios de aceite na documentação com os nomes de arquivos atualizados e revisão geral do `README.md`.

### Dificuldades encontradas

- Representar geometricamente a transição das fases crescentes e gibosas com SVG (diferenciação de curvas convexas e côncavas).
- Manter a velocidade da animação precisa ao pausar e alterar o slider de velocidade sem provocar saltos temporais.
- Impedir que cliques repetidos nas opções do quiz alterassem a pontuação após a resposta.
- Garantir a separação estrita do projeto em três arquivos desacoplados mantendo a reatividade e a responsividade em telas menores.
- Harmonizar o design técnico austero e cinematográfico da SpaceX mantendo 100% da acessibilidade e da funcionalidade dos três módulos.

### Correções realizadas

| Problema | Causa | Correção |
|---|---|---|
| Manter a velocidade da animação contínua sem saltos | Mudar o slider ou pausar causaria descontinuidade caso fosse usado contador de passos fixos | Implementação de cálculo com *delta time* via `requestAnimationFrame`, multiplicando a velocidade instantânea a cada frame |
| Múltiplos cliques nas alternativas do quiz | Os botões continuavam ativos e escutando eventos de clique após a primeira seleção | Desativação imediata de todas as opções (`disabled = true`) e verificação pela flag `hasAnsweredCurrent` |
| Representação geométrica das fases gibosas e crescentes | Dificuldade em desenhar a curvatura convexa e côncava da sombra da Lua em SVG puro | Criação de gerador vetorial SVG com arcos, máscaras circulares e gradientes específicos para cada uma das 8 fases |
| Isolamento do teste de pausa nos critérios de aceite | A rotina de reset chamava a pausa, interferindo no analisador léxico de testes | Refinamento do analisador de testes para inspecionar o escopo isolado da função `pauseSimulation` |
| Inconsistência de caminhos das evidências | Nomes de arquivos das capturas de tela alterados durante os testes práticos | Atualização e correspondência exata de todos os 16 arquivos na tabela de evidências do `README.md` |

### Reflexão

A utilização de IA no desenvolvimento proporcionou agilidade substancial na prototipagem inicial e na criação dos caminhos vetoriais para desenhar a Lua. No entanto, a intervenção humana e o processo de refinamento iterativo foram fundamentais para exigir a separação limpa dos arquivos (`index.html`, `style.css` e `script.js`), garantir a precisão astronômica nos nomes das 8 fases, transitar com sucesso por diferentes linguagens visuais até alcançar o padrão estético de alta tecnologia da SpaceX e validar rigorosamente cada critério de aceite com testes automatizados e evidências visuais completas.

## Licença

Projeto acadêmico sob licença [MIT](https://opensource.org/licenses/MIT).
