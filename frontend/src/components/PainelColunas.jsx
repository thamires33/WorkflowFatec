import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, useDroppable, useDraggable } from '@dnd-kit/core';

/* Colunas exibidas no painel */
const statusList = ['Geral', 'Aberto', 'Em Andamento', 'Atendido', 'Encerrado'];

/* ---------- COLUNA ------------------------------------------------------ */
function ColunaStatus({ status, children }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 400,
        border: '2px dashed #ccc',
        margin: '0 10px',
        padding: 10,
        borderRadius: '6px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h3 style={{ textAlign: 'center' }}>{status}</h3>
      {children}
    </div>
  );
}

/* ---------- CARD -------------------------------------------------------- */
function CardChamado({ chamado, onVisualizarChamado }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: chamado.id.toString(),
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
    padding: '10px',
    marginBottom: '10px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '1px 1px 4px rgba(0,0,0,0.1)',
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className="card-chamado">
      <div
        {...listeners}
        {...attributes}
        style={{
          cursor: 'grab',
          position: 'absolute',
          top: 5,
          right: 5,
          userSelect: 'none',
        }}
        aria-label="Arrastar chamado"
      >
        ┃┃
      </div>

      <p className="card-protocolo">{chamado.protocolo}</p>
      <p>{chamado.tipo}</p>
      <small>Prioridade: {chamado.prioridade}</small>
      <br />

      <button
        className="btn-visualizar"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          onVisualizarChamado(chamado);
        }}
      >
        Visualizar
      </button>
    </div>
  );
}

/* ---------- PAINEL PRINCIPAL ------------------------------------------- */
export default function PainelColunas({ usuario, onVisualizarChamado }) {
  const [chamados, setChamados] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/api/chamados')
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error('Erro: resposta inesperada da API', data);
          return;
        }

        const porStatus = {};
        statusList.forEach((s) => (porStatus[s] = []));
        data.forEach((c) => {
          if (!c.responsavel) porStatus['Geral'].push(c);
          else (porStatus[c.status] || []).push(c);
        });

        setChamados(porStatus);
      })
      .catch((err) => console.error('Erro na requisição de chamados:', err));
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const chamadoId = Number(active.id);
    const novoStatus = over.id;

    const chamadoOrigem = Object.values(chamados)
      .flat()
      .find((c) => c.id === chamadoId);

    if (!chamadoOrigem || chamadoOrigem.status === novoStatus) return;

    const atualizado = { ...chamados };
    statusList.forEach(
      (status) => (atualizado[status] = atualizado[status].filter((c) => c.id !== chamadoId))
    );

    try {
      if (chamadoOrigem.responsavel == null && novoStatus === usuario) {
        await fetch(`http://localhost:3000/api/chamados/${chamadoId}/atribuir`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            responsavel: usuario,
            data_movimentacao: new Date().toISOString(),
          }),
        });

        atualizado['Aberto'].push({
          ...chamadoOrigem,
          responsavel: usuario,
          status: 'Aberto',
        });
        alert(`Chamado atribuído ao(à) ${usuario} com sucesso!`);
      } else {
        await fetch(`http://localhost:3000/api/chamados/${chamadoId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: novoStatus }),
        });

        atualizado[novoStatus].push({ ...chamadoOrigem, status: novoStatus });
        alert(`Chamado movido para "${novoStatus}" com sucesso!`);
      }

      setChamados(atualizado);
    } catch (err) {
      console.error('Erro ao atualizar chamado:', err);
      alert('Erro ao mover o chamado.');
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: 20 }}>
        {statusList.map((status) => (
          <ColunaStatus key={status} status={status}>
            {chamados[status]?.map((c) => (
              <CardChamado key={c.id} chamado={c} onVisualizarChamado={onVisualizarChamado} />
            ))}
          </ColunaStatus>
        ))}
      </div>
    </DndContext>
  );
}
