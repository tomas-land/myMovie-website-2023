'use client';
import React, { createContext, useState, useContext,useCallback } from 'react';

interface iModalContextProps {
  isModalOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<iModalContextProps | undefined>(undefined);

export const useModalContext = (): iModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

export const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openModal = () => {
    setIsModalOpened(true);
  };

  const closeModal = () => {
    setIsModalOpened(false);
  };

  const contextValue: iModalContextProps = {
    isModalOpened,
    openModal,
    closeModal,
  };

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
};
