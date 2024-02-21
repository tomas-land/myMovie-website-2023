'use client';
import { ModalContextProvider } from './ModalContext';
import { AuthContext } from './AuthContext';
import { GlobalContextProvider } from './GlobalContext';
import TanStackProvider from './TanStackContext';

export const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TanStackProvider>
      <AuthContext>
        <GlobalContextProvider>
          <ModalContextProvider>{children}</ModalContextProvider>
        </GlobalContextProvider>
      </AuthContext>
    </TanStackProvider>
  );
};

export default ContextProviders;
