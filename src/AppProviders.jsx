// AppProviders.tsx
import { ReactNode } from 'react';
import { InformacionProvider } from './utils/InformacionContext';
import { MovilidadProvider } from './utils/MovilidadContext';
import { RedesProvider } from "./utils/RedesContext";
import { FiltersProvider } from './utils/FiltersContext';
// importa todos los demás providers que necesites

export const AppProviders = ({ children }) => {
  return (
    <FiltersProvider>
      <RedesProvider>
        <MovilidadProvider>
          <InformacionProvider>
            {children}
          </InformacionProvider>
        </MovilidadProvider>
      </RedesProvider>
    </FiltersProvider>
  );
};