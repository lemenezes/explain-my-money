import React from "react";
import InsightCard from "../components/InsightCard";
import MoneyPersonalityCard from "../components/MoneyPersonalityCard";
import SpendingChart from "../components/SpendingChart";
import ScenarioSimulator from "../components/ScenarioSimulator";
import { mockTransactions } from "../data/mockTransactions";
import { mockInsights } from "../data/mockInsights";

const Dashboard: React.FC = () => {
  const handleSimulate = (scenario: string) => {
    alert(`Simulando: ${scenario}`);
  };

  return (
    <div className="dashboard">
      <h2>Painel Financeiro</h2>
      <div className="insights">
        {mockInsights.map((insight, idx) => (
          <InsightCard
            key={idx}
            title={insight.title}
            description={insight.description}
          />
        ))}
      </div>
      <MoneyPersonalityCard
        personality="Investidor"
        description="Você tem perfil de investidor."
      />
      <SpendingChart
        data={mockTransactions.map(({ category, amount }) => ({
          category,
          amount
        }))}
      />
      <ScenarioSimulator onSimulate={handleSimulate} />
    </div>
  );
};

export default Dashboard;
