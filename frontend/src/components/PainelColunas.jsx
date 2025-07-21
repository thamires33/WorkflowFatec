import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';

const statusList = ['Geral', 'Aberto', 'Em Andamento', 'Atendido', 'Encerrado'];

// Componente de Coluna (Droppable)
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

// Cartão individual do chamado (Draggable)
function CardChamado({ chamado, onVisualizarChamado }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: chamado.id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : '',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const handleVisualizarClick = () => {
    console.log('🔍 Cliquei no botão Visualizar:', chamado);
    onVisualizarChamado({ ...chamado });
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      className="card-chamado"
      style={style}
    >
      {/* Área de arrasto */}
      <div {...listeners} style={{ cursor: 'grab' }}>
        <strong>{chamado.protocolo}</strong><br />
        {chamado.tipo}<br />
        <small>Prioridade: {chamado.prioridade}</small>
      </div>

      {/* Botão de visualização */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleVisualizarClick();
        }}
        style={{
          marginTop: '8px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          padding: '6px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        Visualizar
      </button>
    </div>
  );
}

// Painel principal com lógica de movimentação
function PainelColunas({ usuario, onVisualizarChamado }) {
  const [chamados, setChamados] = useState({});

  useEffect(() => {
    const carregarChamados = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/chamados');
        const data = await res.json();

        const separadoPorStatus = {};
        statusList.forEach((status) => {
          separadoPorStatus[status] = [];
        });

        data.forEach((chamado) => {
          const status = !chamado.responsavel ? 'Geral' : chamado.status;
          if (separadoPorStatus[status]) {
            separadoPorStatus[status].push(chamado);
          }
        });

        setChamados(separadoPorStatus);
        console.log('📥 Chamados carregados e organizados por status:', separadoPorStatus);
      } catch (err) {
        console.error('❌ Erro ao carregar chamados:', err);
      }
    };

    carregarChamados();
  }, []);

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || !active || !active.id) return;
    if (active.id === over.id) return;

    const chamadoId = Number(active.id);
    const novoStatus = over.id;

    const chamadoMovido = Object.values(chamados)
      .flat()
      .find((c) => c.id === chamadoId);

    if (!chamadoMovido || chamadoMovido.status === novoStatus) return;

    try {
      const atualizados = { ...chamados };

      // Remove o chamado da lista antiga
      statusList.forEach((status) => {
        atualizados[status] = atualizados[status].filter((c) => c.id !== chamadoId);
      });

      if (chamadoMovido.responsavel == null && novoStatus === usuario) {
        await fetch(`http://localhost:3000/api/chamados/${chamadoId}/atribuir`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            responsavel: usuario,
            data_movimentacao: new Date().toISOString(),
          }),
        });

        atualizados['Aberto'].push({
          ...chamadoMovido,
          responsavel: usuario,
          status: 'Aberto',
        });

        console.log(`Chamado atribuído ao(à) ${usuario} com sucesso!`);
      } else {
        await fetch(`http://localhost:3000/api/chamados/${chamadoId}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: novoStatus }),
        });

        atualizados[novoStatus].push({
          ...chamadoMovido,
          status: novoStatus,
        });

        console.log(`Chamado movido para "${novoStatus}" com sucesso!`);
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
        {statusList.map((status) => (
          <ColunaStatus key={status} status={status}>
            {chamados[status]?.map((chamado) => (
              <CardChamado
                key={chamado.id}
                chamado={{ ...chamado }}
                onVisualizarChamado={onVisualizarChamado}
              />
            ))}
          </ColunaStatus>
        ))}
      </div>
    </DndContext>
  );
}

export default PainelColunas;
