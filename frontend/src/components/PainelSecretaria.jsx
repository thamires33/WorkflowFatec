import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';

const statusList = ['Geral', 'Em Análise', 'Em Andamento', 'Atendido', 'Encerrado'];

function DroppableArea({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: '400px',
        border: '2px dashed #ccc',
        margin: '0 10px',
        padding: '10px',
        borderRadius: '6px',
        backgroundColor: '#f9f9f9'
      }}
    >
      <h3 style={{ textAlign: 'center' }}>{id}</h3>
      {children}
    </div>
  );
}

function DraggableCard({ chamado }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: chamado.id.toString(),
  });

  const style = {
    padding: '10px',
    marginBottom: '10px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>#{chamado.protocolo}</strong> - {chamado.tipo}
      <br />
      <small>Status: {chamado.status || 'Geral'}</small>
    </div>
  );
}

export default function PainelSecretaria({ usuario, chamados }) {
  const [chamadosPorStatus, setChamadosPorStatus] = useState({});

  useEffect(() => {
    const grupos = {};
    statusList.forEach((status) => {
      grupos[status] = [];
    });

    chamados.forEach((c) => {
      const status = c.status || 'Geral';
      grupos[status]?.push(c);
    });

    setChamadosPorStatus(grupos);
  }, [chamados]);

  const handleDragEnd = async (event) => {
    const { over, active } = event;
    if (!over) return;

    const chamadoId = parseInt(active.id);
    const novoStatus = over.id;

    const chamadoAtual = Object.values(chamadosPorStatus)
      .flat()
      .find((c) => c.id === chamadoId);

    if (!chamadoAtual || chamadoAtual.status === novoStatus) return;

    const atualizado = {
      ...chamadoAtual,
      status: novoStatus,
      responsavel: usuario,
      data_movimentacao: new Date().toISOString()
    };

    try {
      await fetch(`http://localhost:3000/chamados/${chamadoId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizado)
      });

      // Atualiza o estado local (move o chamado)
      const novosChamados = { ...chamadosPorStatus };
      // Remove da coluna antiga
      novosChamados[chamadoAtual.status || 'Geral'] = novosChamados[chamadoAtual.status || 'Geral'].filter((c) => c.id !== chamadoId);
      // Adiciona na nova
      novosChamados[novoStatus].push(atualizado);

      setChamadosPorStatus(novosChamados);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
        {statusList.map((status) => (
          <DroppableArea key={status} id={status}>
            {(chamadosPorStatus[status] || []).map((c) => (
              <DraggableCard key={c.id} chamado={c} />
            ))}
          </DroppableArea>
        ))}
      </div>
    </DndContext>
  );
}
