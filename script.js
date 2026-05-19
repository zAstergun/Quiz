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
    <div class="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div class="max-w-lg text-center text-white">
        <h1 class="mb-4 text-3xl font-bold">Quiz Financeiro</h1>
        <p class="mb-8 text-gray-400">
          Descubra o seu perfil financeiro em menos de 1 minuto e receba uma
          recomendação personalizada para organizar suas finanças.
        </p>
        <button
          id="btn-start"
          class="rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Iniciar Quiz
        </button>
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
        class="quiz-option rounded-lg border px-4 py-3 text-left transition
               border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500"
        data-index="${idx}"
      >
        ${opt}
      </button>`
    )
    .join("");

  const isLast = stepNumber >= total;

  mount(/* html */ `
    <div class="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div class="w-full max-w-xl text-white">
        <!-- Progresso -->
        <div class="mb-6">
          <div class="mb-1 flex justify-between text-sm text-gray-400">
            <span>Pergunta ${stepNumber} / ${total}</span>
            <span>${pct}%</span>
          </div>
          <div class="h-2 w-full overflow-hidden rounded-full bg-gray-800">
            <div
              class="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style="width: ${pct}%"
            ></div>
          </div>
        </div>

        <!-- Pergunta -->
        <h2 class="mb-6 text-xl font-semibold">${current.question}</h2>

        <!-- Opções -->
        <div class="mb-6 flex flex-col gap-3" id="options-container">
          ${optionsHTML}
        </div>

        <!-- Botão Avançar (inicia desabilitado) -->
        <button
          id="btn-next"
          disabled
          class="w-full rounded-lg px-6 py-3 font-semibold transition cursor-not-allowed bg-gray-700 text-gray-500"
        >
          ${isLast ? "Finalizar Quiz" : "Próxima Pergunta"}
        </button>
      </div>
    </div>
  `);

  // ── Bind: seleção de opção ──
  document.querySelectorAll(".quiz-option").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove seleção anterior
      document.querySelectorAll(".quiz-option").forEach((b) => {
        b.classList.remove("border-emerald-500", "bg-emerald-500/20", "text-emerald-300");
        b.classList.add("border-gray-700", "bg-gray-900", "text-gray-300");
      });

      // Marca a opção clicada
      btn.classList.remove("border-gray-700", "bg-gray-900", "text-gray-300");
      btn.classList.add("border-emerald-500", "bg-emerald-500/20", "text-emerald-300");

      selectedOption = current.options[parseInt(btn.dataset.index, 10)];

      // Habilita o botão Avançar
      const nextBtn = document.getElementById("btn-next");
      nextBtn.disabled = false;
      nextBtn.classList.remove("cursor-not-allowed", "bg-gray-700", "text-gray-500");
      nextBtn.classList.add("bg-emerald-500", "text-white", "hover:bg-emerald-600");
    });
  });

  // ── Bind: avançar ──
  document.getElementById("btn-next").addEventListener("click", handleNext);
}

// ─────────────────── TELA: LOADING ──────────────────────────────
function renderLoading() {
  phase = "loading";

  mount(/* html */ `
    <div class="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
      <div class="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-emerald-500"></div>
      <p class="text-lg font-medium">Analisando suas respostas…</p>
      <p class="mt-2 text-sm text-gray-500">
        Aguarde enquanto geramos seu diagnóstico personalizado.
      </p>
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
    <div class="flex min-h-screen items-center justify-center bg-gray-950 p-4">
      <div class="max-w-lg text-center text-white">
        <h2 class="mb-2 text-2xl font-bold">Seu Diagnóstico Está Pronto!</h2>
        <p class="mb-6 text-gray-400">
          Com base nas suas respostas, identificamos que você precisa de um
          sistema financeiro completo para retomar o controle do seu dinheiro.
        </p>

        <div class="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6 text-left">
          <h3 class="mb-2 text-lg font-semibold text-emerald-400">
            📊 Template Hermes Wallet
          </h3>
          <ul class="space-y-1 text-sm text-gray-300">
            <li>✅ Controle completo de receitas e despesas</li>
            <li>✅ Dashboard visual automático</li>
            <li>✅ Metas financeiras com acompanhamento</li>
            <li>✅ Planejamento de investimentos integrado</li>
          </ul>
        </div>

        <a
          id="btn-checkout"
          href="${CHECKOUT_URL}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-block w-full rounded-lg bg-emerald-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-600"
        >
          Quero Organizar Minhas Finanças →
        </a>

        <p class="mt-4 text-xs text-gray-600">
          Você será redirecionado para o checkout seguro da Kiwify.
        </p>
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

// ─── BOOT ───────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderIntro();
});
