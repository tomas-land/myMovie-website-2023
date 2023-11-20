'use client';
import { ModalContextProvider } from './ModalContext';
import { AuthProvider } from './AuthProvider';
import { GlobalContextProvider } from './GlobalContext';
import TanStackProvider from './TanStackContext';

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanStackProvider>
      <AuthProvider>
        <GlobalContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </GlobalContextProvider>
      </AuthProvider>
    </TanStackProvider>
  );
};

export default ContextProviders;
