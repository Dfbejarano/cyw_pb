import React from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../Home/Home.css";
import {Image} from "semantic-ui-react";
import Servicios from "../../components/servicios/Servicios"
//import Noticias from "../../components/noticias/Noticias"


function Home() {
    return (
        <div class ='container-home'>
        <Header/>
            <div class ='barra-azul'>
                <p>Si tiene alguna dificultad reportelo a crepero@crepesywaffles.com, Gracias</p>
            </div>
            <div class ='white-seccion'>
                <div class ='primer-white-seccion'>
                    <h1>BIENVENIDOS A NUESTRA NUEVA INTRANET OPERATIVA</h1>
                    <h4>Este portal fue creado para mejorar la experiencia diaria de consulta de todos los miembros de CYW.</h4>
                </div>
                <Image size="big" class ="imagen-bienvenida"src="https://crepesywaffles.com/sites/default/files/2021-03/banner%20empresas%20b-03-min%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%281%29%20%282%29-compressed%20%282%29.jpg"/>
            </div>
            <Footer />
        </div>

    )
    }

export default Home;

