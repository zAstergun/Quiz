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

// ─────────────────── TELA: RESULTADO ────────────────────────────
function renderResult() {
  phase = "result";

  mount(/* html */ `
    <div class="quiz-wrapper">
      <div class="step active">
        <div class="results-screen">
          <div class="result-hero">
            <span class="result-badge animate-pop">🎯</span>
            <h2 class="result-headline">Seu Diagnóstico Está Pronto!</h2>
            <p class="result-subheadline">
              Com base nas suas respostas, identificamos que você precisa de um
              sistema financeiro completo para retomar o controle do seu dinheiro.
            </p>
          </div>

          <div class="benefits-section">
            <h2 class="section-title">O que o <span class="gradient-text">Hermes Wallet</span> vai fazer por você</h2>
            <div class="benefits-grid">
              <div class="benefit-card animate-slide-up">
                <div class="benefit-icon">📊</div>
                <h3>Dashboard Completo</h3>
                <p>Visão total de receitas, despesas e saldo — tudo atualizado em tempo real, sem complicação.</p>
              </div>
              <div class="benefit-card animate-slide-up delay-1">
                <div class="benefit-icon">🎯</div>
                <h3>Metas Inteligentes</h3>
                <p>Defina objetivos financeiros e acompanhe o progresso com gráficos visuais mês a mês.</p>
              </div>
              <div class="benefit-card animate-slide-up delay-2">
                <div class="benefit-icon">🔔</div>
                <h3>Alertas Automáticos</h3>
                <p>Receba avisos antes de estourar limites. Nunca mais seja pego de surpresa.</p>
              </div>
              <div class="benefit-card animate-slide-up delay-3">
                <div class="benefit-icon">💰</div>
                <h3>Planejador de Investimentos</h3>
                <p>Simulador integrado que mostra quanto investir a partir do que sobra no seu orçamento.</p>
              </div>
            </div>
          </div>

          <div class="final-cta">
            <h2>Pronto para <span class="gradient-text">retomar o controle</span>?</h2>
            <a
              id="btn-checkout"
              href="${CHECKOUT_URL}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary btn-glow btn-cta"
              style="text-decoration: none; width: 100%; display: flex;"
            >
              Quero Organizar Minhas Finanças →
            </a>
            <p class="final-urgency">⚡ Oferta por tempo limitado</p>
            <p class="welcome-disclaimer">
              Você será redirecionado para o checkout seguro da Kiwify.
            </p>
          </div>
        </div>
      </div>
    </div>
  `);

  // ── Bind: checkout_initiated ──
  document.getElementById("btn-checkout").addEventListener("click", () => {
    pushDataLayer({ event: "checkout_initiated" });
  });
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
