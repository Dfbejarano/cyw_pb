import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Pagenotfound from './pages/Pagenotfound/Pagenotfound';
import Login from './pages/Login/Login';
import Powerbi from './pages/Power-bi/Power-bi';
import Ventas2 from './pages/Ventas/Ventas';
import ProductosAloha from './pages/ProductosAloha/ProductosAloha';
import Puntosventaaloha from './pages/Puntosventaaloha/Puntosventaaloha';
import Loading from './components/Loading/Loading';
import Contruccion from './components/Contruccion/Construccion';
import Menusemanal from './components/Menusemanal/Menusemanal';
import Recetas from './pages/Recetas/Recetas';
import ModRecetas from './pages/ModRecetas/ModRecetas';
import 'semantic-ui-css/semantic.min.css';
import "./App.css";

  const App = () => {
  
    // Set loading state to true initially
    const [loading, setLoading] = useState(true);
      
    useEffect(() => {
      setLoading(false);
    }, [])
      
    // If page is in loading state, display 
    // loading message. Modify it as per your 
    // requirement.
    if (loading) {
    return (
      <Loading />
    )
  }
  else {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<Login />} />
        <Route path="/home" element ={<Home />} />
        <Route path="/ventas" element ={<Powerbi />} />
        <Route path="/productosAloha" element ={<ProductosAloha />} />
        <Route path="/puntosventaaloha" element ={<Puntosventaaloha />} />
        <Route path="/enconstruccion" element ={<Contruccion />} />
        <Route path="/menusemanal" element ={<Menusemanal />} />
        <Route path="/recetas" element ={<Recetas />} />
        <Route path="/modrecetas" element ={<ModRecetas />} />
        <Route path="*" element ={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}
}

export default App;
