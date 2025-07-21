import { useRoutes, BrowserRouter, Navigate } from 'react-router-dom'
import reactLogo from './assets/react.svg';
import Home from './pages/Home';
import viteLogo from '/vite.svg';
import './App.css';

const AppRoutes = () => { 

  const routes = useRoutes([
    { path: '/', element: <Home/>},
    ]);
  return routes;
};

function App() {


  return (
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>
  )
}

export default App
