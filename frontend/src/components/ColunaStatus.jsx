import React from 'react';
import '../styles/Chamado.css';

function ColunaStatus({ status, chamados, onVisualizarChamado }) {
  return (
    <div className="coluna-status">
      <h3>{status}</h3>
      {chamados
        .filter(chamado => chamado.status === status)
        .map(chamado => (
          <div
            key={chamado.id}
            className={`card-chamado ${!chamado.aluno_ra ? 'chamado-invalido' : ''}`}
          >
            <p><strong>{chamado.protocolo}</strong></p>
            <p>{chamado.tipo}</p>
            <p>Prioridade: {chamado.prioridade}</p>

            {!chamado.aluno_ra && <p className="avisora">RA não encontrado</p>}

            <button onClick={() => onVisualizarChamado(chamado)}>
              Visualizar
            </button>
          </div>
        ))}
    </div>
  );
}

export default ColunaStatus;
