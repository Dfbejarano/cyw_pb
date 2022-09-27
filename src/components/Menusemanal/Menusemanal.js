import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Menusemana from "../../imagenes/menu.png"

function Menusemanal() {
    return (
        <div class ='container-home'>
        <Header/>
            <div class ='barra-azul'>
                <p>Si tiene alguna dificultad reportelo a crepero@crepesywaffles.com, Gracias</p>
            </div>
            <div class ='white-seccion'>
                <div class ='primer-white-seccion'>
                    <img src={Menusemana} alt='Menu interno'/>
                </div>
            </div>
            <Footer />
        </div>

    )
    }

export default Menusemanal;