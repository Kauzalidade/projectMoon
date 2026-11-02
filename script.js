/**
 * ===================================================================
 * FASES DA LUA - JAVASCRIPT PURO
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ===================================================================
     1. DADOS DAS OITO FASES DA LUA
     =================================================================== */
  const LUNAR_PHASES = [
    {
      id: 0,
      name: 'Lua Nova',
      approxDay: '0 a 3,6',
      nominalDay: 0,
      lightPct: '0%',
      visibility: 'Invisível no céu noturno',
      description: 'A Lua está situada exatamente na mesma direção geral do Sol em relação à Terra. A face voltada para o nosso planeta não recebe iluminação solar direta, ficando completamente imersa na escuridão. Marca o início do ciclo lunar (mês sinódico).',
      type: 'new'
    },
    {
      id: 1,
      name: 'Crescente Inicial',
      approxDay: '3,7 a 7,3',
      nominalDay: 3.7,
      lightPct: '1% a 49%',
      visibility: 'Visível ao entardecer (horizonte oeste)',
      description: 'Conforme a Lua se afasta da linha Sol-Terra em sua órbita anti-horária, uma pequena fração da face visível começa a ser iluminada. Observa-se um delicado filete luminoso em forma de arco ou foice curvado para a direita (no hemisfério sul, a orientação aparente inverte em relação ao norte).',
      type: 'waxing_crescent'
    },
    {
      id: 2,
      name: 'Quarto Crescente',
      approxDay: '7,4 a 11,0',
      nominalDay: 7.4,
      lightPct: '50%',
      visibility: 'Visível da tarde até a meia-noite',
      description: 'A Lua atinge uma posição angular de 90° em relação ao Sol e à Terra (quadratura). Exatamente metade de sua face visível está iluminada pelo Sol, enquanto a outra metade permanece na sombra. Nasce por volta do meio-dia e se põe por volta da meia-noite.',
      type: 'first_quarter'
    },
    {
      id: 3,
      name: 'Gibosa Crescente',
      approxDay: '11,1 a 14,7',
      nominalDay: 11.1,
      lightPct: '51% a 99%',
      visibility: 'Visível pela maior parte da noite',
      description: 'A porção iluminada supera 50% e cresce a cada noite, assumindo um formato convexo e abaulado (o termo "gibosa" origina-se do latim "gibbus", significando corcunda ou protuberância). O disco lunar brilha com intensidade crescente no céu noturno.',
      type: 'waxing_gibbous'
    },
    {
      id: 4,
      name: 'Lua Cheia',
      approxDay: '14,8 a 18,4',
      nominalDay: 14.8,
      lightPct: '100%',
      visibility: 'Visível durante toda a noite',
      description: 'A Terra encontra-se entre o Sol e a Lua (oposição). Toda a face voltada para nosso planeta está banhada por luz solar direta, proporcionando o ápice do brilho lunar. A Lua Cheia nasce no leste no exato momento do pôr do Sol e se põe ao amanhecer.',
      type: 'full'
    },
    {
      id: 5,
      name: 'Gibosa Minguante',
      approxDay: '18,5 a 22,0',
      nominalDay: 18.5,
      lightPct: '99% a 51%',
      visibility: 'Visível da noite até o início da manhã',
      description: 'Após a Lua Cheia, a porção iluminada visível começa a retrair progressivamente. Mais da metade ainda está brilhante, mas a sombra avança pela borda leste. Ela nasce mais tarde a cada noite e permanece visível no céu durante a madrugada e primeiras horas do dia.',
      type: 'waning_gibbous'
    },
    {
      id: 6,
      name: 'Quarto Minguante',
      approxDay: '22,1 a 25,7',
      nominalDay: 22.1,
      lightPct: '50%',
      visibility: 'Visível da meia-noite ao meio-dia',
      description: 'A Lua atinge nova quadratura (90° em relação ao Sol), mas agora caminhando para completar a órbita. Exatamente metade da face visível está iluminada, oposta ao Quarto Crescente. Ela desponta no horizonte por volta da meia-noite e atinge o ápice ao raiar do dia.',
      type: 'third_quarter'
    },
    {
      id: 7,
      name: 'Minguante Final',
      approxDay: '25,8 a 29,5',
      nominalDay: 25.8,
      lightPct: '49% a 1%',
      visibility: 'Visível pouco antes da alvorada (horizonte leste)',
      description: 'Reta final do ciclo lunar. Apenas uma sutil faixa curva de luz permanece visível pouco antes do amanhecer. Dia após dia a Lua aproxima-se angularmente do Sol, até desaparecer por completo no brilho solar, reiniciando o ciclo na Lua Nova.',
      type: 'waning_crescent'
    }
  ];

  /* ===================================================================
     2. GERADOR GRÁFICO DE LUA VETORIAL (SVG DINÂMICO)
     =================================================================== */
  function createMoonSVG(type, size = 100) {
    const r = 44;
    const cx = 50;
    const cy = 50;

    // Gradientes e padrões para superfície lunar
    const defs = `
      <defs>
        <radialGradient id="moonGlowGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stop-color="#fffde6" />
          <stop offset="45%" stop-color="#f8cb58" />
          <stop offset="80%" stop-color="#cf941a" />
          <stop offset="100%" stop-color="#805603" />
        </radialGradient>
        <radialGradient id="darkSideGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#182033" />
          <stop offset="70%" stop-color="#0c1220" />
          <stop offset="100%" stop-color="#060911" />
        </radialGradient>
        <mask id="moonCircleMask_${size}_${type}">
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" />
        </mask>
      </defs>
    `;

    // Desenho das crateras estéticas para maior realismo
    const cratersLight = `
      <g opacity="0.16" fill="#754e04">
        <circle cx="36" cy="38" r="7" />
        <circle cx="62" cy="36" r="9" />
        <circle cx="58" cy="65" r="11" />
        <circle cx="40" cy="68" r="5" />
        <circle cx="48" cy="46" r="4" />
      </g>
    `;

    const cratersDark = `
      <g opacity="0.3" fill="#04060b">
        <circle cx="36" cy="38" r="7" />
        <circle cx="62" cy="36" r="9" />
        <circle cx="58" cy="65" r="11" />
        <circle cx="40" cy="68" r="5" />
        <circle cx="48" cy="46" r="4" />
      </g>
    `;

    let litPath = '';

    switch (type) {
      case 'new':
        // Apenas disco escuro
        litPath = '';
        break;

      case 'waxing_crescent':
        // Arco fino iluminado à direita
        litPath = `
          <path d="M 50 6 A 44 44 0 0 1 50 94 A 30 44 0 0 0 50 6 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'first_quarter':
        // Metade direita iluminada
        litPath = `
          <path d="M 50 6 A 44 44 0 0 1 50 94 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'waxing_gibbous':
        // Metade direita + bojo à esquerda iluminado
        litPath = `
          <path d="M 50 6 A 44 44 0 0 1 50 94 A 26 44 0 0 1 50 6 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'full':
        // Círculo completo iluminado
        litPath = `
          <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'waning_gibbous':
        // Metade esquerda + bojo à direita iluminado
        litPath = `
          <path d="M 50 6 A 44 44 0 0 0 50 94 A 26 44 0 0 0 50 6 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'third_quarter':
        // Metade esquerda iluminada
        litPath = `
          <path d="M 50 6 A 44 44 0 0 0 50 94 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      case 'waning_crescent':
        // Arco fino iluminado à esquerda
        litPath = `
          <path d="M 50 6 A 44 44 0 0 0 50 94 A 30 44 0 0 1 50 6 Z" fill="url(#moonGlowGrad)" />
        `;
        break;

      default:
        litPath = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#moonGlowGrad)" />`;
    }

    return `
      <svg viewBox="0 0 100 100" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" style="display:block;">
        ${defs}
        <!-- Fundo Sombreado da Lua -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#darkSideGrad)" />
        ${cratersDark}
        <!-- Porção Iluminada -->
        <g mask="url(#moonCircleMask_${size}_${type})">
          ${litPath}
        </g>
        ${type !== 'new' ? cratersLight : ''}
        <!-- Borda sutil do disco lunar -->
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(248, 203, 88, 0.18)" stroke-width="1.2" />
      </svg>
    `;
  }

  /* ===================================================================
     3. NAVEGAÇÃO ENTRE ABAS / MÓDULOS
     =================================================================== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const moduleSections = document.querySelectorAll('.module-section');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabButtons.forEach(b => b.classList.remove('active'));
      moduleSections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
      }
    });
  });

  // Ícone lunar no cabeçalho
  const headerBadge = document.getElementById('headerMoonBadge');
  if (headerBadge) {
    headerBadge.innerHTML = createMoonSVG('full', 50);
  }

  /* ===================================================================
     4. MÓDULO 1: VISUALIZAÇÃO INTERATIVA DAS OITO FASES
     =================================================================== */
  const phaseButtonsContainer = document.getElementById('phaseButtonsContainer');
  const phaseMoonGraphic = document.getElementById('phaseMoonGraphic');
  const phaseTitle = document.getElementById('phaseTitle');
  const phaseOrderBadge = document.getElementById('phaseOrderBadge');
  const phaseDayMetric = document.getElementById('phaseDayMetric');
  const phaseLightMetric = document.getElementById('phaseLightMetric');
  const phaseVisMetric = document.getElementById('phaseVisMetric');
  const phaseDescription = document.getElementById('phaseDescription');

  let selectedPhaseIndex = 0;

  function renderPhaseModule(index) {
    selectedPhaseIndex = index;
    const phase = LUNAR_PHASES[index];

    // Atualiza botões
    const allBtns = phaseButtonsContainer.querySelectorAll('.phase-pick-btn');
    allBtns.forEach((b, i) => {
      b.classList.toggle('active', i === index);
    });

    // Atualiza imagem, título, badges e descrição
    phaseMoonGraphic.innerHTML = createMoonSVG(phase.type, 185);
    phaseTitle.textContent = phase.name;
    phaseOrderBadge.textContent = `Fase ${phase.id + 1} de 8`;
    phaseDayMetric.textContent = `~ ${phase.approxDay} dias`;
    phaseLightMetric.textContent = phase.lightPct;
    phaseVisMetric.textContent = phase.visibility;
    phaseDescription.textContent = phase.description;
  }

  function initPhaseButtons() {
    phaseButtonsContainer.innerHTML = '';
    LUNAR_PHASES.forEach((phase, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `phase-pick-btn ${idx === 0 ? 'active' : ''}`;
      btn.setAttribute('aria-label', `Ver detalhes de ${phase.name}`);

      btn.innerHTML = `
        <div class="phase-btn-thumb">${createMoonSVG(phase.type, 38)}</div>
        <span class="phase-btn-label">${phase.name}</span>
      `;

      btn.addEventListener('click', () => {
        renderPhaseModule(idx);
      });

      phaseButtonsContainer.appendChild(btn);
    });

    renderPhaseModule(0);
  }

  initPhaseButtons();

  /* ===================================================================
     5. MÓDULO 2: SIMULAÇÃO ANIMADA DO CICLO LUNAR (~29,5 DIAS)
     =================================================================== */
  const CYCLE_DAYS = 29.53; // Período sinódico médio em dias
  const BASE_RATE = 1.6;    // Dias simulados por segundo na velocidade 1.0x

  let simDay = 0.0;
  let isSimRunning = false;
  let simSpeedMultiplier = 1.0;
  let lastTimestamp = null;
  let animFrameId = null;

  const btnSimPlay = document.getElementById('btnSimPlay');
  const btnSimPause = document.getElementById('btnSimPause');
  const btnSimReset = document.getElementById('btnSimReset');
  const speedSlider = document.getElementById('speedSlider');
  const speedReadout = document.getElementById('speedReadout');
  const simDayDisplay = document.getElementById('simDayDisplay');
  const simProgressBar = document.getElementById('simProgressBar');
  const simCurrentPhaseBadge = document.getElementById('simCurrentPhaseBadge');
  const simCloseupGraphic = document.getElementById('simCloseupGraphic');
  const simOrbitMoon = document.getElementById('simOrbitMoon');
  const orbitingMoonContainer = document.getElementById('orbitingMoonContainer');
  const orbitStage = document.getElementById('orbitStage');
  const simPhasesList = document.getElementById('simPhasesList');

  // Determina a fase com base no dia do ciclo (0 a 29.53)
  function getPhaseByDay(day) {
    const normalized = ((day % CYCLE_DAYS) + CYCLE_DAYS) % CYCLE_DAYS;
    const slotDuration = CYCLE_DAYS / 8; // ~3.69 dias por fase
    const phaseIndex = Math.min(Math.floor(normalized / slotDuration), 7);
    return LUNAR_PHASES[phaseIndex];
  }

  // Preenche lista de fases da simulação
  function initSimPhasesList() {
    simPhasesList.innerHTML = '';
    LUNAR_PHASES.forEach((p) => {
      const li = document.createElement('li');
      li.id = `simPhaseItem_${p.id}`;
      li.innerHTML = `<span>${p.id + 1}.</span> <span>${p.name}</span>`;
      simPhasesList.appendChild(li);
    });
  }

  initSimPhasesList();

  function updateSimulationVisuals() {
    // 1. Contador de dias e barra de progresso
    simDayDisplay.textContent = simDay.toFixed(1);
    const progressPercent = (simDay / CYCLE_DAYS) * 100;
    simProgressBar.style.width = `${progressPercent.toFixed(1)}%`;

    // 2. Fase atual correspondente
    const currentPhase = getPhaseByDay(simDay);
    simCurrentPhaseBadge.textContent = currentPhase.name;

    // Atualiza close-up visto da Terra
    simCloseupGraphic.innerHTML = createMoonSVG(currentPhase.type, 110);

    // Atualiza miniatura na órbita
    simOrbitMoon.innerHTML = createMoonSVG(currentPhase.type, 36);

    // 3. Atualiza destaque na lista de fases
    LUNAR_PHASES.forEach((p) => {
      const item = document.getElementById(`simPhaseItem_${p.id}`);
      if (item) {
        item.classList.toggle('current-active-phase', p.id === currentPhase.id);
      }
    });

    // 4. Posicionamento orbital circular
    const stageWidth = orbitStage.offsetWidth || 300;
    const stageHeight = orbitStage.offsetHeight || 300;
    const orbitRadius = (stageWidth / 2) - 28;

    // Ângulo: 0 dias = Lua Nova (topo ou alinhamento com a luz solar)
    const angleRad = (simDay / CYCLE_DAYS) * 2 * Math.PI - (Math.PI / 2);
    const moonX = (stageWidth / 2) + orbitRadius * Math.cos(angleRad);
    const moonY = (stageHeight / 2) + orbitRadius * Math.sin(angleRad);

    orbitingMoonContainer.style.left = `${moonX}px`;
    orbitingMoonContainer.style.top = `${moonY}px`;
  }

  function simulationStep(timestamp) {
    if (!lastTimestamp) {
      lastTimestamp = timestamp;
    }

    const deltaTime = (timestamp - lastTimestamp) / 1000; // segundos decorridos
    lastTimestamp = timestamp;

    if (isSimRunning) {
      simDay += deltaTime * BASE_RATE * simSpeedMultiplier;

      if (simDay >= CYCLE_DAYS) {
        simDay = simDay % CYCLE_DAYS;
      }

      updateSimulationVisuals();
      animFrameId = requestAnimationFrame(simulationStep);
    }
  }

  function startSimulation() {
    if (isSimRunning) return;
    isSimRunning = true;
    lastTimestamp = null;

    btnSimPlay.disabled = true;
    btnSimPause.disabled = false;
    btnSimPlay.innerHTML = '<span class="btn-icon">▶</span> Executando...';

    animFrameId = requestAnimationFrame(simulationStep);
  }

  function pauseSimulation() {
    if (!isSimRunning) return;
    isSimRunning = false;
    if (animFrameId) {
      cancelAnimationFrame(animFrameId);
    }
    lastTimestamp = null;

    btnSimPlay.disabled = false;
    btnSimPause.disabled = true;
    btnSimPlay.innerHTML = '<span class="btn-icon">▶</span> Continuar';
  }

  function resetSimulation() {
    pauseSimulation();
    simDay = 0.0;
    btnSimPlay.innerHTML = '<span class="btn-icon">▶</span> Iniciar';
    updateSimulationVisuals();
  }

  // Event Listeners dos Controles
  btnSimPlay.addEventListener('click', startSimulation);
  btnSimPause.addEventListener('click', pauseSimulation);
  btnSimReset.addEventListener('click', resetSimulation);

  // Controle de Velocidade: altera instantaneamente sem quebrar a simulação
  speedSlider.addEventListener('input', (e) => {
    simSpeedMultiplier = parseFloat(e.target.value);
    speedReadout.textContent = `${simSpeedMultiplier.toFixed(2)}x`;
  });

  // Atualiza layout orbital em caso de redimensionamento da janela
  window.addEventListener('resize', () => {
    updateSimulationVisuals();
  });

  // Inicialização inicial do Módulo 2
  updateSimulationVisuals();

  /* ===================================================================
     6. MÓDULO 3: QUIZ LUNAR
     =================================================================== */
  const QUIZ_QUESTIONS = [
    {
      question: '1. Quantas fases principais são tradicionalmente catalogadas no ciclo lunar?',
      options: [
        '4 fases principais',
        '8 fases distintas',
        '12 fases zodiacais',
        '6 fases sazonais'
      ],
      correctIndex: 1,
      explanation: 'O ciclo lunar completo é dividido em 8 fases sucessivas: Lua Nova, Crescente Inicial, Quarto Crescente, Gibosa Crescente, Lua Cheia, Gibosa Minguante, Quarto Minguante e Minguante Final.'
    },
    {
      question: '2. Qual é a duração média aproximada de um ciclo lunar completo (mês sinódico)?',
      options: [
        '24,0 dias',
        '27,3 dias',
        '29,5 dias',
        '31,0 dias'
      ],
      correctIndex: 2,
      explanation: 'O mês sinódico (período entre duas luas novas consecutivas) dura aproximadamente 29,5 dias (29 dias, 12 horas e 44 minutos).'
    },
    {
      question: '3. Durante a fase de Lua Nova, por que não conseguimos enxergar a Lua da Terra à noite?',
      options: [
        'A face iluminada pelo Sol está voltada para longe da Terra',
        'A Lua é totalmente eclipsada pela sombra da Terra',
        'A Lua interrompe seu movimento e permanece atrás do Sol',
        'A atmosfera lunar reflete toda a luz de volta ao espaço'
      ],
      correctIndex: 0,
      explanation: 'Na Lua Nova, a Lua está situada na mesma direção geral do Sol. A face banhada pela luz solar está voltada para o espaço, enquanto a face voltada para nós permanece no escuro.'
    },
    {
      question: '4. O que caracteriza a fase denominada "Gibosa Crescente"?',
      options: [
        'Menos de 25% da face visível está iluminada',
        'Exatamente 50% da face visível está iluminada',
        'Mais de 50%, porém menos de 100%, da face visível está iluminada',
        'A Lua apresenta coloração avermelhada por reflexão'
      ],
      correctIndex: 2,
      explanation: 'A palavra "gibosa" refere-se à forma abaulada ou convexa. Na Gibosa Crescente, mais da metade (entre 51% e 99%) da face voltada para a Terra já está iluminada, caminhando rumo à Lua Cheia.'
    },
    {
      question: '5. Em qual fase a Lua nasce exatamente no poente (ao pôr do Sol) e se põe ao amanhecer?',
      options: [
        'Quarto Crescente',
        'Lua Nova',
        'Quarto Minguante',
        'Lua Cheia'
      ],
      correctIndex: 3,
      explanation: 'Na Lua Cheia, a Terra fica entre o Sol e a Lua (oposição). Por isso, a Lua desponta no horizonte leste exatamente quando o Sol se põe no oeste, cruzando o céu ao longo de toda a noite.'
    },
    {
      question: '6. As diferentes fases da Lua observadas da Terra são causadas principalmente por qual fator?',
      options: [
        'A sombra da Terra sendo projetada sobre a superfície lunar diariamente',
        'A mudança constante do ângulo de visão da face lunar iluminada pelo Sol durante a translação da Lua',
        'A variação contínua da distância entre a Terra e a Lua (apogeu e perigeu)',
        'Mudanças na quantidade de energia emitida pelas explosões solares'
      ],
      correctIndex: 1,
      explanation: 'As fases da Lua decorrem do fato de a Lua orbitar a Terra, fazendo com que o observador terrestre enxergue diferentes proporções da metade iluminada pelo Sol ao longo do mês. Não se trata da sombra da Terra (que origina os eclipses lunares).'
    }
  ];

  let currentQuestionIndex = 0;
  let quizScore = 0;
  let hasAnsweredCurrent = false;

  const quizPlayArea = document.getElementById('quizPlayArea');
  const quizResultArea = document.getElementById('quizResultArea');
  const quizQuestionCount = document.getElementById('quizQuestionCount');
  const quizCurrentScore = document.getElementById('quizCurrentScore');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizFeedbackBox = document.getElementById('quizFeedbackBox');
  const btnQuizNext = document.getElementById('btnQuizNext');
  const btnQuizRestart = document.getElementById('btnQuizRestart');

  const resultScoreValue = document.getElementById('resultScoreValue');
  const resultScorePct = document.getElementById('resultScorePct');
  const resultMessage = document.getElementById('resultMessage');

  const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

  function displayQuestion(index) {
    hasAnsweredCurrent = false;
    const qData = QUIZ_QUESTIONS[index];
    const totalQ = QUIZ_QUESTIONS.length;

    // Atualiza cabeçalho e progresso do quiz
    quizQuestionCount.textContent = `Questão ${index + 1} de ${totalQ}`;
    quizCurrentScore.textContent = `Pontos: ${quizScore}`;
    quizProgressBar.style.width = `${((index) / totalQ) * 100}%`;

    quizQuestionText.textContent = qData.question;
    quizOptionsContainer.innerHTML = '';
    quizFeedbackBox.className = 'quiz-feedback-box';
    quizFeedbackBox.textContent = '';
    btnQuizNext.style.display = 'none';

    qData.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `
        <span class="quiz-opt-letter">${OPTION_LETTERS[optIdx]}</span>
        <span class="quiz-opt-text">${optText}</span>
      `;

      btn.addEventListener('click', () => {
        handleOptionSelected(optIdx);
      });

      quizOptionsContainer.appendChild(btn);
    });
  }

  function handleOptionSelected(chosenIndex) {
    // Impede selecionar mais de uma resposta por questão
    if (hasAnsweredCurrent) return;
    hasAnsweredCurrent = true;

    const qData = QUIZ_QUESTIONS[currentQuestionIndex];
    const isCorrect = chosenIndex === qData.correctIndex;
    const allOptionButtons = quizOptionsContainer.querySelectorAll('.quiz-opt-btn');

    // Desativa todos os botões para travar a resposta
    allOptionButtons.forEach((btn, idx) => {
      btn.disabled = true;

      if (idx === qData.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === chosenIndex) {
        btn.classList.add('wrong');
      } else {
        btn.classList.add('dimmed');
      }
    });

    // Atualiza pontuação e feedback
    if (isCorrect) {
      quizScore++;
      quizCurrentScore.textContent = `Pontos: ${quizScore}`;
      quizFeedbackBox.className = 'quiz-feedback-box show feedback-correct';
      quizFeedbackBox.innerHTML = `<strong>Correto!</strong> ${qData.explanation}`;
    } else {
      quizFeedbackBox.className = 'quiz-feedback-box show feedback-wrong';
      quizFeedbackBox.innerHTML = `<strong>Incorreto.</strong> ${qData.explanation}`;
    }

    // Configura botão de avanço
    btnQuizNext.style.display = 'inline-flex';
    if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
      btnQuizNext.textContent = 'Ver Resultado Final 🏆';
    } else {
      btnQuizNext.textContent = 'Próxima Questão →';
    }
  }

  function showQuizResults() {
    quizPlayArea.style.display = 'none';
    quizResultArea.style.display = 'flex';

    const total = QUIZ_QUESTIONS.length;
    const percentage = Math.round((quizScore / total) * 100);

    resultScoreValue.textContent = `${quizScore} / ${total}`;
    resultScorePct.textContent = `${percentage}% de aproveitamento`;

    let msg = '';
    if (percentage === 100) {
      msg = 'Sensacional! Você dominou completamente a astronomia das fases da Lua!';
    } else if (percentage >= 70) {
      msg = 'Muito bem! Você tem um ótimo entendimento do ciclo lunar e dos movimentos celestes.';
    } else if (percentage >= 50) {
      msg = 'Bom esforço! Dê mais uma olhada nos Módulos 1 e 2 para aperfeiçoar seus conhecimentos.';
    } else {
      msg = 'Continue explorando! Utilize o Módulo 1 e a Simulação para rever as fases e tente novamente.';
    }
    resultMessage.textContent = msg;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    quizScore = 0;
    hasAnsweredCurrent = false;

    quizResultArea.style.display = 'none';
    quizPlayArea.style.display = 'block';

    displayQuestion(0);
  }

  btnQuizNext.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < QUIZ_QUESTIONS.length) {
      displayQuestion(currentQuestionIndex);
    } else {
      quizProgressBar.style.width = '100%';
      showQuizResults();
    }
  });

  btnQuizRestart.addEventListener('click', restartQuiz);

  // Iniciar Quiz
  displayQuestion(0);
});

