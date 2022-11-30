import { React, Fragment } from 'react';
import './App.css';
import NavbarSoporte from './components/navbarSoporte/NavbarSoporte';
import NavbarRecursos from './components/navbarRecursos/NavbarRecursos';
import SoporteRouter from './routes/SoporteRouter';
import RecursosRouter from './routes/RecursosRouter';
import ProyectoRouter from './routes/ProyectoRouter';
import IndexRouter from './routes/IndexRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <IndexRouter />
      <SoporteRouter></SoporteRouter>
      <RecursosRouter></RecursosRouter>
      <ProyectoRouter />
    </Fragment>
  );
}

export default App;
