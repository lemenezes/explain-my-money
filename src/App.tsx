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
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { mockCategoryData } from "./mockCategoryData";

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
  const [showUpload, setShowUpload] = useState(true);
  // Reset premium
  function handleResetAnalysis() {
    setCsvUploaded(false);
    setAnalyzing(false);
    setAnalysisStep(0);
    setShowUpload(true);
    setShowSimulation(false);
  }
  // Estado para simulação do cenário
  const [showSimulation, setShowSimulation] = useState(false);
  const [simResult, setSimResult] = useState("");
  function handleSimulate() {
    setShowSimulation(false);
    // Exemplo de lógica mock: delivery reduzido 30%, economia em 5 anos
    setTimeout(() => {
      setSimResult(
        "Se você reduzir gastos com delivery em 30%, pode economizar R$ 18.000 em 5 anos."
      );
      setShowSimulation(true);
    }, 350); // pequeno delay para animação
  }
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
    setShowUpload(false); // inicia animação de saída do card
    setTimeout(() => {
      setShowUpload(false);
      setCsvUploaded(true);
      setAnalyzing(true);
      setAnalysisStep(0);

      let step = 0;
      function nextStep() {
        if (step < analysisSteps.length - 1) {
          step++;
          setAnalysisStep(step);
          analysisTimeout.current = window.setTimeout(nextStep, 1200);
        } else {
          window.setTimeout(() => {
            setAnalyzing(false);
          }, 1200);
        }
      }
      analysisTimeout.current = window.setTimeout(nextStep, 1200);
    }, 500); // delay para animação do card sumir
  }

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-100 flex flex-col items-center px-4 py-8">
      {/* HERO */}
      <motion.header
        className="relative flex flex-col items-center justify-center mb-16 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[480px] h-[320px] md:w-[700px] md:h-[400px] rounded-full blur-3xl opacity-60 bg-gradient-to-br from-emerald-400 via-cyan-400 to-transparent" />
        </div>

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

          <span className="mb-5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium tracking-wide text-emerald-300 uppercase">
            AI Financial Companion
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-zinc-100 to-cyan-300 bg-clip-text text-transparent text-center leading-tight mb-4">
            Explain My Money
          </h1>

          <p className="max-w-2xl text-zinc-300 text-lg md:text-2xl font-light text-center">
            Transforme caos financeiro em clareza humana.
          </p>
        </div>
      </motion.header>

      {/* UPLOAD */}
      {showUpload && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={showUpload ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl mb-12"
          style={{
            pointerEvents: showUpload ? "auto" : "none",
            display: showUpload ? "block" : "none"
          }}>
          <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 px-10 py-12 flex flex-col items-center gap-6 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent [box-shadow:0_0_32px_0_rgba(16,185,129,0.18)]"
            />
            <Upload className="w-12 h-12 text-emerald-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">
              Importe seu extrato
            </h2>
            <p className="text-zinc-400 text-center max-w-md">
              Faça upload do seu CSV para começar a entender seu dinheiro com
              IA.
            </p>
            <label className="cursor-pointer group">
              <span className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 font-semibold transition-all duration-200 group-hover:scale-105">
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
          </div>
        </motion.div>
      )}

      {/* ANALYZING */}
      {analyzing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-xl flex flex-col items-center justify-center py-24 mb-10 relative">
          <div className="mb-6 animate-pulse">
            <Brain className="w-14 h-14 text-emerald-400" />
          </div>

          <span className="text-zinc-100 text-lg md:text-xl font-semibold mb-2 text-center">
            {analysisSteps[analysisStep]}
          </span>

          <span className="text-zinc-400 text-sm">
            AI is analyzing your data...
          </span>
        </motion.div>
      )}
      {/* DASHBOARD */}
      {csvUploaded && !analyzing && (
        <>
          {/* Botão premium para reiniciar análise */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-5xl flex justify-end mb-2">
            <button
              onClick={handleResetAnalysis}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-zinc-800 via-zinc-900 to-zinc-800 border border-zinc-700 text-emerald-300 font-semibold text-sm shadow shadow-emerald-400/10 hover:border-emerald-400/30 hover:text-cyan-300 transition-all duration-200">
              Analisar outro extrato (CSV)
            </button>
          </motion.div>
          {/* INSIGHTS */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {mockInsights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 p-6 flex flex-col gap-2 transition-all duration-300 hover:border-emerald-400/20 hover:-translate-y-1">
                <Sparkles className="w-6 h-6 text-zinc-400 mb-1" />

                <h3 className="text-lg font-semibold text-zinc-100">
                  {insight.title}
                </h3>

                <p className="text-zinc-400 text-sm">{insight.description}</p>
              </div>
            ))}
          </motion.section>

          {/* CARDS */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <BarChart2 className="w-6 h-6 text-emerald-300 mb-3" />

              <h3 className="text-lg font-semibold mb-4">
                Resumo do comportamento
              </h3>

              <ul className="text-zinc-400 text-sm space-y-2">
                <li>Gastos mensais: R$ 1.250</li>
                <li>Investimentos: R$ 400</li>
                <li>Reserva atual: R$ 2.800</li>
              </ul>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <User className="w-6 h-6 text-emerald-300 mb-3" />

              <h3 className="text-lg font-semibold mb-4">
                AI Financial Personality
              </h3>

              <p className="text-zinc-400 text-sm">
                Você é um investidor cauteloso, mas emocional em compras
                rápidas.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <Brain className="w-6 h-6 text-emerald-300 mb-3" />
              <h3 className="text-lg font-semibold mb-4">
                Simulador de Cenários
              </h3>
              <button
                className="mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 transition-opacity px-5 py-2 rounded-xl text-zinc-900 font-semibold"
                onClick={handleSimulate}>
                Simular futuro
              </button>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={
                  showSimulation ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{ duration: 0.5 }}
                className="mt-6">
                {showSimulation && (
                  <div className="bg-gradient-to-r from-emerald-900/30 to-cyan-900/20 border border-emerald-700/30 rounded-xl px-5 py-4 text-emerald-200 shadow-lg shadow-emerald-400/10 text-base font-medium max-w-xs">
                    {simResult}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.section>

          {/* CHART */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl mb-24">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-emerald-300" />
                Gastos por categoria
              </h3>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockCategoryData}>
                    <defs>
                      <linearGradient
                        id="colorGasto"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1">
                        <stop
                          offset="5%"
                          stopColor="#34d399"
                          stopOpacity={0.7}
                        />

                        <stop
                          offset="95%"
                          stopColor="#06b6d4"
                          stopOpacity={0.15}
                        />
                      </linearGradient>
                    </defs>

                    <XAxis
                      dataKey="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#a3a3a3", fontSize: 13 }}
                    />

                    <Tooltip
                      contentStyle={{
                        background: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: 12,
                        color: "#fff"
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#34d399"
                      strokeWidth={3}
                      fill="url(#colorGasto)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>
        </>
      )}
    </div>
  );
}

export default App;
