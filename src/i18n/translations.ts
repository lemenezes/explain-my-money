export type Insight = {
  title: string;
  description: string;
};

export type Language = "en" | "pt" | "es";

export const translations: Record<
  Language,
  {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    uploadTitle: string;
    uploadDesc: string;
    uploadBtn: string;
    analyzing: string;
    analyzeAnother: string;
    simulate: string;
    simulatorResult: string;
    insights: Insight[];
    summary: string;
    monthly: string;
    invested: string;
    reserve: string;
    personalityTitle: string;
    personality: string;
    scenario: string;
    chart: string;
    analysisSteps: string[];
    stepLabel: string;
  }
> = {
  en: {
    heroBadge: "AI Financial Companion",
    heroTitle: "Explain My Money",
    heroSubtitle: "Turn financial chaos into human clarity.",
    uploadTitle: "Import your statement",
    uploadDesc: "Upload your CSV to start understanding your money with AI.",
    uploadBtn: "Select CSV",
    analyzing: "AI is analyzing your data...",
    analyzeAnother: "Analyze another statement (CSV)",
    simulate: "Simulate future",
    simulatorResult:
      "If you reduced delivery spending by 30%, you could save $18,000 in 5 years.",
    insights: [
      {
        title: "You spend more on delivery than you invest.",
        description: "Consider reviewing priorities to accelerate your savings."
      },
      {
        title: "Your spending spikes after payday.",
        description:
          "Try to distribute your expenses more evenly throughout the month."
      },
      {
        title: "You'd have an emergency fund in 8 months at this pace.",
        description: "Great! Keep it up for financial security."
      },
      {
        title:
          "You're a cautious investor, but impulsive with quick purchases.",
        description: "Aim for more rationality in impulse buys."
      }
    ],
    summary: "Behavior summary",
    monthly: "Monthly spending: $1,250",
    invested: "Investments: $400",
    reserve: "Current reserve: $2,800",
    personalityTitle: "AI Financial Personality",
    personality:
      "You are a cautious investor, but emotional in quick purchases.",
    scenario: "Scenario Simulator",
    chart: "Spending by category",
    analysisSteps: [
      "Analyzing subscriptions...",
      "Mapping spending behavior...",
      "Detecting emotional spending...",
      "Generating financial personality...",
      "Building future projections..."
    ],
    stepLabel: "Step {current} of {total}"
  },
  pt: {
    heroBadge: "Companheiro Financeiro IA",
    heroTitle: "Explain My Money",
    heroSubtitle: "Transforme caos financeiro em clareza humana.",
    uploadTitle: "Importe seu extrato",
    uploadDesc:
      "Faça upload do seu CSV para começar a entender seu dinheiro com IA.",
    uploadBtn: "Selecionar CSV",
    analyzing: "A IA está analisando seus dados...",
    analyzeAnother: "Analisar outro extrato (CSV)",
    simulate: "Simular futuro",
    simulatorResult:
      "Se você reduzir gastos com delivery em 30%, pode economizar R$ 18.000 em 5 anos.",
    insights: [
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
        title:
          "Você é um investidor cauteloso, mas emocional em compras rápidas.",
        description: "Busque mais racionalidade em compras por impulso."
      }
    ],
    summary: "Resumo do comportamento",
    monthly: "Gastos mensais: R$ 1.250",
    invested: "Investimentos: R$ 400",
    reserve: "Reserva atual: R$ 2.800",
    personalityTitle: "Personalidade Financeira IA",
    personality:
      "Você é um investidor cauteloso, mas emocional em compras rápidas.",
    scenario: "Simulador de Cenários",
    chart: "Gastos por categoria",
    analysisSteps: [
      "Analisando assinaturas...",
      "Mapeando comportamento de gastos...",
      "Detectando gastos emocionais...",
      "Gerando personalidade financeira...",
      "Projetando cenários futuros..."
    ],
    stepLabel: "Etapa {current} de {total}"
  },
  es: {
    heroBadge: "Compañero Financiero IA",
    heroTitle: "Explain My Money",
    heroSubtitle: "Convierte el caos financiero en claridad humana.",
    uploadTitle: "Importa tu extracto",
    uploadDesc: "Sube tu CSV para empezar a entender tu dinero con IA.",
    uploadBtn: "Seleccionar CSV",
    analyzing: "La IA está analizando tus datos...",
    analyzeAnother: "Analizar otro extracto (CSV)",
    simulate: "Simular futuro",
    simulatorResult:
      "Si reduces el gasto en delivery un 30%, podrías ahorrar $18.000 en 5 años.",
    insights: [
      {
        title: "Gastaste más en delivery que en inversiones.",
        description: "Considera revisar prioridades para acelerar tu ahorro."
      },
      {
        title: "Tus gastos aumentan después del día de pago.",
        description: "Intenta distribuir mejor tus gastos durante el mes."
      },
      {
        title: "Tendrías un fondo de emergencia en 8 meses a este ritmo.",
        description: "¡Genial! Sigue así para garantizar seguridad financiera."
      },
      {
        title: "Eres un inversor cauteloso, pero emocional en compras rápidas.",
        description: "Busca más racionalidad en compras impulsivas."
      }
    ],
    summary: "Resumen de comportamiento",
    monthly: "Gasto mensual: $1.250",
    invested: "Inversiones: $400",
    reserve: "Reserva actual: $2.800",
    personalityTitle: "Personalidad Financiera IA",
    personality:
      "Eres un inversor cauteloso, pero emocional en compras rápidas.",
    scenario: "Simulador de Escenarios",
    chart: "Gasto por categoría",
    analysisSteps: [
      "Analizando suscripciones...",
      "Mapeando comportamiento de gastos...",
      "Detectando gastos emocionales...",
      "Generando personalidad financiera...",
      "Proyectando escenarios futuros..."
    ],
    stepLabel: "Paso {current} de {total}"
  }
};
