import { useState } from "react";
import * as React from 'react';
import logo from "../../imagenes/LogoMoneda.png";
import { Button, Icon } from 'semantic-ui-react'
import './Login.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

function App() {

  // Cambiar de página
  const navigate = useNavigate();

  //Api users

  // estados de login
  const [user, setuser] = useState();
  const [passw, setpass] = useState();
  const [confirmed, setconfirmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);


  function handleSubmit2 () {
    setOpen3(true);
  }

  function handleSubmit (e) {
    
    if (open3) {
      navigate('/home');
      localStorage.setItem("confirmed", "false");
      localStorage.setItem("Recetas", "false");
      localStorage.setItem("Ventas", "false");
      localStorage.setItem("Punto_venta", "false");
      localStorage.setItem("modificador_recetas", "false");
      localStorage.setItem("modificador_pdv", "false");
      localStorage.setItem("modificador_pdv", "false");
      localStorage.setItem("modificador_productos", "false");
    } 
    else{    
        //preventDefault para que el formulario no renderice
        e.preventDefault();
        if (user && passw) {
          axios({
          method: 'GET',
          url: `http://192.168.181.41:8090/api/usuarios?filters[usuario][$eq]=${user}`
        }).then((response) => {
          if (passw == response.data.data.map(attrib => attrib.attributes.contrasena)) {
            window.localStorage.setItem('confirmed', "true");
            window.localStorage.setItem('Recetas', response.data.data.map(attrib => attrib.attributes.Recetas));
            window.localStorage.setItem('Ventas', response.data.data.map(attrib => attrib.attributes.Ventas));
            window.localStorage.setItem('Punto_venta', response.data.data.map(attrib => attrib.attributes.Punto_venta));
            window.localStorage.setItem('modificador_recetas', response.data.data.map(attrib => attrib.attributes.modificador_recetas));
            window.localStorage.setItem('modificador_pdv', response.data.data.map(attrib => attrib.attributes.modificador_pdv));
            window.localStorage.setItem('modificador_productos', response.data.data.map(attrib => attrib.attributes.modificador_productos));
            navigate('/home');
          } 
          else{
            setOpen(false);
            setOpen2(true);
          }
      }).catch(
        function (error) {
          setOpen2(true);
        }
      )
    }
    else{
      setOpen(true);
    }
  }
  }


    function handleChangeUser(event) {
      setuser(event.target.value);
    }

    function handleChangePassw(event) {
      setpass(event.target.value);
    }


  return (
    <div class ="login-container">
      <div class ="login">
            <form name="form" onSubmit={handleSubmit}>
            <img src={logo} alt='Icon Crepes y Waffles'/>
            <h2>INTRANET CREPES Y WAFFLES</h2>
            <div class ="form-group">
                <label style={{fontSize: '15px'}}>Usuario Intranet</label>
                <input 
                type="text" 
                value={user} 
                style={{fontSize: '15px'}}
                placeholder='Ingrese su usuario' 
                onChange={handleChangeUser}/>
            </div>
            <div class ="form-group">
                <label style={{fontSize: '15px'}}>Contraseña</label>
                <input 
                type="password" 
                style={{fontSize: '15px'}}
                value={passw} 
                placeholder='Ingrese su contraseña' 
                onChange={handleChangePassw}/>
            </div>
            <Button animated >
              <Button.Content visible >Inicio sesión</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>
            <h3></h3>
            <Button animated onClick={handleSubmit2}>
              <Button.Content visible >Iniciar sin autenticar</Button.Content>
              <Button.Content hidden>
                <Icon name='arrow right' />
              </Button.Content>
            </Button>      
            <h3>Ingresar sin autenticar limita los accesos</h3>
            </form>
            <Snackbar
              open={open}
              resumeHideDuration={180}
              message="Usuario o contraseña no ingresado"
            />
            <Snackbar
            open={open2}
            resumeHideDuration={180}
            message="Usuario o contraseña incorrecta"
            />
        </div>
    </div>
    
  );
};

export default App;
