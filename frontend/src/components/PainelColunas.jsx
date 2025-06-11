import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter, useDroppable, useDraggable } from '@dnd-kit/core';

const statusList = ['Geral', 'Aberto', 'Em Andamento', 'Atendido', 'Encerrado'];

function ColunaStatus({ status, children }) {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div ref={setNodeRef} style={{
      flex: 1,
      minHeight: 400,
      border: '2px dashed #ccc',
      margin: '0 10px',
      padding: 10,
      borderRadius: '6px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ textAlign: 'center' }}>{status}</h3>
      {children}
    </div>
  );
}

function CardChamado({ chamado }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: chamado.id.toString() });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : '',
    padding: '10px',
    marginBottom: '10px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '1px 1px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <strong>{chamado.protocolo}</strong><br />
      {chamado.tipo}<br />
      <small>Prioridade: {chamado.prioridade}</small>
    </div>
  );
}

export default function PainelColunas({ usuario }) {
  const [chamados, setChamados] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/chamados')
      .then(res => res.json())
      .then(data => {
        const separadoPorStatus = {};
        statusList.forEach(status => separadoPorStatus[status] = []);
        data.forEach(c => {
          if (!c.responsavel) {
            separadoPorStatus['Geral'].push(c);
          } else {
            separadoPorStatus[c.status]?.push(c);
          }
        });
        setChamados(separadoPorStatus);
      });
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const chamadoId = parseInt(active.id);
    const novoStatus = over.id;

    const chamadoMovido = Object.values(chamados).flat().find(c => c.id === chamadoId);
    if (!chamadoMovido || (chamadoMovido.status === novoStatus && chamadoMovido.responsavel === usuario)) return;

    try {
      const atualizados = { ...chamados };
      statusList.forEach(status => {
        atualizados[status] = atualizados[status].filter(c => c.id !== chamadoId);
      });

      if (chamadoMovido.responsavel == null && novoStatus === usuario) {
        const body = {
          responsavel: usuario,
          data_movimentacao: new Date().toISOString()
        };

        await fetch(`http://localhost:3000/chamados/${chamadoId}/atribuir`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        atualizados['Aberto'].push({ ...chamadoMovido, responsavel: usuario, status: 'Aberto' });
        alert(`Chamado atribuído ao(a) ${usuario} com sucesso!`);
      } else {
        await fetch(`http://localhost:3000/chamados/${chamadoId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: novoStatus })
        });

        atualizados[novoStatus].push({ ...chamadoMovido, status: novoStatus });
        alert(`Chamado movido para "${novoStatus}" com sucesso!`);
      }

      setChamados(atualizados);
    } catch (err) {
      console.error('Erro ao atualizar chamado:', err);
      alert('Erro ao mover o chamado.');
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: 20 }}>
        {statusList.map(status => (
          <ColunaStatus key={status} status={status}>
            {chamados[status]?.map(c => <CardChamado key={c.id} chamado={c} />)}
          </ColunaStatus>
        ))}
      </div>
    </DndContext>
  );
}
