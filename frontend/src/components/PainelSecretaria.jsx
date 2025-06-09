import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core';

function DroppableArea({ id, children }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div ref={setNodeRef} style={{
      width: '300px',
      minHeight: '200px',
      border: '2px dashed #aaa',
      padding: '10px',
      margin: '10px'
    }}>
      <h3>{id}</h3>
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
    background: '#f5f5f5',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <strong>{chamado.protocolo}</strong> - {chamado.tipo}
    </div>
  );
}

export default function PainelSecretaria({ usuario }) {
  const [geral, setGeral] = useState([]);
  const [areaPessoal, setAreaPessoal] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/chamados')
      .then(res => res.json())
      .then(data => setGeral(data));
  }, []);

  const handleDragEnd = async (event) => {
    const { over, active } = event;
    if (!over) return;

    const chamadoId = parseInt(active.id);
    const chamado = geral.find((c) => c.id === chamadoId);
    if (!chamado) return;

    if (over.id === usuario) {
      const atualizado = {
        ...chamado,
        responsavel: usuario,
        data_movimentacao: new Date().toISOString()
      };

      await fetch(`http://localhost:3000/chamados/${chamado.id}/atribuir`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizado)
      });

      setAreaPessoal([...areaPessoal, atualizado]);
      setGeral(geral.filter(c => c.id !== chamadoId));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex' }}>
        <DroppableArea id="Geral">
          {geral.map((c) => (
            <DraggableCard key={c.id} chamado={c} />
          ))}
        </DroppableArea>

        <DroppableArea id={usuario}>
          {areaPessoal.map((c) => (
            <div key={c.id}>
              <strong>{c.protocolo}</strong> - {c.tipo}
              <br />
              <small>Responsável: {c.responsavel}</small><br />
              <small>{new Date(c.data_movimentacao).toLocaleString()}</small>
            </div>
          ))}
        </DroppableArea>
      </div>
    </DndContext>
  );
}
