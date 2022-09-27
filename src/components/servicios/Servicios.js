import React from 'react';
import {Image} from "semantic-ui-react"
import "./Servicios.css"
import { Link } from "react-router-dom";


export default function Servicios() {
    
    const LinkStyle = {
        textDecoration: "none",
        color: "#523629",
        textColor: "white",
        fontFamily: "Arial",
        fontSize: "18px",
      };
      
    
  return (
    <div>
        <div className='main-servicios'>
        {localStorage.getItem("Ventas") === "true" ? 
        <div className='banner-servicios'>
        <h5>VENTAS</h5>
        <Image className='img-servicios' src="https://crepesywaffles.com/sites/default/files/2021-02/Banner-Home.jpg" />
        <button className='button-servicios'><Link style={LinkStyle}>Ver más</Link></button>
        </div>
        : null}
        {localStorage.getItem("Recetas") === "true" ? 
        <div className='banner-servicios'>
        <h5>RECETAS</h5>
        <Image className='img-servicios' src="https://crepesywaffles.com/themes/custom/tecsua/images/banners/b_filosofia.jpg" />
        <button className='button-servicios'><Link style={LinkStyle}>Ver más</Link></button>
        </div>
        : null}
        <div className='banner-servicios'>
        <h5>DIRECTORIO</h5>
        <Image className='img-servicios' src="https://crepesywaffles.com/themes/custom/tecsua/images/banners/b_apoyo.jpg" />
        <button className='button-servicios'><Link style={LinkStyle}>Ver más</Link></button>
        </div>
        {localStorage.getItem("Disponibles") === "true" ? 
        <div className='banner-servicios'>
        <h5>DISPONIBLES</h5>
        <Image className='img-servicios' src="https://crepesywaffles.com/sites/default/files/2019-02/BannersBlog_AcademiaDeLasArtes_V4_01.jpg" />
        <button className='button-servicios'><Link style={LinkStyle}>Ver más</Link></button>
        </div>
        : null}
        </div>
    </div>
  )
}
