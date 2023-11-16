'use client';
import { ModalContextProvider } from './ModalContext';
import { AuthProvider } from './AuthProvider';
import { GlobalContextProvider } from './GlobalContext';

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <GlobalContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </GlobalContextProvider>
    </AuthProvider>
  );
};

export default ContextProviders;
