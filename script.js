/* =============================================
   Quiz Hermes Wallet — Vanilla JS (ES6+)
   Tradução 1:1 do componente React QuizHermesWallet.jsx
   ============================================= */

// ─── DADOS MOCKADOS ─────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1,
    question: "Como você descreveria o controle atual das suas finanças pessoais?",
    options: [
      "Não tenho nenhum controle, gasto sem acompanhar",
      "Anoto algumas coisas, mas sem método definido",
      "Uso planilha ou app, porém sem consistência",
      "Tenho um sistema organizado que sigo todo mês",
    ],
  },
  {
    id: 2,
    question: "Qual é o seu maior desafio financeiro hoje?",
    options: [
      "Não consigo guardar dinheiro no fim do mês",
      "Tenho dívidas acumuladas e não sei por onde começar",
      "Ganho bem, mas o dinheiro some sem eu perceber",
      "Quero investir, mas não sei como organizar meu caixa",
    ],
  },
  {
    id: 3,
    question: "Se você tivesse uma ferramenta para organizar suas finanças, o que ela deveria resolver primeiro?",
    options: [
      "Mostrar para onde meu dinheiro está indo",
      "Criar um plano para sair das dívidas",
      "Automatizar o controle mensal de receitas e despesas",
      "Ajudar a definir metas e acompanhar o progresso",
    ],
  },
];

const CHECKOUT_URL = "https://pay.kiwify.com.br/chCm1MZ";

// ─── ESTADO GLOBAL ──────────────────────────────────────────────
let phase = "intro";          // intro | questions | loading | result
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
            Descubra o seu perfil financeiro em menos de 1 minuto e receba uma
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

// ─────────────────── TELA: PERGUNTAS ────────────────────────────
function renderQuestions() {
  phase = "questions";

  const current = QUESTIONS[currentIndex];
  const stepNumber = currentIndex + 1;
  const total = QUESTIONS.length;
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

  // Monta as opções
  const optionsHTML = current.options
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

  mount(/* html */ `
    <div class="quiz-wrapper">
      <!-- Progresso -->
      <div class="progress-container">
        <div class="progress-bar" style="width: ${pct}%"></div>
      </div>
      <div class="progress-text">Pergunta ${stepNumber} / ${total}</div>

      <div class="step active">
        <div class="step-content">
          <!-- Cabeçalho da pergunta -->
          <div class="step-header">
            <span class="step-number">Pergunta ${stepNumber} de ${total}</span>
            <h2 class="step-title">${current.question}</h2>
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
        </div>
      </div>
    </div>
  `);

  // ── Bind: seleção de opção ──
  document.querySelectorAll(".option-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove seleção anterior
      document.querySelectorAll(".option-card").forEach((b) => {
        b.classList.remove("selected");
      });

      // Marca a opção clicada
      btn.classList.add("selected");

      selectedOption = current.options[parseInt(btn.dataset.index, 10)];

      // Habilita o botão Avançar
      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("hidden");
    });
  });

  // ── Bind: avançar ──
  document.getElementById("btn-next").addEventListener("click", handleNext);
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
  renderQuestions();
}

/** Confirma resposta e avança (trava anti-burlar) */
function handleNext() {
  if (selectedOption === null) return; // trava de segurança

  const stepNumber = currentIndex + 1;

  // Evento: step completado
  pushDataLayer({
    event: "quiz_step_completed",
    quiz_step: stepNumber,
    quiz_answer: selectedOption,
  });

  answers.push({ step: stepNumber, answer: selectedOption });

  // Última pergunta?
  if (currentIndex + 1 >= QUESTIONS.length) {
    pushDataLayer({
      event: "quiz_completed",
      quiz_answers: [...answers],
    });
    selectedOption = null;
    renderLoading();
  } else {
    currentIndex++;
    selectedOption = null;
    renderQuestions();
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
