import React, { useState, useEffect } from 'react';
import "./Noticias.css"
import apiURL from "../../utils/apiURL"
import { Image } from 'semantic-ui-react';


export default function Noticias() {
    const [noticia, setNoticia] = useState("")
    const [menu,setMenu] = useState("")
    useEffect(() => (
        fetch(`${apiURL}/noticias-principals`)
            .then((res) => res.json())
            .then((res) => setNoticia(res)),
        fetch(`${apiURL}/menu-toberins`)
        .then((res) => res.json())
        .then((res) => setMenu(res))
    ), [])
    const imagene = noticia && noticia.map((img) => (img)).map((img)=>(img.imagen.url))
    const titulo = noticia && noticia.map((img) => (img)).map((img)=>(img.titulo))
    const descripcion = noticia && noticia.map((img) => (img)).map((img)=>(img.descripcion))
    const href = noticia && noticia.map((img) => (img)).map((img)=>(img.href))
    const menu_semanal = menu && menu.map((men)=>(men))[0]
    console.log(menu_semanal)
  return (
    <div className='noticias-main'>
        <Image className="noticias-img"  src={`${apiURL}${imagene}`}/>
        <div className='noticia-descripcion'>
            <h2>{titulo}</h2>
            <p>{descripcion}</p>
            <a href={href} target="_blank"><button className='button-noticias'>Vista nuestra tienda</button></a>
        </div> 
        <div className='menu-semanal'>
          <div className='menu-s'>
          <h2>Menu Semanal</h2>
          <h3>{`Semana del: ${menu_semanal.fecha}`}</h3>
          <h4>Lunes</h4>
          <h5>{`${menu_semanal.Lunes}`}</h5>
          <h4>Martes</h4>
          <h5>{`${menu_semanal.Martes}`}</h5>
          <h4>Miercoles</h4>
          <h5>{`${menu_semanal.Miercoles}`}</h5>
          <h4>Jueves</h4>
          <h5>{`${menu_semanal.Jueves}`}</h5>
          <h4>Viernes</h4>
          <h5>{`${menu_semanal.Viernes}`}</h5>
          <h4>Sabado</h4>
          <h5>{`${menu_semanal.Sabado}`}</h5>
          <h4>Domingo</h4>
          <h5>{`${menu_semanal.Domingo}`}</h5>
          </div>
        </div>
    </div>
  )
}
