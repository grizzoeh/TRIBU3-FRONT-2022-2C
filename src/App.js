import { React, Fragment } from 'react';
import './App.css';
import SoporteRouter from './routes/SoporteRouter';
import ProyectoRouter from './routes/ProyectoRouter';
import IndexRouter from './routes/IndexRouter';


function App() {
  return (
    //insert navbar compnent
    <Fragment>
      <IndexRouter />
      <SoporteRouter></SoporteRouter>
      <ProyectoRouter />
    </Fragment>
  );
}

export default App;
