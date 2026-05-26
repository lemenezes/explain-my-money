import { useState, useRef } from "react";
import { translations } from "./i18n/translations";
import type { Language } from "./i18n/translations";
import { useEffect } from "react";
import { Upload, Sparkles, User, BarChart2, Brain } from "lucide-react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { mockCategoryData } from "./mockCategoryData";

import "./index.css";

function App() {
  // Idioma
  // Idioma persistente
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("language");
      if (stored === "en" || stored === "pt" || stored === "es") {
        return stored as Language;
      }
    }
    return "en";
  });

  // Atualiza localStorage ao trocar idioma
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language);
    }
  }, [language]);
  // O upload deve aparecer quando !csvUploaded && !analyzing
  // Não precisamos mais de showUpload para controlar visibilidade
  // Reset premium
  function handleResetAnalysis() {
    setCsvUploaded(false);
    setAnalyzing(false);
    setAnalysisStep(0);
    setShowSimulation(false);
  }
  // Estado para simulação do cenário
  const [showSimulation, setShowSimulation] = useState(false);
  const [simResult, setSimResult] = useState("");
  function handleSimulate() {
    setShowSimulation(false);
    // Exemplo de lógica mock: delivery reduzido 30%, economia em 5 anos
    setTimeout(() => {
      setSimResult(translations[language].simulatorResult);
      setShowSimulation(true);
    }, 350); // pequeno delay para animação
  }
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisTimeout = useRef<number | null>(null);

  type Insight = {
    title: string;
    description: string;
  };

  function handleCsvUpload() {
    setCsvUploaded(true);
    setAnalyzing(true);
    setAnalysisStep(0);

    let step = 0;
    function nextStep() {
      if (step < translations[language].analysisSteps.length - 1) {
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
  }

  return (
    <div className="min-h-screen bg-[#050608] text-zinc-100 flex flex-col items-center px-4 py-8">
      {/* Seletor de idioma */}
      <div className="w-full flex justify-end items-center mb-2">
        <div className="flex gap-2 pr-2 pt-2">
          {(["en", "pt", "es"] as const).map(lng => (
            <button
              key={lng}
              onClick={() => setLanguage(lng)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase border border-zinc-700 transition-all duration-200
                ${language === lng ? "bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 shadow shadow-emerald-400/10 border-emerald-400/40" : "bg-zinc-900 text-emerald-300 hover:bg-zinc-800"}`}>
              {lng}
            </button>
          ))}
        </div>
      </div>
      {/* HERO */}
      <motion.header
        className="relative flex flex-col items-center justify-center mb-16 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[480px] h-[320px] md:w-[700px] md:h-[400px] rounded-full blur-3xl opacity-50 bg-gradient-to-br from-emerald-400 via-cyan-400 to-transparent" />
        </div>

        <div className="z-10 flex flex-col items-center">
          <img
            src="/logo/logo-symbol.png"
            alt="Explain My Money"
            className="
            h-20
            w-auto
            mb-6
            drop-shadow-[0_0_28px_rgba(16,185,129,0.18)]
          "
          />

          <span className="mb-5 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-medium tracking-wide text-emerald-300 uppercase">
            {translations[language].heroBadge}
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-zinc-100 to-cyan-300 bg-clip-text text-transparent text-center leading-tight mb-4">
            {translations[language].heroTitle}
          </h1>

          <p className="max-w-2xl text-zinc-300 text-lg md:text-2xl font-light text-center">
            {translations[language].heroSubtitle}
          </p>
        </div>
      </motion.header>

      {/* UPLOAD */}
      {!csvUploaded && !analyzing && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xl mb-12">
          <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 px-10 py-12 flex flex-col items-center gap-6 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent [box-shadow:0_0_32px_0_rgba(16,185,129,0.18)]"
            />
            <Upload className="w-12 h-12 text-emerald-400" />
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-100">
              {translations[language].uploadTitle}
            </h2>
            <p className="text-zinc-400 text-center max-w-md">
              {translations[language].uploadDesc}
            </p>
            <label className="cursor-pointer group">
              <span className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-zinc-900 font-semibold transition-all duration-200 group-hover:scale-105">
                <Upload className="w-5 h-5" />
                {translations[language].uploadBtn}
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
          className="w-full max-w-xl flex flex-col items-center justify-center pt-6 mb-10 relative -translate-y-10">
          <div className="mb-6 animate-pulse">
            <Brain className="w-14 h-14 text-emerald-400" />
          </div>
          <span className="text-zinc-100 text-lg md:text-xl font-semibold mb-2 text-center">
            {translations[language].analysisSteps[analysisStep]}
          </span>
          <span className="text-zinc-400 text-xs mb-1">
            {translations[language].stepLabel
              ? translations[language].stepLabel
                  .replace("{current}", String(analysisStep + 1))
                  .replace(
                    "{total}",
                    String(translations[language].analysisSteps.length)
                  )
              : `Step ${analysisStep + 1} of ${translations[language].analysisSteps.length}`}
          </span>
          <span className="text-zinc-400 text-sm">
            {translations[language].analyzing}
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
              {translations[language].analyzeAnother}
            </button>
          </motion.div>
          {/* INSIGHTS */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {(translations[language].insights as Insight[]).map(
              (insight, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/30 p-6 flex flex-col gap-2 transition-all duration-300 hover:border-emerald-400/20 hover:-translate-y-1">
                  <Sparkles className="w-6 h-6 text-zinc-400 mb-1" />
                  <h3 className="text-lg font-semibold text-zinc-100">
                    {insight.title}
                  </h3>
                  <p className="text-zinc-400 text-sm">{insight.description}</p>
                </div>
              )
            )}
          </motion.section>

          {/* CARDS */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <BarChart2 className="w-6 h-6 text-emerald-300 mb-3" />

              <h3 className="text-lg font-semibold mb-4">
                {translations[language].summary}
              </h3>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>{translations[language].monthly}</li>
                <li>{translations[language].invested}</li>
                <li>{translations[language].reserve}</li>
              </ul>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <User className="w-6 h-6 text-emerald-300 mb-3" />
              <h3 className="text-lg font-semibold mb-4">
                {translations[language].personalityTitle}
              </h3>
              <p className="text-zinc-400 text-base mb-4">
                {translations[language].personality}
              </p>
              <div className="mt-2 inline-block px-4 py-1 rounded-full bg-gradient-to-r from-emerald-700/30 to-cyan-700/20 text-emerald-200 text-xs font-semibold tracking-wide uppercase shadow shadow-emerald-400/10">
                {translations[language].personalityTag}
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6">
              <Brain className="w-6 h-6 text-emerald-300 mb-3" />
              <h3 className="text-lg font-semibold mb-4">
                {translations[language].scenario}
              </h3>
              <button
                className="mt-2 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90 transition-opacity px-5 py-2 rounded-xl text-zinc-900 font-semibold"
                onClick={handleSimulate}>
                {translations[language].simulate}
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
                {translations[language].chart}
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
