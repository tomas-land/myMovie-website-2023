'use client'
import { ModalContextProvider } from "./ModalContext";

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalContextProvider>{children}</ModalContextProvider>
  );
};

export default ContextProviders;