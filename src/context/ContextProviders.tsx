'use client';
import { ModalContextProvider } from './ModalContext';
import { AuthProvider } from './AuthProvider';

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ModalContextProvider>{children}</ModalContextProvider>
    </AuthProvider>
  );
};

export default ContextProviders;
