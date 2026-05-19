import { useState, useEffect, useCallback, useRef } from "react";

/* =============================================
   DADOS MOCKADOS — Substitua pelo array real
   ============================================= */
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

/* =============================================
   HELPER — Push seguro para o dataLayer
   ============================================= */
function pushDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...payload });
}

/* =============================================
   COMPONENTE PRINCIPAL
   ============================================= */
export default function QuizHermesWallet() {
  // --- ESTADOS GLOBAIS ---
  const [phase, setPhase] = useState("intro"); // intro | questions | loading | result
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Ref para evitar disparo duplicado de quiz_step_viewed por re-render
  const viewedStepsRef = useRef(new Set());

  /* -----------------------------------------
     EFEITO: Dispara quiz_step_viewed ao
     renderizar cada nova pergunta
     ----------------------------------------- */
  useEffect(() => {
    if (phase !== "questions") return;
    const stepNumber = currentIndex + 1;
    if (viewedStepsRef.current.has(stepNumber)) return;
    viewedStepsRef.current.add(stepNumber);

    pushDataLayer({
      event: "quiz_step_viewed",
      quiz_step: stepNumber,
      quiz_total_steps: QUESTIONS.length,
    });
  }, [phase, currentIndex]);

  /* -----------------------------------------
     EFEITO: Simula loading de 2 s e avança
     para resultado
     ----------------------------------------- */
  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setTimeout(() => setPhase("result"), 2000);
    return () => clearTimeout(timer);
  }, [phase]);

  /* -----------------------------------------
     HANDLER: Iniciar quiz
     ----------------------------------------- */
  const handleStart = useCallback(() => {
    pushDataLayer({ event: "quiz_started" });
    setPhase("questions");
  }, []);

  /* -----------------------------------------
     HANDLER: Selecionar opção (não avança)
     ----------------------------------------- */
  const handleSelect = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  /* -----------------------------------------
     HANDLER: Confirmar resposta e avançar
     ----------------------------------------- */
  const handleNext = useCallback(() => {
    if (selectedOption === null) return;

    const stepNumber = currentIndex + 1;

    // Evento: step completado
    pushDataLayer({
      event: "quiz_step_completed",
      quiz_step: stepNumber,
      quiz_answer: selectedOption,
    });

    const updatedAnswers = [...answers, { step: stepNumber, answer: selectedOption }];
    setAnswers(updatedAnswers);

    // Verifica se era a última pergunta
    if (currentIndex + 1 >= QUESTIONS.length) {
      pushDataLayer({
        event: "quiz_completed",
        quiz_answers: updatedAnswers,
      });
      setPhase("loading");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }

    setSelectedOption(null);
  }, [selectedOption, currentIndex, answers]);

  /* -----------------------------------------
     HANDLER: Botão de checkout
     ----------------------------------------- */
  const handleCheckout = useCallback(() => {
    pushDataLayer({ event: "checkout_initiated" });
  }, []);

  /* =============================================
     RENDER POR FASE
     ============================================= */

  // ---- INTRO ----
  if (phase === "intro") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
        <div className="max-w-lg text-center text-white">
          <h1 className="mb-4 text-3xl font-bold">Quiz Financeiro</h1>
          <p className="mb-8 text-gray-400">
            Descubra o seu perfil financeiro em menos de 1 minuto e receba uma
            recomendação personalizada para organizar suas finanças.
          </p>
          <button
            onClick={handleStart}
            className="rounded-lg bg-emerald-500 px-8 py-3 font-semibold text-white transition hover:bg-emerald-600"
          >
            Iniciar Quiz
          </button>
        </div>
      </div>
    );
  }

  // ---- PERGUNTAS ----
  if (phase === "questions") {
    const current = QUESTIONS[currentIndex];
    const stepLabel = `${currentIndex + 1} / ${QUESTIONS.length}`;

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
        <div className="w-full max-w-xl text-white">
          {/* Progresso */}
          <div className="mb-6">
            <div className="mb-1 flex justify-between text-sm text-gray-400">
              <span>Pergunta {stepLabel}</span>
              <span>
                {Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Pergunta */}
          <h2 className="mb-6 text-xl font-semibold">{current.question}</h2>

          {/* Opções */}
          <div className="mb-6 flex flex-col gap-3">
            {current.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`rounded-lg border px-4 py-3 text-left transition ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-500"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Botão Avançar — desabilitado até selecionar */}
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`w-full rounded-lg px-6 py-3 font-semibold transition ${
              selectedOption === null
                ? "cursor-not-allowed bg-gray-700 text-gray-500"
                : "bg-emerald-500 text-white hover:bg-emerald-600"
            }`}
          >
            {currentIndex + 1 >= QUESTIONS.length
              ? "Finalizar Quiz"
              : "Próxima Pergunta"}
          </button>
        </div>
      </div>
    );
  }

  // ---- LOADING ----
  if (phase === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white">
        {/* Spinner rudimentar */}
        <div className="mb-6 h-12 w-12 animate-spin rounded-full border-4 border-gray-700 border-t-emerald-500" />
        <p className="text-lg font-medium">Analisando suas respostas…</p>
        <p className="mt-2 text-sm text-gray-500">
          Aguarde enquanto geramos seu diagnóstico personalizado.
        </p>
      </div>
    );
  }

  // ---- RESULTADO ----
  if (phase === "result") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-950 p-4">
        <div className="max-w-lg text-center text-white">
          <h2 className="mb-2 text-2xl font-bold">Seu Diagnóstico Está Pronto!</h2>
          <p className="mb-6 text-gray-400">
            Com base nas suas respostas, identificamos que você precisa de um
            sistema financeiro completo para retomar o controle do seu dinheiro.
          </p>

          <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900 p-6 text-left">
            <h3 className="mb-2 text-lg font-semibold text-emerald-400">
              📊 Template Hermes Wallet
            </h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>✅ Controle completo de receitas e despesas</li>
              <li>✅ Dashboard visual automático</li>
              <li>✅ Metas financeiras com acompanhamento</li>
              <li>✅ Planejamento de investimentos integrado</li>
            </ul>
          </div>

          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCheckout}
            className="inline-block w-full rounded-lg bg-emerald-500 px-8 py-4 text-lg font-bold text-white transition hover:bg-emerald-600"
          >
            Quero Organizar Minhas Finanças →
          </a>

          <p className="mt-4 text-xs text-gray-600">
            Você será redirecionado para o checkout seguro da Kiwify.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
