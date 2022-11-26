import { React, Fragment } from 'react';
import './App.css';
import NavbarSoporte from './components/navbarSoporte/NavbarSoporte';
import SoporteRouter from './routes/SoporteRouter';
import ProyectoRouter from './routes/ProyectoRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <NavbarSoporte></NavbarSoporte>
      <SoporteRouter></SoporteRouter>
      <ProyectoRouter/>
    </Fragment>
  );
}

export default App;
