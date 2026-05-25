import Anthropic from "@anthropic-ai/sdk";

console.log(process.env.ANTHROPIC_API_KEY);
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// MOCK financial summary
const mockFinancialSummary = {
  totalSpent: 1250,
  totalInvested: 400,
  mainCategories: [
    { category: "Food", value: 600 },
    { category: "Transport", value: 300 },
    { category: "Entertainment", value: 200 }
  ],
  deliverySpending: 300,
  salaryDay: 5,
  impulsivePurchases: 120
};

async function generateFinancialInsights(summary: any) {
  const prompt = `
You are a premium AI financial behavioral analyst.

Analyze this financial summary:

${JSON.stringify(summary, null, 2)}

Generate:
- 3 short financial insights
- 1 financial personality summary
- 1 future projection

Tone:
- calm
- emotionally intelligent
- premium
- human
- concise
- non-judgmental

Return plain text only.
`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 400,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  return response.content;
}

export default async function handler(req: Request) {
  try {
    const result = await generateFinancialInsights(mockFinancialSummary);

    return Response.json({
      result
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      insights: [
        "You spend more on delivery than investments.",
        "Your spending increases after payday.",
        "Impulse purchases represent 10% of your monthly spending."
      ],
      personality:
        "Cautious investor, but emotionally driven in quick purchases.",
      projection:
        "At this pace, you could build an emergency reserve in 8 months.",
      mocked: true
    });
  }
}
