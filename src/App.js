import { React, Fragment } from 'react';
import './App.css';
import SoporteRouter from './routes/SoporteRouter';
import ProyectoRouter from './routes/ProyectoRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <SoporteRouter></SoporteRouter>
      <ProyectoRouter />
    </Fragment>
  );
}

export default App;
