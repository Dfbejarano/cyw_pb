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
  const baseURL = "http://192.168.181.41:1337/api/auth/local";


  // estados de login
  const [email, setuser] = useState();
  const [passw, setpass] = useState();
  const [confirmed, setconfirmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  function handleSubmit (e) {
    console.log(confirmed);
        //preventDefault para que el formulario no renderice
        e.preventDefault();
        if (email && passw) {
          axios({
          method: 'POST',
          url: baseURL,
          data: {
            identifier: `${email}`, 
            password: `${passw}`, 
          }
        }).then((response) => {
          setconfirmed(response.data.user.confirmed);
          setconfirmed(response.data.user.confirmed);

          if (response.data.user.confirmed) {
            window.localStorage.setItem('Role', response.data.user.Role);
            window.localStorage.setItem('confirmed', response.data.user.confirmed);
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
                <label style={{fontSize: '15px'}}>Correo Crepes</label>
                <input 
                type="email" 
                value={email} 
                style={{fontSize: '15px'}}
                placeholder='Ingrese su correo de dominio crepes' 
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
            <Button animated href='http://localhost:3000/home'>
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
