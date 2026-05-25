import React from "react";

interface SpendingChartProps {
  data: { category: string; amount: number }[];
}

const SpendingChart: React.FC<SpendingChartProps> = ({ data }) => {
  // Placeholder for chart implementation
  return (
    <div className="spending-chart">
      <h3>Gráfico de Gastos</h3>
      <ul>
        {data.map(item => (
          <li key={item.category}>
            {item.category}: R$ {item.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SpendingChart;
