import React from "react";

interface MoneyPersonalityCardProps {
  personality: string;
  description: string;
}

const MoneyPersonalityCard: React.FC<MoneyPersonalityCardProps> = ({
  personality,
  description
}) => (
  <div className="money-personality-card">
    <h3>{personality}</h3>
    <p>{description}</p>
  </div>
);

export default MoneyPersonalityCard;
