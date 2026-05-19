/* =============================================
   Quiz Hermes Wallet — Vanilla JS (ES6+)
   Render Engine com suporte a tipos mistos:
   'question' | 'video' | 'review'
   ============================================= */

// ─── DADOS DO FUNIL ─────────────────────────────────────────────
const STEPS = [
  {
    id: 1,
    type: "question",
    question: "Você sabe exatamente para onde cada centavo do seu salário vai todo mês?",
    options: [
      "Não faço ideia, o dinheiro simplesmente some",
      "Tenho uma noção vaga, mas nunca anotei direito",
      "Sei mais ou menos, porém sempre estouro o orçamento",
      "Sim, acompanho tudo com planilha ou aplicativo",
    ],
  },
  {
    id: 2,
    type: "question",
    question: "Como está a sua relação com dívidas hoje?",
    options: [
      "Estou afundado e não sei nem por onde começar a pagar",
      "Tenho parcelas que apertam, mas vou empurrando com a barriga",
      "Já quitei tudo, porém volta e meia me endivido de novo",
      "Não tenho dívidas e consigo manter o controle",
    ],
  },
  {
    id: 3,
    type: "question",
    question: "Quando você pensa em investir dinheiro, qual sentimento vem primeiro?",
    options: [
      "Paralisia total — não entendo nada e tenho medo de perder",
      "Curiosidade, mas falta sobra no mês para aplicar qualquer valor",
      "Já tentei, porém não tive consistência e parei",
      "Invisto com frequência e tenho uma estratégia definida",
    ],
  },
  {
    id: 4,
    type: "question",
    question: "Como é a sensação na última semana do mês na sua casa?",
    options: [
      "Desespero: conto moedas e rezo para nenhum boleto vencer",
      "Aperto: vivo no limite e qualquer imprevisto é uma crise",
      "Neutro: pago as contas, mas não sobra nada para o futuro",
      "Tranquilidade: tudo está planejado e já reservei minha poupança",
    ],
  },
  {
    id: 5,
    type: "question",
    question: "Qual destas frases mais se parece com algo que você já disse?",
    options: [
      '"Ganho bem, mas não sei para onde vai meu dinheiro"',
      '"Sempre prometo que vou organizar… mas nunca começo"',
      '"Já tentei planilha, app, caderninho… nada funciona pra mim"',
      '"Preciso de um método simples que eu consiga manter"',
    ],
  },
  {
    id: 6,
    type: "question",
    question: "Se um gasto inesperado de R$ 500 surgisse agora, o que aconteceria?",
    options: [
      "Caos total: teria que pedir emprestado ou usar crédito rotativo",
      "Pagaria, mas comprometeria outras contas do mês",
      "Usaria minha reserva, porém ficaria desconfortável",
      "Tranquilo: minha reserva de emergência cobre isso e muito mais",
    ],
  },
  {
    id: 7,
    type: "question",
    question: "O que te impede de ter a vida financeira que você quer?",
    options: [
      "Falta de organização: não tenho um sistema que funcione",
      "Falta de disciplina: gasto por impulso e me arrependo depois",
      "Falta de conhecimento: ninguém me ensinou a lidar com dinheiro",
      "Falta de ferramenta: preciso de algo prático e visual",
    ],
  },
  {
    id: 8,
    type: "question",
    question: "Imagine ter um painel que mostra sua saúde financeira em tempo real. Qual recurso te animaria mais?",
    options: [
      "Visão total de receitas, despesas e saldo em uma só tela",
      "Alertas automáticos quando estou perto de estourar o limite",
      "Planejador de metas com progresso visual mês a mês",
      "Simulador de investimentos integrado ao meu orçamento",
    ],
  },
  {
    id: 9,
    type: "video",
    title: "📊 Veja como o Hermes Wallet revelou o diagnóstico de milhares de brasileiros",
    subtitle: "Assista ao vídeo de 1 minuto e entenda o que as suas respostas dizem sobre o seu perfil financeiro.",
    buttonText: "Avançar para o Diagnóstico",
  },
  {
    id: 10,
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
        text: "Meu dinheiro sumia e eu não sabia explicar pra onde ia. O dashboard me mostrou que eu gastava R$ 800/mês em delivery sem perceber. Hoje invisto esse valor todo mês.",
      },
    ],
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
          <h1 class="welcome-title">Quiz Financeiro</h1>
          <p class="welcome-subtitle">
            Descubra o seu perfil financeiro em menos de 2 minutos e receba uma
            recomendação personalizada para organizar suas finanças.
          </p>
          <button
            id="btn-start"
            class="btn-primary btn-glow"
          >
            Iniciar Quiz
          </button>
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
      quiz_total_steps: total,
    });
  }

  // ── Gera o HTML interno conforme o type ──
  let innerHTML = "";

  switch (current.type) {
    case "question":
      innerHTML = buildQuestionHTML(current, stepNumber, total);
      break;
    case "video":
      innerHTML = buildVideoHTML(current);
      break;
    case "review":
      innerHTML = buildReviewHTML(current);
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
  if (current.type === "question") {
    bindQuestionEvents(current);
  }

  // Bind do botão avançar (presente em todos os tipos)
  const btnNext = document.getElementById("btn-next");
  if (btnNext) {
    btnNext.addEventListener("click", handleNext);
  }
}

// ─────────────────── BUILDER: QUESTION ──────────────────────────
function buildQuestionHTML(step, stepNumber, total) {
  const optionsHTML = step.options
    .map(
      (opt, idx) => `
      <button
        class="option-card"
        data-index="${idx}"
      >
        <span class="card-label">${opt}</span>
      </button>`
    )
    .join("");

  const isLast = stepNumber >= total;

  return /* html */ `
    <!-- Cabeçalho da pergunta -->
    <div class="step-header">
      <span class="step-number">Pergunta ${stepNumber} de ${total}</span>
      <h2 class="step-title">${step.question}</h2>
    </div>

    <!-- Opções -->
    <div class="options-grid grid-2x2" id="options-container">
      ${optionsHTML}
    </div>

    <!-- Botão Avançar (inicia oculto) -->
    <button
      id="btn-next"
      disabled
      class="btn-continue hidden"
    >
      ${isLast ? "Finalizar Quiz" : "Próxima Pergunta"}
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
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#0a0e17">
            <polygon points="6,3 20,12 6,21" />
          </svg>
        </div>
        <span class="video-title-overlay">Clique para assistir</span>
      </div>
    </div>

    <!-- Botão Avançar (nasce HABILITADO) -->
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
      <div class="testimonial-card">
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

    <!-- Botão Avançar (nasce HABILITADO) -->
    <button
      id="btn-next"
      class="btn-continue"
    >
      ${step.buttonText}
    </button>
  `;
}

// ─────────────────── BIND: QUESTION EVENTS ──────────────────────
function bindQuestionEvents(step) {
  document.querySelectorAll(".option-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove seleção anterior
      document.querySelectorAll(".option-card").forEach((b) => {
        b.classList.remove("selected");
      });

      // Marca a opção clicada
      btn.classList.add("selected");

      selectedOption = step.options[parseInt(btn.dataset.index, 10)];

      // Habilita o botão Avançar
      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("hidden");
    });
  });
}

// ─────────────────── TELA: LOADING ──────────────────────────────
function renderLoading() {
  phase = "loading";

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
          <p class="step-subtitle">
            Aguarde enquanto geramos seu diagnóstico personalizado.
          </p>
        </div>
      </div>
    </div>
  `);

  // Simula 2 s de loading e avança para resultado
  setTimeout(() => {
    renderResult();
  }, 2000);
}

// ─────────────────── TELA: RESULTADO ────────────────────────────
function renderResult() {
  phase = "result";

  mount(/* html */ `
    <div class="quiz-wrapper">
      <div class="step active">
        <div class="results-screen">
          <div class="result-hero">
            <h2 class="result-headline">Seu Diagnóstico Está Pronto!</h2>
            <p class="result-subheadline">
              Com base nas suas respostas, identificamos que você precisa de um
              sistema financeiro completo para retomar o controle do seu dinheiro.
            </p>
          </div>

          <div class="benefit-card" style="margin-bottom: 32px;">
            <h3 class="benefit-icon">📊</h3>
            <h3 style="color: var(--accent-1); margin-bottom: 8px; font-size: 18px; font-weight: 700;">
              Template Hermes Wallet
            </h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px;">
              <li style="font-size: 14px; color: var(--text-secondary);">✅ Controle completo de receitas e despesas</li>
              <li style="font-size: 14px; color: var(--text-secondary);">✅ Dashboard visual automático</li>
              <li style="font-size: 14px; color: var(--text-secondary);">✅ Metas financeiras com acompanhamento</li>
              <li style="font-size: 14px; color: var(--text-secondary);">✅ Planejamento de investimentos integrado</li>
            </ul>
          </div>

          <div class="final-cta">
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

  // Para tipo 'question', exige seleção
  if (current.type === "question" && selectedOption === null) return;

  // Evento: step completado
  pushDataLayer({
    event: "quiz_step_completed",
    quiz_step: stepNumber,
    quiz_step_type: current.type,
    quiz_answer: current.type === "question" ? selectedOption : null,
  });

  // Salva resposta (para questions)
  if (current.type === "question") {
    answers.push({ step: stepNumber, answer: selectedOption });
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
function bootQuiz() {
  renderIntro();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootQuiz);
} else {
  bootQuiz();
}
