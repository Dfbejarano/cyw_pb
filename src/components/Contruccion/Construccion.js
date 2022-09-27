import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Imageconstr from "../../imagenes/EspacioConstruccion.png"

function Construccion() {
    return (
        <div class ='container-home'>
        <Header/>
            <div class ='barra-azul'>
                <p>Si tiene alguna dificultad reportelo a crepero@crepesywaffles.com, Gracias</p>
            </div>
            <div class ='white-seccion'>
                <div class ='primer-white-seccion'>
                    <img src={Imageconstr} alt='Imagen construccion'/>
                </div>
            </div>
            <Footer />
        </div>

    )
    }

export default Construccion;