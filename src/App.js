import { React, Fragment } from 'react';
import './App.css';
import NavbarSoporte from './components/navbarSoporte/NavbarSoporte';
import NavbarRecursos from './components/navbarRecursos/NavbarRecursos';
import SoporteRouter from './routes/SoporteRouter';
import RecursosRouter from './routes/RecursosRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <NavbarSoporte></NavbarSoporte>
      <NavbarRecursos></NavbarRecursos>
      <SoporteRouter></SoporteRouter>
      <RecursosRouter></RecursosRouter>
    </Fragment>
  );
}

export default App;
