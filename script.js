/* =============================================
   Quiz Hermes Wallet — Vanilla JS (ES6+)
   Render Engine Multi-Tipo: 15 etapas
   Tipos: question | pill | video | review |
          interstitial | star_rating
   ============================================= */

// ─── DADOS DO FUNIL (15 ETAPAS) ─────────────────────────────────
const STEPS = [
  // ── 1. Pergunta grid 2x2 ──────────────────────────────────────
  {
    id: 1,
    type: "question",
    question: "Você sabe exatamente para onde cada centavo do seu salário vai todo mês?",
    options: [
      { emoji: "🕳️", label: "Sem Controle", desc: "Não faço ideia, o dinheiro simplesmente some" },
      { emoji: "📝", label: "Noção Vaga", desc: "Tenho uma noção, mas nunca anotei direito" },
      { emoji: "📉", label: "Estouro Frequente", desc: "Sei mais ou menos, porém sempre estouro" },
      { emoji: "✅", label: "Tudo Organizado", desc: "Acompanho tudo com planilha ou aplicativo" },
    ],
  },
  // ── 2. Pergunta grid 2x2 ──────────────────────────────────────
  {
    id: 2,
    type: "question",
    question: "Como está a sua relação com dívidas hoje?",
    options: [
      { emoji: "🆘", label: "Afundado", desc: "Estou afundado e não sei por onde começar" },
      { emoji: "😰", label: "Apertado", desc: "Tenho parcelas que apertam todo mês" },
      { emoji: "🔄", label: "Ciclo Vicioso", desc: "Já quitei, mas volta e meia me endivido" },
      { emoji: "💚", label: "Livre", desc: "Não tenho dívidas e mantenho o controle" },
    ],
  },
  // ── 3. Interstitial — Impacto Emocional ───────────────────────
  {
    id: 3,
    type: "interstitial",
    icon: "🔍",
    title: "Interessante… suas respostas já revelam um padrão.",
    subtitle: "A maioria das pessoas que faz este quiz descobriu que o problema <strong>nunca foi o salário</strong> — foi a falta de um sistema.",
    buttonText: "Continuar Diagnóstico",
  },
  // ── 4. Pill select ────────────────────────────────────────────
  {
    id: 4,
    type: "pill",
    question: "Quando você pensa em investir dinheiro, qual sentimento vem primeiro?",
    options: [
      { icon: "😰", text: "Paralisia — não entendo nada e tenho medo de perder" },
      { icon: "🤔", text: "Curiosidade, mas falta sobra no mês para aplicar" },
      { icon: "😔", text: "Já tentei, mas não tive consistência e parei" },
      { icon: "😎", text: "Invisto com frequência e tenho estratégia definida" },
    ],
  },
  // ── 5. Pergunta grid 2x2 ──────────────────────────────────────
  {
    id: 5,
    type: "question",
    question: "Como é a sensação na última semana do mês na sua casa?",
    options: [
      { emoji: "😱", label: "Desespero", desc: "Conto moedas e rezo pra nenhum boleto vencer" },
      { emoji: "😓", label: "Aperto", desc: "Vivo no limite, qualquer imprevisto é crise" },
      { emoji: "😐", label: "Neutro", desc: "Pago as contas, mas não sobra nada" },
      { emoji: "😌", label: "Tranquilo", desc: "Tudo planejado e reserva garantida" },
    ],
  },
  // ── 6. Pill select ────────────────────────────────────────────
  {
    id: 6,
    type: "pill",
    question: "Qual destas frases mais se parece com algo que você já disse?",
    options: [
      { icon: "💸", text: '"Ganho bem, mas não sei para onde vai meu dinheiro"' },
      { icon: "📅", text: '"Sempre prometo que vou organizar… mas nunca começo"' },
      { icon: "📋", text: '"Já tentei planilha, app, caderninho… nada funciona"' },
      { icon: "🎯", text: '"Preciso de um método simples que eu consiga manter"' },
    ],
  },
  // ── 7. Video — Prova de conceito ──────────────────────────────
  {
    id: 7,
    type: "video",
    title: "📊 Veja como o Hermes Wallet transformou a vida financeira de milhares de brasileiros",
    subtitle: "Assista ao vídeo de 1 minuto e entenda o que suas respostas revelam sobre o seu perfil.",
    buttonText: "Continuar Quiz",
  },
  // ── 8. Pergunta grid 2x2 ──────────────────────────────────────
  {
    id: 8,
    type: "question",
    question: "Se um gasto inesperado de R$ 500 surgisse agora, o que aconteceria?",
    options: [
      { emoji: "🚨", label: "Caos Total", desc: "Teria que pedir emprestado ou rotativo" },
      { emoji: "⚠️", label: "Aperto", desc: "Pagaria, mas comprometeria o mês" },
      { emoji: "😬", label: "Desconfortável", desc: "Usaria minha reserva com receio" },
      { emoji: "🛡️", label: "Protegido", desc: "Minha reserva de emergência cobre fácil" },
    ],
  },
  // ── 9. Star Rating — Nota pra vida financeira ─────────────────
  {
    id: 9,
    type: "star_rating",
    question: "De 1 a 5 estrelas, que nota você dá para a sua vida financeira hoje?",
    subtitle: "Seja sincero — essa nota ajuda a calibrar seu diagnóstico.",
    feedbackMap: {
      1: "😟 Situação crítica — mas o primeiro passo é reconhecer.",
      2: "😕 Está difícil, porém já existe consciência. Isso é poderoso.",
      3: "😐 No meio do caminho. Com o sistema certo, você decola.",
      4: "🙂 Quase lá! Faltam pequenos ajustes para o controle total.",
      5: "🤩 Excelente! Vamos turbinar o que já funciona.",
    },
  },
  // ── 10. Interstitial — Revelação ──────────────────────────────
  {
    id: 10,
    type: "interstitial",
    icon: "⚡",
    title: "Você está a poucos passos do seu diagnóstico completo.",
    subtitle: "As próximas perguntas vão nos ajudar a entender <strong>exatamente</strong> qual ferramenta você precisa para virar o jogo.",
    buttonText: "Estou Pronto",
  },
  // ── 11. Pill select ───────────────────────────────────────────
  {
    id: 11,
    type: "pill",
    question: "O que te impede de ter a vida financeira que você quer?",
    options: [
      { icon: "🗂️", text: "Falta de organização: não tenho um sistema que funcione" },
      { icon: "🛒", text: "Falta de disciplina: gasto por impulso e me arrependo" },
      { icon: "📚", text: "Falta de conhecimento: ninguém me ensinou sobre dinheiro" },
      { icon: "🔧", text: "Falta de ferramenta: preciso de algo prático e visual" },
    ],
  },
  // ── 12. Pergunta grid 2x2 ─────────────────────────────────────
  {
    id: 12,
    type: "question",
    question: "Imagine ter um painel que mostra sua saúde financeira em tempo real. Qual recurso te animaria mais?",
    options: [
      { emoji: "📊", label: "Dashboard Total", desc: "Receitas, despesas e saldo numa só tela" },
      { emoji: "🔔", label: "Alertas Inteligentes", desc: "Avisos antes de estourar o limite" },
      { emoji: "🎯", label: "Metas Visuais", desc: "Progresso visual mês a mês" },
      { emoji: "💹", label: "Simulador", desc: "Investimentos integrados ao orçamento" },
    ],
  },
  // ── 13. Review — Prova Social ─────────────────────────────────
  {
    id: 13,
    type: "review",
    title: "O que dizem quem já retomou o controle financeiro",
    testimonials: [
      {
        name: "Camila R.",
        initials: "CR",
        stars: 5,
        text: "Eu achava que o problema era meu salário, mas era falta de organização. Com o Hermes Wallet, em 2 meses quitei R$ 3.400 em dívidas e finalmente comecei a guardar dinheiro.",
      },
      {
        name: "Lucas M.",
        initials: "LM",
        stars: 5,
        text: "Já tinha tentado planilha, Mobills, Organizze… nada colava. O Hermes é diferente porque é visual e rápido. Gasto 5 minutos por semana e tenho tudo sob controle.",
      },
      {
        name: "Fernanda S.",
        initials: "FS",
        stars: 5,
        text: "Meu dinheiro sumia e eu não sabia explicar pra onde ia. O dashboard me mostrou que eu gastava R$ 800/mês em delivery sem perceber. Hoje invisto esse valor.",
      },
    ],
    buttonText: "Continuar",
  },
  // ── 14. Pill select — Comprometimento ─────────────────────────
  {
    id: 14,
    type: "pill",
    question: "Se existisse um sistema que organiza sua vida financeira em 15 minutos, você começaria…",
    options: [
      { icon: "🚀", text: "Agora mesmo — estou cansado de viver assim" },
      { icon: "📆", text: "Essa semana — preciso de um empurrão" },
      { icon: "⏳", text: "Talvez no próximo mês — ainda estou pensando" },
      { icon: "🤷", text: "Não sei se algo assim existe de verdade" },
    ],
  },
  // ── 15. Interstitial final + CTA ──────────────────────────────
  {
    id: 15,
    type: "interstitial",
    icon: "✅",
    title: "Pronto! Todas as suas respostas foram registradas.",
    subtitle: "Nosso algoritmo já está processando seu perfil financeiro. Em instantes você verá um <strong>diagnóstico personalizado</strong> com a solução ideal para o seu momento.",
    buttonText: "Ver Meu Diagnóstico",
  },
];

const CHECKOUT_URL = "https://pay.kiwify.com.br/chCm1MZ";

// ─── ESTADO GLOBAL ──────────────────────────────────────────────
let phase = "intro"; // intro | steps | loading | result
let currentIndex = 0;
let selectedOption = null;
const answers = [];
const viewedSteps = new Set(); // anti-duplicação de quiz_step_viewed

// ─── HELPER: Push seguro para o dataLayer ───────────────────────
function pushDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...payload });
}

// ─── REFERÊNCIA AO CONTAINER ────────────────────────────────────
const root = document.getElementById("quiz-root");

// ─── RENDER ENGINE ──────────────────────────────────────────────

/** Limpa o container e injeta novo HTML */
function mount(html) {
  root.innerHTML = html;
}

// ─────────────────── TELA: INTRO ────────────────────────────────
function renderIntro() {
  phase = "intro";

  mount(/* html */ `
    <div class="quiz-wrapper">
      <div class="step active">
        <div class="welcome-screen">
          <div class="welcome-badge">
            <span class="badge-icon">📊</span>
            Quiz Financeiro Hermes
          </div>
          <h1 class="welcome-title">Descubra o seu <span class="gradient-text">Perfil Financeiro</span></h1>
          <p class="welcome-subtitle">
            Responda 15 perguntas rápidas e receba um diagnóstico personalizado
            para organizar suas finanças de vez.
          </p>
          <div class="welcome-stats">
            <div class="stat-item">
              <span class="stat-number">2 min</span>
              <span class="stat-label">Duração</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">12.847+</span>
              <span class="stat-label">Diagnósticos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">4.9 ⭐</span>
              <span class="stat-label">Avaliação</span>
            </div>
          </div>
          <button
            id="btn-start"
            class="btn-primary btn-glow"
          >
            Iniciar Quiz <span class="btn-arrow">→</span>
          </button>
          <p class="welcome-disclaimer">100% gratuito • Resultado imediato</p>
        </div>
      </div>
    </div>
  `);

  document.getElementById("btn-start").addEventListener("click", handleStart);
}

// ─────────────────── RENDER STEP (Engine Multi-Tipo) ────────────
function renderStep() {
  phase = "steps";

  const current = STEPS[currentIndex];
  const stepNumber = currentIndex + 1;
  const total = STEPS.length;
  const pct = Math.round((stepNumber / total) * 100);

  // Dispara quiz_step_viewed (anti-duplicação)
  if (!viewedSteps.has(stepNumber)) {
    viewedSteps.add(stepNumber);
    pushDataLayer({
      event: "quiz_step_viewed",
      quiz_step: stepNumber,
      quiz_step_type: current.type,
      quiz_total_steps: total,
    });
  }

  // ── Gera o HTML interno conforme o type ──
  let innerHTML = "";

  switch (current.type) {
    case "question":
      innerHTML = buildQuestionHTML(current, stepNumber, total);
      break;
    case "pill":
      innerHTML = buildPillHTML(current, stepNumber, total);
      break;
    case "video":
      innerHTML = buildVideoHTML(current);
      break;
    case "review":
      innerHTML = buildReviewHTML(current);
      break;
    case "interstitial":
      innerHTML = buildInterstitialHTML(current);
      break;
    case "star_rating":
      innerHTML = buildStarRatingHTML(current);
      break;
    default:
      innerHTML = `<p>Tipo de etapa desconhecido.</p>`;
  }

  mount(/* html */ `
    <div class="quiz-wrapper">
      <!-- Progresso -->
      <div class="progress-container">
        <div class="progress-bar" style="width: ${pct}%"></div>
      </div>
      <div class="progress-text">Etapa ${stepNumber} / ${total}</div>

      <div class="step active">
        <div class="step-content">
          ${innerHTML}
        </div>
      </div>
    </div>
  `);

  // ── Binds pós-montagem conforme o tipo ──
  switch (current.type) {
    case "question":
      bindQuestionEvents(current);
      break;
    case "pill":
      bindPillEvents(current);
      break;
    case "star_rating":
      bindStarRatingEvents(current);
      break;
  }

  // Bind do botão avançar (presente em todos os tipos)
  const btnNext = document.getElementById("btn-next");
  if (btnNext) {
    btnNext.addEventListener("click", handleNext);
  }
}

// ─────────────────── BUILDER: QUESTION (grid 2x2) ───────────────
function buildQuestionHTML(step, stepNumber, total) {
  const optionsHTML = step.options
    .map(
      (opt, idx) => `
      <button
        class="option-card"
        data-index="${idx}"
      >
        <span class="card-emoji">${opt.emoji}</span>
        <span class="card-label">${opt.label}</span>
        <span class="card-desc">${opt.desc}</span>
      </button>`
    )
    .join("");

  return /* html */ `
    <div class="step-header">
      <span class="step-number">Pergunta ${stepNumber} de ${total}</span>
      <h2 class="step-title">${step.question}</h2>
    </div>

    <div class="options-grid grid-2x2" id="options-container">
      ${optionsHTML}
    </div>

    <button
      id="btn-next"
      disabled
      class="btn-continue hidden"
    >
      Próxima Pergunta
    </button>
  `;
}

// ─────────────────── BUILDER: PILL (lista vertical) ─────────────
function buildPillHTML(step, stepNumber, total) {
  const pillsHTML = step.options
    .map(
      (opt, idx) => `
      <button
        class="option-pill"
        data-index="${idx}"
      >
        <span class="pill-icon">${opt.icon}</span>
        <span>${opt.text}</span>
        <span class="pill-check">✓</span>
      </button>`
    )
    .join("");

  return /* html */ `
    <div class="step-header">
      <span class="step-number">Pergunta ${stepNumber} de ${total}</span>
      <h2 class="step-title">${step.question}</h2>
    </div>

    <div class="options-list" id="options-container">
      ${pillsHTML}
    </div>

    <button
      id="btn-next"
      disabled
      class="btn-continue hidden"
    >
      Próxima Pergunta
    </button>
  `;
}

// ─────────────────── BUILDER: VIDEO ─────────────────────────────
function buildVideoHTML(step) {
  return /* html */ `
    <div class="step-header">
      <h2 class="step-title">${step.title}</h2>
      <p class="step-subtitle">${step.subtitle}</p>
    </div>

    <div class="video-placeholder">
      <div class="video-mock">
        <div class="video-play-btn">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a0804">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>
        <span class="video-title-overlay">Clique para assistir</span>
      </div>
    </div>

    <button
      id="btn-next"
      class="btn-continue"
    >
      ${step.buttonText}
    </button>
  `;
}

// ─────────────────── BUILDER: REVIEW ────────────────────────────
function buildReviewHTML(step) {
  const testimonialsHTML = step.testimonials
    .map(
      (t) => `
      <div class="testimonial-card animate-slide-up">
        <div class="testimonial-header">
          <div class="testimonial-avatar">${t.initials}</div>
          <div>
            <strong>${t.name}</strong>
            <div class="testimonial-stars">${"⭐".repeat(t.stars)}</div>
          </div>
        </div>
        <p>"${t.text}"</p>
      </div>`
    )
    .join("");

  return /* html */ `
    <div class="step-header">
      <h2 class="step-title">${step.title}</h2>
    </div>

    <div class="testimonials-container">
      ${testimonialsHTML}
    </div>

    <button
      id="btn-next"
      class="btn-continue"
    >
      ${step.buttonText}
    </button>
  `;
}

// ─────────────────── BUILDER: INTERSTITIAL ──────────────────────
function buildInterstitialHTML(step) {
  return /* html */ `
    <div class="interstitial-screen">
      <div class="interstitial-icon animate-float">${step.icon}</div>
      <h2 class="interstitial-title step-title">${step.title}</h2>
      <p class="step-subtitle">${step.subtitle}</p>

      <button
        id="btn-next"
        class="btn-continue"
        style="margin-top: 36px;"
      >
        ${step.buttonText} <span class="btn-arrow">→</span>
      </button>
    </div>
  `;
}

// ─────────────────── BUILDER: STAR RATING ───────────────────────
function buildStarRatingHTML(step) {
  const starsHTML = [1, 2, 3, 4, 5]
    .map(
      (n) => `<button class="star" data-value="${n}">⭐</button>`
    )
    .join("");

  return /* html */ `
    <div class="star-rating-screen">
      <div class="step-header">
        <h2 class="step-title">${step.question}</h2>
        <p class="step-subtitle star-legend">${step.subtitle}</p>
      </div>

      <div class="stars-container" id="stars-container">
        ${starsHTML}
      </div>

      <div class="star-feedback" id="star-feedback"></div>

      <button
        id="btn-next"
        disabled
        class="btn-continue hidden"
      >
        Próxima Pergunta
      </button>
    </div>
  `;
}

// ─────────────────── BIND: QUESTION EVENTS ──────────────────────
function bindQuestionEvents(step) {
  document.querySelectorAll(".option-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".option-card").forEach((b) =>
        b.classList.remove("selected")
      );
      btn.classList.add("selected");
      const opt = step.options[parseInt(btn.dataset.index, 10)];
      selectedOption = opt.desc;

      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("hidden");
    });
  });
}

// ─────────────────── BIND: PILL EVENTS ──────────────────────────
function bindPillEvents(step) {
  document.querySelectorAll(".option-pill").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".option-pill").forEach((b) =>
        b.classList.remove("selected")
      );
      btn.classList.add("selected");
      selectedOption = step.options[parseInt(btn.dataset.index, 10)].text;

      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("hidden");
    });
  });
}

// ─────────────────── BIND: STAR RATING EVENTS ───────────────────
function bindStarRatingEvents(step) {
  const stars = document.querySelectorAll(".star");
  const feedbackEl = document.getElementById("star-feedback");

  // Hover preview
  stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
      const val = parseInt(star.dataset.value, 10);
      stars.forEach((s) => {
        const sv = parseInt(s.dataset.value, 10);
        if (sv <= val) {
          s.classList.add("hover-preview");
        } else {
          s.classList.remove("hover-preview");
        }
      });
    });

    star.addEventListener("mouseleave", () => {
      stars.forEach((s) => s.classList.remove("hover-preview"));
    });

    // Click
    star.addEventListener("click", () => {
      const val = parseInt(star.dataset.value, 10);
      selectedOption = `${val} estrelas`;

      // Highlight active stars
      stars.forEach((s) => {
        const sv = parseInt(s.dataset.value, 10);
        if (sv <= val) {
          s.classList.add("active");
        } else {
          s.classList.remove("active");
        }
      });

      // Show feedback
      if (step.feedbackMap && step.feedbackMap[val]) {
        feedbackEl.textContent = step.feedbackMap[val];
        feedbackEl.style.opacity = "1";
      }

      // Enable next
      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("hidden");
    });
  });
}

// ─────────────────── TELA: LOADING ──────────────────────────────
function renderLoading() {
  phase = "loading";

  const loadingSteps = [
    { icon: "📋", text: "Processando suas respostas…" },
    { icon: "🧠", text: "Analisando padrões de comportamento…" },
    { icon: "📊", text: "Gerando diagnóstico personalizado…" },
    { icon: "✅", text: "Diagnóstico concluído!" },
  ];

  const stepsHTML = loadingSteps
    .map(
      (s, i) => `
      <div class="loading-step" data-step="${i}">
        <span class="loading-check">${s.icon}</span>
        <span>${s.text}</span>
      </div>`
    )
    .join("");

  mount(/* html */ `
    <div class="quiz-wrapper">
      <div class="step active">
        <div class="loading-screen">
          <div class="loading-animation">
            <div class="loading-circle"></div>
            <div class="loading-circle delay-1"></div>
            <div class="loading-circle delay-2"></div>
          </div>
          <h2 class="loading-title">Analisando suas respostas…</h2>

          <div class="loading-steps">
            ${stepsHTML}
          </div>
        </div>
      </div>
    </div>
  `);

  // Sequência animada dos steps de loading
  const loadEls = document.querySelectorAll(".loading-step");
  loadEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, i * 700);
    setTimeout(() => {
      el.classList.add("completed");
    }, i * 700 + 500);
  });

  // Avança para resultado após animação completa
  setTimeout(() => {
    renderResult();
  }, loadingSteps.length * 700 + 800);
}

// ─────────────────── TELA: RESULTADO (Premium SaaS) ─────────────
function renderResult() {
  phase = "result";

  // ── Light Rays HTML helper ──
  const lightRaysHTML = `
    <div class="light-rays-container">
      <div class="light-ray light-ray--1">
        <div class="light-ray__core light-ray__core--narrow"></div>
        <div class="light-ray__core light-ray__core--mid"></div>
        <div class="light-ray__core light-ray__core--thin"></div>
      </div>
      <div class="light-ray light-ray--2">
        <div class="light-ray__core light-ray__core--narrow"></div>
        <div class="light-ray__core light-ray__core--mid"></div>
        <div class="light-ray__core light-ray__core--thin"></div>
      </div>
      <div class="light-ray light-ray--3">
        <div class="light-ray__core light-ray__core--narrow"></div>
        <div class="light-ray__core light-ray__core--mid"></div>
        <div class="light-ray__core light-ray__core--thin"></div>
      </div>
      <div class="light-rays-ambient"></div>
    </div>`;

  // ── FAQ data ──
  const faqs = [
    { q: "Para quem é o Hermes Wallet?", a: "Para qualquer brasileiro que quer retomar o controle financeiro — seja quem está endividado, quem vive no limite ou quem quer organizar para investir mais." },
    { q: "Preciso saber de finanças para usar?", a: "Não! O Hermes Wallet foi desenhado para ser intuitivo. Você receberá acesso a aulas passo a passo que ensinam tudo do zero — mesmo que nunca tenha usado o Notion." },
    { q: "Preciso saber usar o Notion?", a: "Não! Incluímos 4 videoaulas práticas que ensinam desde o básico até a configuração completa do seu sistema financeiro. É só seguir o passo a passo." },
    { q: "Como funciona a garantia?", a: "Você tem 7 dias para testar. Se por qualquer motivo não gostar, devolvemos 100% do valor — sem perguntas, sem burocracia." },
    { q: "Funciona no celular?", a: "Sim! O Hermes Wallet funciona no Notion, que é 100% responsivo e otimizado para qualquer dispositivo — celular, tablet ou desktop." },
    { q: "Como recebo o acesso?", a: "Após a confirmação do pagamento, você receberá acesso imediato à plataforma da Kiwify com as videoaulas e o sistema Hermes Wallet pronto para usar." },
  ];

  const faqHTML = faqs.map((f, i) => `
    <div class="faq-premium__item reveal-blur reveal-delay-${Math.min(i + 1, 5)}" onclick="this.classList.toggle('open')">
      <div class="faq-premium__question">
        <span>${f.q}</span>
        <span class="faq-premium__arrow">▾</span>
      </div>
      <div class="faq-premium__answer">
        <p>${f.a}</p>
      </div>
    </div>
  `).join("");

  // ── Testimonials data (WhatsApp Prints) ──
  const testimonials = [
    { img: "assets/whatsapp-review-1.png", alt: "Depoimento Camila R." },
    { img: "assets/whatsapp-review-2.png", alt: "Depoimento Lucas M." },
    { img: "assets/whatsapp-review-3.png", alt: "Depoimento Fernanda S." },
    { img: "assets/whatsapp-review-4.png", alt: "Depoimento Matheus K." },
    { img: "assets/whatsapp-review-5.png", alt: "Depoimento Cliente 5" },
    { img: "assets/whatsapp-review-6.png", alt: "Depoimento Cliente 6" },
    { img: "assets/whatsapp-review-7.png", alt: "Depoimento Cliente 7" },
    { img: "assets/whatsapp-review-8.png", alt: "Depoimento Cliente 8" },
    { img: "assets/whatsapp-review-9.png", alt: "Depoimento Cliente 9" },
    { img: "assets/whatsapp-review-10.png", alt: "Depoimento Cliente 10" }
  ];

  const testimonialsHTML = testimonials.map((t, i) => `
    <div class="whatsapp-review-card">
      <div class="whatsapp-review-card__img-wrapper">
        <img src="${t.img}" alt="${t.alt}" class="whatsapp-review-card__img" loading="lazy" />
      </div>
    </div>
  `).join("");

  mount(/* html */ `
    <div class="quiz-wrapper" style="overflow-y: auto; overflow-x: hidden; max-height: 100vh;">

      <!-- ═══════ HERO ═══════ -->
      <section class="result-hero--premium">
        ${lightRaysHTML}
        <div class="results-section__inner" style="position: relative; z-index: 10; padding-top: 60px;">
          <div class="reveal-blur reveal-delay-1">
            <span class="badge-shine badge-shine--hero">
              <span>✅</span>
              <span>Diagnóstico Concluído</span>
            </span>
          </div>

          <h1 class="result-hero__heading heading-fade reveal-blur reveal-delay-2" style="margin-top: 28px;">
            Seu sistema financeiro personalizado está pronto.
          </h1>

          <p class="result-hero__sub reveal-blur reveal-delay-3">
            Com base nas suas respostas, identificamos exatamente o que você precisa
            para retomar o controle do seu dinheiro e começar a construir patrimônio.
          </p>

          <!-- ═══════ DEVICE MOCKUP SHOWCASE ═══════ -->
          <div class="mockup-showcase reveal-blur reveal-delay-3" id="mockup-showcase">
            <div class="mockup-composition">

              <!-- 1. NOTEBOOK (MacBook Style) -->
              <div class="mockup-notebook group">
                <div class="mockup-notebook__screen">
                  <div class="mockup-notebook__webcam"></div>
                  <div class="mockup-notebook__display">
                    <img src="assets/desktop.png"
                         alt="Hermes Wallet — Visão Desktop"
                         class="mockup-notebook__img" />
                  </div>
                </div>
                <div class="mockup-notebook__base">
                  <div class="mockup-notebook__notch"></div>
                </div>
              </div>

              <!-- 2. TABLET (iPad Style) -->
              <div class="mockup-tablet group">
                <div class="mockup-tablet__body">
                  <div class="mockup-tablet__webcam"></div>
                  <div class="mockup-tablet__display">
                    <img src="assets/tablet.png"
                         alt="Hermes Wallet — Visão Tablet"
                         class="mockup-tablet__img" />
                  </div>
                </div>
              </div>

              <!-- 3. SMARTPHONE (iPhone Style) -->
              <div class="mockup-phone group">
                <div class="mockup-phone__body">
                  <div class="mockup-phone__display">
                    <div class="mockup-phone__notch"></div>
                    <img src="assets/mobile.png"
                         alt="Hermes Wallet — Visão Mobile"
                         class="mockup-phone__img" />
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="cta-group reveal-blur reveal-delay-4">
            <a
              id="btn-checkout-hero"
              href="${CHECKOUT_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary btn-glow"
              style="text-decoration: none;"
            >
              Quero Organizar Minhas Finanças <span class="btn-arrow">→</span>
            </a>
            <button class="btn-ghost" onclick="document.getElementById('section-benefits').scrollIntoView({behavior:'smooth'})">
              Saiba Mais
            </button>
          </div>

          <p class="trusted-text reveal-blur reveal-delay-5">
            Mais de 12.847 brasileiros já retomaram o controle financeiro
          </p>
        </div>
      </section>

      <!-- ═══════ STATS ═══════ -->
      <section class="results-section" id="section-stats">
        <div class="results-section__inner">
          <div class="stats-row reveal-blur">
            <div class="stat-card">
              <div class="stat-card__value">12.847+</div>
              <div class="stat-card__label">Diagnósticos</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__value">4.9 ⭐</div>
              <div class="stat-card__label">Avaliação</div>
            </div>
            <div class="stat-card">
              <div class="stat-card__value">98%</div>
              <div class="stat-card__label">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ BENEFITS (Split-Screen) ═══════ -->
      <section class="results-section" id="section-benefits">
        <div class="results-section__inner">
          <div class="features-split">

            <!-- Left Column: Badge + Title -->
            <div class="features-split__left reveal-blur reveal-delay-1">
              <div class="section-badge">
                <span class="badge-shine badge-shine--section">✨ Funcionalidades</span>
              </div>
              <h2 class="section-title heading-fade" style="text-align: left; margin-bottom: 16px;">
                O que o Hermes Wallet vai fazer por você
              </h2>
              <p class="features-split__subtitle">
                Um sistema financeiro completo, visual e intuitivo — pensado para quem quer resultados reais.
              </p>
            </div>

            <!-- Right Column: Stacked Features -->
            <div class="features-split__right">

              <div class="feature-list-item reveal-blur reveal-delay-1">
                <div class="feature-list-item__icon">📊</div>
                <div class="feature-list-item__text">
                  <h3>Dashboard Completo</h3>
                  <p>Visão total de receitas, despesas e saldo — tudo atualizado em tempo real numa interface visual e intuitiva.</p>
                </div>
              </div>

              <div class="feature-list-item reveal-blur reveal-delay-2">
                <div class="feature-list-item__icon">🎯</div>
                <div class="feature-list-item__text">
                  <h3>Metas Inteligentes</h3>
                  <p>Defina objetivos financeiros e acompanhe o progresso com gráficos visuais mês a mês.</p>
                </div>
              </div>

              <div class="feature-list-item reveal-blur reveal-delay-3">
                <div class="feature-list-item__icon">🔔</div>
                <div class="feature-list-item__text">
                  <h3>Alertas Automáticos</h3>
                  <p>Receba avisos antes de estourar limites. Nunca mais seja pego de surpresa por contas inesperadas.</p>
                </div>
              </div>

              <div class="feature-list-item reveal-blur reveal-delay-4">
                <div class="feature-list-item__icon">💰</div>
                <div class="feature-list-item__text">
                  <h3>Planejador de Investimentos</h3>
                  <p>Simulador integrado que mostra quanto e onde investir a partir do que sobra no seu orçamento mensal.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ SOCIAL PROOF ═══════ -->
      <section class="results-section">
        <div class="results-section__inner">
          <div class="section-badge reveal-blur">
            <span class="badge-shine badge-shine--section">🏆 Resultados Reais</span>
          </div>
          <h2 class="section-title heading-fade reveal-blur" style="margin-bottom: 24px;">
            O que dizem quem já retomou o controle
          </h2>
        </div>

        <div class="carousel-outer reveal-blur">
          <div class="carousel-track" id="testimonials-carousel">
            ${testimonialsHTML}
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ NOTION LESSONS ═══════ -->
      <section class="results-section">
        <div class="results-section__inner">
          <div class="section-badge reveal-blur">
            <span class="badge-shine badge-shine--section">📚 Não sabe usar o Notion?</span>
          </div>
          <h2 class="section-title heading-fade reveal-blur">
            Aprenda do zero com nossas videoaulas
          </h2>
          <p style="text-align: center; color: var(--text-secondary); font-size: 15px; max-width: 520px; margin: -16px auto 32px; line-height: 1.7;" class="reveal-blur">
            Você não precisa ser expert em tecnologia. Nossas 4 aulas práticas te guiam passo a passo
            — do primeiro acesso ao domínio completo do sistema.
          </p>
        </div>

        <div class="carousel-outer reveal-blur">
          <div class="carousel-track" id="lessons-carousel">
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-1.png" alt="Aula 1 — Primeiros Passos" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 1</span>
                <h4 class="lesson-card__title">Primeiros Passos</h4>
                <p class="lesson-card__desc">Como acessar, criar sua conta no Notion e entender a estrutura do sistema.</p>
              </div>
            </div>
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-2.png" alt="Aula 2 — Configurando o Dashboard" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 2</span>
                <h4 class="lesson-card__title">Configurando o Dashboard</h4>
                <p class="lesson-card__desc">Personalize suas categorias, receitas e configure o painel financeiro.</p>
              </div>
            </div>
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-3.png" alt="Aula 3 — Metas e Orçamento" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 3</span>
                <h4 class="lesson-card__title">Metas e Orçamento</h4>
                <p class="lesson-card__desc">Defina suas metas financeiras e crie seu orçamento mensal inteligente.</p>
              </div>
            </div>
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-4.png" alt="Aula 4 — Rotina Financeira" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 4</span>
                <h4 class="lesson-card__title">Rotina Financeira</h4>
                <p class="lesson-card__desc">Monte sua rotina semanal de 5 minutos para manter tudo sob controle.</p>
              </div>
            </div>
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-5.png" alt="Aula 5 — Otimização Avançada" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 5</span>
                <h4 class="lesson-card__title">Otimização Avançada</h4>
                <p class="lesson-card__desc">Automatizações e dicas de produtividade para gerenciar tudo em segundos.</p>
              </div>
            </div>
            <div class="lesson-card">
              <div class="lesson-card__img-wrapper">
                <img src="assets/aula-6.png" alt="Aula 6 — Planejamento Anual" class="lesson-card__img" loading="lazy" />
              </div>
              <div class="lesson-card__info">
                <span class="lesson-card__number">Aula 6</span>
                <h4 class="lesson-card__title">Planejamento Anual</h4>
                <p class="lesson-card__desc">Visão de longo prazo, controle anual de gastos e metas para o futuro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ PRICING ═══════ -->
      <section class="results-section">
        <div class="results-section__inner">
          <div class="section-badge reveal-blur">
            <span class="badge-shine badge-shine--section">💎 Investimento</span>
          </div>
          <h2 class="section-title heading-fade reveal-blur">
            Comece a transformação hoje
          </h2>

          <div class="pricing-premium-wrapper reveal-blur">
            <div class="pricing-glass">
              <div class="pricing-glass__inner">
                <div class="pricing-glass__grid"></div>
                <div class="pricing-glass__glow"></div>

                <div class="pricing-glass__badge">
                  <span class="badge-shine badge-shine--pricing">MAIS POPULAR</span>
                </div>

                <div class="pricing-glass__content">
                  <h3 class="pricing-glass__name">Hermes Wallet Premium</h3>
                  <div class="pricing-glass__old">De <s>R$ 97,00</s></div>
                  <div class="pricing-glass__price-row">
                    <span class="pricing-glass__currency">R$</span>
                    <span class="pricing-glass__value">25</span>
                    <span class="pricing-glass__cents">,00</span>
                  </div>
                  <div class="pricing-glass__period">pagamento único • acesso vitalício</div>

                  <ul class="pricing-glass__features">
                    <li><span class="feature-check">✓</span> Sistema financeiro completo no Notion</li>
                    <li><span class="feature-check">✓</span> Videoaulas passo a passo</li>
                    <li><span class="feature-check">✓</span> Dashboard com alertas inteligentes</li>
                    <li><span class="feature-check">✓</span> Metas visuais e progresso mensal</li>
                    <li><span class="feature-check">✓</span> Simulador de investimentos</li>
                    <li><span class="feature-check">✓</span> Acesso imediato via plataforma Kiwify</li>
                    <li><span class="feature-check">✓</span> Atualizações gratuitas para sempre</li>
                  </ul>

                  <a
                    id="btn-checkout-pricing"
                    href="${CHECKOUT_URL}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn-primary btn-glow"
                    style="text-decoration: none; display: flex;"
                  >
                    Garantir Meu Acesso <span class="btn-arrow">→</span>
                  </a>
                </div>
              </div>
              <div class="pricing-glass__border"></div>
              <svg class="pricing-glass__shine" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="pricingShine" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="transparent"/>
                    <stop offset="8%" stop-color="transparent"/>
                    <stop offset="15%" stop-color="rgba(201,168,76,0.2)"/>
                    <stop offset="30%" stop-color="rgba(232,197,71,0.4)"/>
                    <stop offset="36%" stop-color="rgba(201,168,76,0.2)"/>
                    <stop offset="50%" stop-color="transparent"/>
                    <stop offset="100%" stop-color="transparent"/>
                  </linearGradient>
                  <clipPath id="pricingTopClip">
                    <rect x="0" y="0" width="100%" height="25"/>
                  </clipPath>
                </defs>
                <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="24" ry="24" fill="none" stroke="url(#pricingShine)" stroke-width="1.5" clip-path="url(#pricingTopClip)"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ GUARANTEE ═══════ -->
      <section class="results-section">
        <div class="results-section__inner">
          <div class="guarantee-premium reveal-blur">
            <span class="guarantee-premium__icon">🛡️</span>
            <h3 class="guarantee-premium__title">Garantia Incondicional de 7 Dias</h3>
            <p class="guarantee-premium__text">
              Teste o Hermes Wallet por 7 dias completos. Se por qualquer motivo
              você não ficar satisfeito, devolvemos 100% do seu investimento
              — sem perguntas, sem burocracia.
            </p>
            <div class="guarantee-premium__badges">
              <span class="guarantee-premium__badge">🔒 Compra Segura</span>
              <span class="guarantee-premium__badge">⚡ Acesso Imediato</span>
              <span class="guarantee-premium__badge">💯 Satisfação Garantida</span>
            </div>
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ FAQ ═══════ -->
      <section class="results-section">
        <div class="results-section__inner">
          <div class="section-badge reveal-blur">
            <span class="badge-shine badge-shine--section">❓ Dúvidas Frequentes</span>
          </div>
          <h2 class="section-title heading-fade reveal-blur">
            Perguntas Frequentes
          </h2>

          <div class="faq-premium">
            ${faqHTML}
          </div>
        </div>
      </section>

      <div class="section-divider"></div>

      <!-- ═══════ FINAL CTA ═══════ -->
      <section class="final-cta--premium">
        ${lightRaysHTML}
        <div class="results-section__inner" style="position: relative; z-index: 10;">
          <h2 class="final-cta__heading reveal-blur">
            Pronto para <span class="gradient-text">retomar o controle</span> das suas finanças?
          </h2>

          <div class="cta-group reveal-blur">
            <a
              id="btn-checkout-final"
              href="${CHECKOUT_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary btn-glow btn-cta"
              style="text-decoration: none; display: flex;"
            >
              Quero Organizar Minhas Finanças →
            </a>
          </div>

          <span class="final-cta__urgency reveal-blur">⚡ Oferta por tempo limitado</span>
          <p class="final-cta__disclaimer reveal-blur">
            Após o pagamento, você terá acesso imediato à plataforma com as aulas e o sistema pronto para usar.
          </p>
        </div>
      </section>

    </div>
  `);

  // ── Bind: checkout_initiated (all CTA buttons) ──
  document.querySelectorAll('[id^="btn-checkout"]').forEach(btn => {
    btn.addEventListener("click", () => {
      pushDataLayer({ event: "checkout_initiated" });
    });
  });

  // ── IntersectionObserver: scroll-reveal with blur ──
  const scrollRoot = document.querySelector(".quiz-wrapper");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px", root: scrollRoot });

  // Small delay to let layout settle
  requestAnimationFrame(() => {
    document.querySelectorAll(".reveal-blur").forEach(el => {
      revealObserver.observe(el);
    });
  });

  // ── Mouse spotlight for glassmorphism cards ──
  document.querySelectorAll(".card-glass").forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    });
  });

  // ── Initialize Horizontal Carousels ──
  initCarousel("testimonials-carousel");
  initCarousel("lessons-carousel");

  // ── Mover rodapé de compliance para dentro do container rolável para evitar que fique inacessível ──
  const footer = document.querySelector(".compliance-footer");
  if (footer && scrollRoot) {
    scrollRoot.appendChild(footer);
  }
}

/**
 * Inicializa um carrossel horizontal de largura total com:
 * 1. Auto-scroll lento contínuo
 * 2. Pausa ao passar o mouse ou interagir
 * 3. Clique e arraste (mouse drag) no desktop
 * 4. Toque e arraste (touch swipe) no celular
 * @param {string} trackId - ID do elemento .carousel-track
 */
function initCarousel(trackId) {
  const track = document.getElementById(trackId);
  if (!track) return;

  // Duplicar conteúdo para loop infinito
  track.innerHTML += track.innerHTML;

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoScrollActive = true;
  let scrollSpeed = 0.45; // Velocidade bem lenta e suave
  let scrollPos = track.scrollLeft;

  // Como duplicamos, a largura real do conteúdo original é exatamente metade
  let halfWidth = track.scrollWidth / 2;

  // Atualizar halfWidth em caso de resize
  window.addEventListener("resize", () => {
    halfWidth = track.scrollWidth / 2;
  });

  // Função auxiliar para manter o scroll infinito perfeitamente em loop
  function getInfinitePos(pos) {
    if (halfWidth === 0) return pos;
    return (pos % halfWidth + halfWidth) % halfWidth;
  }

  // Interação do Mouse: Arrastar
  track.addEventListener("mousedown", (e) => {
    isDown = true;
    track.classList.add("active");
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    autoScrollActive = false;
  });

  track.addEventListener("mouseleave", () => {
    isDown = false;
    track.classList.remove("active");
    autoScrollActive = true;
  });

  track.addEventListener("mouseup", () => {
    isDown = false;
    track.classList.remove("active");
    setTimeout(() => {
      if (!isDown) autoScrollActive = true;
    }, 1200);
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.3;
    let newScroll = scrollLeft - walk;
    newScroll = getInfinitePos(newScroll);
    track.scrollLeft = newScroll;
    scrollPos = newScroll;
  });

  // Interação de Toque (Mobile Swipe)
  track.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    autoScrollActive = false;
  }, { passive: true });

  track.addEventListener("touchend", () => {
    isDown = false;
    setTimeout(() => {
      if (!isDown) autoScrollActive = true;
    }, 1200);
  }, { passive: true });

  track.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = (x - startX) * 1.3;
    let newScroll = scrollLeft - walk;
    newScroll = getInfinitePos(newScroll);
    track.scrollLeft = newScroll;
    scrollPos = newScroll;
  }, { passive: true });

  track.addEventListener("mouseenter", () => {
    if (!isDown) autoScrollActive = false;
  });

  track.addEventListener("mouseleave", () => {
    if (!isDown) autoScrollActive = true;
  });

  // Loop de Auto-Scroll Suave Contínuo
  function autoScrollLoop() {
    if (autoScrollActive && !isDown) {
      scrollPos += scrollSpeed;
      scrollPos = getInfinitePos(scrollPos);
      track.scrollLeft = scrollPos;
    } else {
      scrollPos = track.scrollLeft;
    }
    requestAnimationFrame(autoScrollLoop);
  }

  requestAnimationFrame(autoScrollLoop);
}

// ─── HANDLERS ───────────────────────────────────────────────────

/** Inicia o quiz → dispara quiz_started */
function handleStart() {
  pushDataLayer({ event: "quiz_started" });
  currentIndex = 0;
  selectedOption = null;
  answers.length = 0;
  viewedSteps.clear();
  renderStep();
}

/** Confirma resposta e avança (trava anti-burlar) */
function handleNext() {
  const current = STEPS[currentIndex];
  const stepNumber = currentIndex + 1;

  // Para tipos interativos, exige seleção
  const requiresSelection = ["question", "pill", "star_rating"];
  if (requiresSelection.includes(current.type) && selectedOption === null) return;

  // Evento: step completado
  pushDataLayer({
    event: "quiz_step_completed",
    quiz_step: stepNumber,
    quiz_step_type: current.type,
    quiz_answer: selectedOption,
  });

  // Salva resposta (para tipos que coletam dados)
  if (requiresSelection.includes(current.type)) {
    answers.push({ step: stepNumber, type: current.type, answer: selectedOption });
  }

  // Última etapa?
  if (currentIndex + 1 >= STEPS.length) {
    pushDataLayer({
      event: "quiz_completed",
      quiz_answers: [...answers],
    });
    selectedOption = null;
    renderLoading();
  } else {
    currentIndex++;
    selectedOption = null;
    renderStep();
  }
}

// ─── BOOT BLINDADO ──────────────────────────────────────────────
// Use ?direct=1 na URL ou acesse via oferta.html para pular direto à landing page
function bootQuiz() {
  const params = new URLSearchParams(window.location.search);
  const isDirectPage = window.location.pathname.includes("oferta");

  if (params.get("direct") === "1" || isDirectPage) {
    pushDataLayer({ event: "direct_landing", source: params.get("utm_source") || "unknown" });
    renderResult();
    return;
  }

  renderIntro();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootQuiz);
} else {
  bootQuiz();
}

// ─── MODAIS DE COMPLIANCE (Termos & Privacidade) ────────────────

const COMPLIANCE_CONTENT = {
  termos: {
    title: "Termos de Uso",
    body: `
      <h4>1. Natureza do Serviço</h4>
      <p>O diagnóstico gerado pelo Quiz Financeiro Hermes Wallet é uma ferramenta de caráter <strong>exclusivamente informativo e educativo</strong>. Ele NÃO constitui aconselhamento financeiro, consultoria de investimentos, recomendação de produtos financeiros ou promessa de retorno financeiro de qualquer natureza.</p>

      <h4>2. Isenção de Responsabilidade</h4>
      <p>A Arche Labs não se responsabiliza por quaisquer decisões financeiras, investimentos, aquisições ou ações tomadas pelo usuário com base nas informações, diagnósticos ou recomendações apresentadas pela ferramenta. O uso das informações fornecidas é de <strong>inteira responsabilidade do usuário</strong>.</p>
      <p>Em nenhuma hipótese a Arche Labs será responsável por danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso desta ferramenta.</p>

      <h4>3. Propriedade Intelectual</h4>
      <p>Todo o conteúdo, design, lógica de funcionamento do quiz, textos, gráficos e a marca <strong>Hermes Wallet</strong> são propriedade intelectual exclusiva da <strong>Arche Labs</strong>. É expressamente proibida a reprodução, cópia, distribuição ou utilização não autorizada, total ou parcial, de qualquer elemento deste site sem prévia autorização por escrito da Arche Labs.</p>

      <h4>4. Alterações nos Termos</h4>
      <p>A Arche Labs reserva-se o direito de alterar estes Termos de Uso a qualquer momento, sem aviso prévio. O uso continuado da ferramenta após qualquer modificação constitui aceitação dos novos termos.</p>

      <p style="margin-top: 20px; color: var(--text-muted); font-size: 12px;">Última atualização: maio de 2026.</p>
    `,
  },
  privacidade: {
    title: "Políticas de Privacidade",
    body: `
      <h4>1. Dados Coletados</h4>
      <p>Coletamos dados de interação durante o uso do Quiz Financeiro, incluindo suas respostas às perguntas e padrões de navegação. Esses dados são utilizados exclusivamente para <strong>personalizar sua experiência</strong>, gerar seu diagnóstico financeiro e aprimorar continuamente nosso sistema.</p>

      <h4>2. Ferramentas de Análise e Marketing</h4>
      <p>Utilizamos ferramentas de análise e marketing digital, incluindo o <strong>Meta/Facebook Pixel</strong> e o <strong>Google Tag Manager (GTM)</strong>, para fins de remarketing, mensuração de conversão e otimização de campanhas publicitárias. Essas ferramentas podem coletar dados de navegação através de cookies e tecnologias similares.</p>

      <h4>3. Compartilhamento de Dados</h4>
      <p>Seus dados pessoais não são vendidos, alugados ou cedidos a terceiros. O compartilhamento ocorre exclusivamente com as plataformas de análise mencionadas acima, nos limites necessários para o funcionamento das ferramentas de marketing.</p>

      <h4>4. Seus Direitos</h4>
      <p>Você tem o direito de solicitar a <strong>exclusão de qualquer dado pessoal</strong> coletado a qualquer momento. Para exercer esse direito, envie um e-mail para <a href="mailto:suporte@archelabs.vip">suporte@archelabs.vip</a> com o assunto "Exclusão de Dados" e atenderemos sua solicitação no prazo de até 15 dias úteis.</p>

      <h4>5. Alterações nesta Política</h4>
      <p>A Arche Labs pode atualizar esta Política de Privacidade periodicamente. Recomendamos que você a consulte regularmente para se manter informado sobre como protegemos suas informações.</p>

      <p style="margin-top: 20px; color: var(--text-muted); font-size: 12px;">Última atualização: maio de 2026.</p>
    `,
  },
};

/** Injeta o container do modal no DOM (uma única vez) */
function injectComplianceModal() {
  if (document.getElementById("compliance-modal")) return;
  const overlay = document.createElement("div");
  overlay.id = "compliance-modal";
  overlay.className = "compliance-modal-overlay";
  overlay.innerHTML = `
    <div class="compliance-modal-card">
      <div class="compliance-modal-header">
        <h3 id="compliance-modal-title"></h3>
        <button class="compliance-modal-close" onclick="closeComplianceModal()" aria-label="Fechar">&times;</button>
      </div>
      <div class="compliance-modal-body" id="compliance-modal-body"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Fechar ao clicar no backdrop
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeComplianceModal();
  });

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeComplianceModal();
  });
}

/** Abre o modal de compliance */
function openComplianceModal(key) {
  injectComplianceModal();
  const data = COMPLIANCE_CONTENT[key];
  if (!data) return;
  document.getElementById("compliance-modal-title").textContent = data.title;
  document.getElementById("compliance-modal-body").innerHTML = data.body;
  document.getElementById("compliance-modal").classList.add("open");
  document.body.style.overflow = "hidden";
}

/** Fecha o modal de compliance */
function closeComplianceModal() {
  const modal = document.getElementById("compliance-modal");
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}
