import { React, Fragment } from 'react';
import './App.css';
import NavbarSoporte from './components/navbarSoporte/NavbarSoporte';
import SoporteRouter from './routes/SoporteRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <NavbarSoporte></NavbarSoporte>
      <SoporteRouter></SoporteRouter>
    </Fragment>
  );
}

export default App;
