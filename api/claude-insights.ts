// MOCK financial summary
const mockFinancialSummary = {
  totalSpent: 1250,
  totalInvested: 400,
  mainCategories: [
    { category: "Alimentação", value: 600 },
    { category: "Transporte", value: 300 },
    { category: "Lazer", value: 200 }
  ],
  deliverySpending: 300,
  salaryDay: 5,
  impulsivePurchases: 120
};

async function generateFinancialInsights(summary: any) {
  return {
    insights: [
      "Você gasta mais com delivery do que investe mensalmente.",
      "Seu padrão de gastos aumenta logo após o dia do salário.",
      "Compras por impulso representam 10% dos seus gastos."
    ],
    personality: "Investidor cauteloso, mas emocional em compras rápidas.",
    projection:
      "Se mantiver esse ritmo, terá uma reserva de emergência em 8 meses."
  };
}

export default async function handler(req: Request) {
  const aiResult = await generateFinancialInsights(mockFinancialSummary);

  return Response.json(aiResult);
}
