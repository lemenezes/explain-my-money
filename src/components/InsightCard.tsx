import React from 'react';

interface InsightCardProps {
  title: string;
  description: string;
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description }) => (
  <div className="insight-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default InsightCard;
