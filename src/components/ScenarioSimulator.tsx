import React from "react";

interface ScenarioSimulatorProps {
  onSimulate: (scenario: string) => void;
}

const ScenarioSimulator: React.FC<ScenarioSimulatorProps> = ({
  onSimulate
}) => {
  return (
    <div className="scenario-simulator">
      <h3>Simulador de Cenários</h3>
      <button onClick={() => onSimulate("cenário exemplo")}>
        Simular Cenário
      </button>
    </div>
  );
};

export default ScenarioSimulator;
