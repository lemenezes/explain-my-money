import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Sparkles,
  BarChart2
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
  const [step, setStep] = useState<'upload' | 'analyzing' | 'dashboard'>('upload');
  const [analysisStep, setAnalysisStep] = useState(0);
  const analysisSteps = [
    "Analyzing subscriptions...",
    "Detecting behavioral patterns...",
    "Mapping emotional spending...",
    "Generating financial personality...",
    "Building future projections..."
  ];
  const analysisTimeout = useRef<number | null>(null);

  function handleCsvUpload() {
    setStep('analyzing');
    setAnalysisStep(0);
    let idx = 0;
    function nextStep() {
      if (idx < analysisSteps.length - 1) {
        idx++;
        setAnalysisStep(idx);
        analysisTimeout.current = window.setTimeout(nextStep, 1200);
      } else {
        setTimeout(() => {
          setStep('dashboard');
        }, 1200);
      }
    }
    analysisTimeout.current = window.setTimeout(nextStep, 1200);
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
              {/* Fim do conteúdo principal */}
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
              {/* Animação de análise IA */}
              <motion.div
                key="analyzing"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: step === 'analyzing' ? 1 : 0, y: step === 'analyzing' ? 0 : 40 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl flex flex-col items-center justify-center py-24 mb-10 relative"
                style={{ display: step === 'analyzing' ? 'flex' : 'none' }}
              >
                {/* Glow */}
                <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center z-0">
                  <div className="w-[340px] h-[180px] md:w-[480px] md:h-[220px] rounded-full blur-2xl opacity-40 bg-gradient-to-br from-emerald-400 via-cyan-400 to-transparent" />
                </div>
                <motion.div
                  key={analysisStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="z-10 flex flex-col items-center"
                >
                  <div className="mb-6 animate-spin-slow">
                    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="22" cy="22" r="20" stroke="#34d399" strokeWidth="4" opacity="0.18" />
                      <path d="M22 2a20 20 0 0 1 20 20" stroke="#06b6d4" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="text-zinc-100 text-lg md:text-xl font-semibold tracking-tight mb-2 text-center">
                    {analysisSteps[analysisStep]}
                  </span>
                  <span className="text-zinc-400 text-sm font-normal text-center">AI is analyzing your data...</span>
                </motion.div>
              </motion.div>

              {/* Insights Cards */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: step === 'dashboard' ? 1 : 0, y: step === 'dashboard' ? 0 : 30 }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
                style={{ display: step === 'dashboard' ? 'grid' : 'none' }}
              >
                {mockInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 p-6 flex flex-col gap-2">
                    <Sparkles className="w-6 h-6 text-zinc-400 mb-1" />
                    <h3 className="text-lg font-semibold text-zinc-100">{insight.title}</h3>
                    <p className="text-zinc-400 text-sm">{insight.description}</p>
                  </div>
                ))}
              </motion.section>
