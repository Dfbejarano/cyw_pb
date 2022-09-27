import React from 'react';
import './Loading.css';
import Spinner  from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../imagenes/LogoMoneda.png'
 
function Loading(){
    return(
        <div className='main-loading'>
            <h1 >CARGANDO PÁGINA</h1>
            <img src={Logo} />
                <div className='main-spinner'>
                    <Spinner animation="grow" size="50" style={{ width: "10rem", height: "10rem" }}>
                    <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
        </div>
    )
}
export default Loading