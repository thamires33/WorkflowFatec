import React, { useState, createContext, useContext } from 'react';
import VisualizarChamadoModalSec from './VisualizarChamadoModalSec';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }) {
  const [chamado, setChamado] = useState(null);
  const [onResponder, setOnResponder] = useState(null);

  const openModal = (ch, responderCallback) => {
    setChamado(ch);
    setOnResponder(() => responderCallback);
  };

  const closeModal = () => {
    setChamado(null);
    setOnResponder(null);
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {chamado && (
        <VisualizarChamadoModalSec
          chamado={chamado}
          onClose={closeModal}
          onResponder={onResponder}
        />
      )}
    </ModalContext.Provider>
  );
}
