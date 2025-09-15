// AppProviders.tsx
import { ReactNode } from 'react';
import { RedesProvider } from './context/RedesContext';
import { MovilidadProvider } from './context/MovilidadContext';
import { InformacionProvider } from './context/InformacionContext';
// importa todos los demás providers que necesites

export const AppProviders = ({ children }) => {
  return (
    <RedesProvider>
      <MovilidadProvider>
        <InformacionProvider>
          {children}
        </InformacionProvider>
      </MovilidadProvider>
    </RedesProvider>
  );
};
