// App.jsx
import { useRoutes, BrowserRouter } from 'react-router-dom';
// import reactLogo from './assets/react.svg'; // <- si no lo usas, quítalo
import Home from './pages/Home';
import Indicadores from './pages/Indicadores';
import Geolocalizacion from './pages/Geolocalizacion';
import Movilidad from './pages/Movilidad';
import Alertas from './pages/Alertas';
import Informacion from './pages/Informacion';
import Redes from './pages/Redes';
import Configuracion from './pages/Configuracion';
import Segmentacion from './pages/Segmentacion';
import './App.css';
import { SegmentacionProvider } from './utils/SegmentacionContext'; // ✅ este es el bueno
import { AppProviders } from './AppProviders';
import { IndicadoresProvider  } from './utils/IndicadoresContext';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: '/', element: <Home/> },
    { path: '/segmentacion', element: <Segmentacion/> },
    { path: '/indicadores', element: <Indicadores/> },
    { path: '/geolocalizacion', element: <Geolocalizacion/> },
    { path: '/configuracion', element: <Configuracion/> },
    { path: '/movilidad', element: <Movilidad/> },
    { path: '/alertas', element: <Alertas/> },
    { path: '/informacion', element: <Informacion/> },
    { path: '/redes', element: <Redes/> },
  ]);
  return routes;
};

function App() {
  return (
    <AppProviders>
      <IndicadoresProvider>
        <SegmentacionProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SegmentacionProvider>
      </IndicadoresProvider>
    </AppProviders>
  );
}

export default App;
