import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  User,
  BarChart2,
  Brain
} from "lucide-react";
import { motion } from "framer-motion";
import "./index.css";

const mockInsights = [
  {
    title: "Você gastou mais com delivery do que investiu.",
    description: "Considere rever prioridades para acelerar sua reserva."
  },
  {
    title: "Seu padrão de gastos aumenta após o dia do salário.",
    description: "Tente distribuir melhor seus gastos ao longo do mês."
  },
  {
    title: "Você teria uma reserva de emergência em 8 meses nesse ritmo.",
    description: "Ótimo! Continue assim para garantir segurança financeira."
  },
  {
    title: "Você é um investidor cauteloso, mas emocional em compras rápidas.",
    description: "Busque mais racionalidade em compras por impulso."
  }
];

function App() {
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const analysisSteps = [
    "Analyzing subscriptions...",
    "Mapping spending behavior...",
    "Detecting emotional spending...",
    "Generating financial personality...",
    "Building future projections..."
  ];
  const analysisTimeout = useRef<number | null>(null);

  function handleCsvUpload() {
    setCsvUploaded(true);
    setAnalyzing(true);
    setAnalysisStep(0);
    let step = 0;
    function nextStep() {
      if (step < analysisSteps.length - 1) {
        step++;
        setAnalysisStep(step);
        analysisTimeout.current = setTimeout(nextStep, 1200);
      } else {
        setTimeout(() => {
          setAnalyzing(false);
        }, 1200);
      }
    }
    analysisTimeout.current = setTimeout(nextStep, 1200);
  }

  return (
    <div className="min-h-screen bg-premium-900 text-premium-100 font-sans flex flex-col items-center px-4 py-8">
      {/* Hero */}
      <motion.header className="relative flex flex-col items-center justify-center mb-16 w-full">
        {/* Glow background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
          <div className="w-[480px] h-[320px] md:w-[700px] md:h-[400px] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-emerald-400 via-cyan-400 to-transparent" />
        </div>
        {/* Logo */}
        <div className="z-10 flex flex-col items-center">
          <div className="mb-6">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="url(#logo-gradient)" />
              <path
                d="M18 34C18 27 28 22 28 22C28 22 38 27 38 34C38 38 33 40 28 40C23 40 18 38 18 34Z"
                fill="#fff"
                fillOpacity="0.95"
              />
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0"
                  y1="0"
                  x2="56"
                  y2="56"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34d399" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Badge */}
          <span className="mb-5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium tracking-wide text-emerald-300 shadow shadow-emerald-400/10 uppercase">
            AI Financial Companion
          </span>
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-zinc-100 to-cyan-300 bg-clip-text text-transparent drop-shadow-xl mb-4 text-center leading-tight">
            Explain My Money
          </h1>
          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-zinc-300 text-lg md:text-2xl font-light text-center mb-2 md:mb-4">
            A IA que transforma dados financeiros em clareza, confiança e
            decisões humanas.
          </p>
        </div>
      </motion.header>

      {/* Upload Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="w-full max-w-xl mb-12">
        <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 px-10 py-12 flex flex-col items-center gap-6 overflow-hidden">
          {/* Glow border */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent [box-shadow:0_0_32px_0_rgba(16,185,129,0.18)]"></div>
          <Upload className="w-12 h-12 text-emerald-400 mb-3 drop-shadow-lg" />
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-zinc-100 tracking-tight">
            Importe seu extrato
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-normal mb-4 text-center max-w-md">
            Faça upload do seu arquivo CSV para começar a entender seu dinheiro
            com inteligência artificial.
          </p>
          <label className="cursor-pointer group transition-all">
            <span className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 font-semibold text-base shadow-lg shadow-emerald-400/10 border border-emerald-400/30 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-cyan-400/20 transition-all duration-200">
              <FileText className="w-5 h-5" />
              Selecionar CSV
            </span>
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleCsvUpload}
            />
          </label>
          {csvUploaded && !analyzing && (
            <span className="mt-3 text-emerald-400 text-sm font-medium">
              Arquivo enviado com sucesso!
            </span>
          )}
        </div>
      </motion.div>

      {/* Animação de análise IA */}
      {analyzing ? (
        <motion.div
          key="analyzing"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          className="w-full max-w-xl flex flex-col items-center justify-center py-24 mb-10 relative">
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
            <div className="w-[340px] h-[180px] md:w-[480px] md:h-[220px] rounded-full blur-2xl opacity-40 bg-gradient-to-br from-emerald-400 via-cyan-400 to-transparent" />
          </div>
          <motion.div
            key={analysisStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center">
            <div className="mb-6 animate-spin-slow">
              <svg
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  stroke="#34d399"
                  strokeWidth="4"
                  opacity="0.18"
                />
                <path
                  d="M22 2a20 20 0 0 1 20 20"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-zinc-100 text-lg md:text-xl font-semibold tracking-tight mb-2 text-center">
              {analysisSteps[analysisStep]}
            </span>
            <span className="text-zinc-400 text-sm font-normal text-center">
              AI is analyzing your data...
            </span>
          </motion.div>
        </motion.div>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {mockInsights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 p-6 flex flex-col gap-2">
              <Sparkles className="w-6 h-6 text-zinc-400 mb-1" />
              <h3 className="text-lg font-semibold text-zinc-100">
                {insight.title}
              </h3>
              <p className="text-zinc-400 text-sm">{insight.description}</p>
            </div>
          ))}
        </motion.section>
      )}

      {/* Resumo de comportamento financeiro + Personalidade + Simulador + Gráficos */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Resumo */}
        <div className="bg-premium-800/80 border border-premium-700 rounded-2xl shadow-premium p-6 flex flex-col gap-3 col-span-1">
          <BarChart2 className="w-6 h-6 text-premium-300 mb-1" />
          <h3 className="text-lg font-semibold text-premium-100">
            Resumo do seu comportamento
          </h3>
          <ul className="text-premium-300 text-sm list-disc ml-5">
            <li>
              Gastos mensais:{" "}
              <span className="text-premium-100 font-medium">R$ 1.250,00</span>
            </li>
            <li>
              Investimentos:{" "}
              <span className="text-premium-100 font-medium">R$ 400,00</span>
            </li>
            <li>
              Reserva atual:{" "}
              <span className="text-premium-100 font-medium">R$ 2.800,00</span>
            </li>
            <li>
              Padrão:{" "}
              <span className="text-premium-100 font-medium">
                Gastos aumentam após o salário
              </span>
            </li>
          </ul>
        </div>
        {/* Personalidade */}
        <div className="bg-premium-800/80 border border-premium-700 rounded-2xl shadow-premium p-6 flex flex-col gap-3 col-span-1">
          <User className="w-6 h-6 text-premium-300 mb-1" />
          <h3 className="text-lg font-semibold text-premium-100">
            AI Financial Personality
          </h3>
          <p className="text-premium-300 text-sm mb-2">
            Você é um{" "}
            <span className="text-premium-100 font-medium">
              investidor cauteloso
            </span>
            , mas tende a agir por emoção em compras rápidas.
          </p>
          <span className="inline-block bg-premium-700 text-premium-200 px-3 py-1 rounded-xl text-xs">
            Perfil: Cauteloso & Emocional
          </span>
        </div>
        {/* Simulador */}
        <div className="bg-premium-800/80 border border-premium-700 rounded-2xl shadow-premium p-6 flex flex-col gap-3 col-span-1">
          <Brain className="w-6 h-6 text-premium-300 mb-1" />
          <h3 className="text-lg font-semibold text-premium-100">
            Simulador de Cenários
          </h3>
          <button className="mt-2 bg-gradient-to-r from-premium-600 to-premium-400 hover:from-premium-500 hover:to-premium-300 transition-colors px-5 py-2 rounded-xl text-premium-900 font-semibold shadow-premium">
            Simular futuro
          </button>
          <p className="text-premium-300 text-xs mt-2">
            Veja como pequenas mudanças podem impactar sua reserva.
          </p>
        </div>
      </motion.section>

      {/* Gráfico minimalista de gastos */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="w-full max-w-5xl mb-10">
        <div className="bg-premium-800/80 border border-premium-700 rounded-2xl shadow-premium p-6">
          <h3 className="text-lg font-semibold text-premium-100 mb-4 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-premium-300" /> Gastos por
            categoria
          </h3>
          {/* Aqui entraria um gráfico real com recharts, usando mock data */}
          <div className="w-full h-64 flex items-center justify-center text-premium-400">
            [Gráfico de gastos - mock]
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
