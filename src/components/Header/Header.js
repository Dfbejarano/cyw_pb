import React from 'react';
import { Link, useNavigate  } from "react-router-dom";
import "./Header.css";
import logo from "../../imagenes/LogoMoneda.png";
import { FaSignOutAlt} from "react-icons/fa";
import { AiOutlineContacts, AiOutlineFundProjectionScreen, AiOutlinePhone} from "react-icons/ai";
import { GoChecklist} from "react-icons/go";
import { ImHome} from "react-icons/im";
import { MdOutlineFoodBank} from "react-icons/md";
import {Dropdown,Menu,DropdownMenu,DropdownItem} from "semantic-ui-react";



export default function Layout(props) {

  const navigate  = useNavigate ();

    const Cerrarsesion = (event) => {
      localStorage.setItem("confirmed", "false");
      localStorage.removeItem("Role");
      navigate("/");
    };
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
        
      });
    });
  };
  return (
      <div id="root" class ='menu-header'>
        <Menu stackable>
          <Menu.Item >
            <img alt="logo" src={logo} />
          </Menu.Item>
          <Menu >
            <Dropdown item text='Menu principal' floating>
              <DropdownMenu>
              <DropdownItem 
              as={Link} to="/home"
                ><ImHome size={20}/>
                &nbsp;&nbsp;Home</DropdownItem>
                <DropdownItem 
                disabled={localStorage.getItem("confirmed")==="false"}
                as={Link} to="/ventas"
                ><AiOutlineFundProjectionScreen size={20}/>
                &nbsp;&nbsp;Ventas</DropdownItem>
                <DropdownItem 
                disabled={localStorage.getItem("confirmed")==="false"}
                as={Link} to="/recetas"
                ><MdOutlineFoodBank size={20}/>
                &nbsp;&nbsp;Recetas</DropdownItem>
                <DropdownItem as={Link} to="/enconstruccion"
                ><AiOutlinePhone size={20}/>
                &nbsp;&nbsp;Directorio Administrativo</DropdownItem>
                <DropdownItem as={Link} to="/enconstruccion"
                ><AiOutlinePhone size={20}/>
                &nbsp;&nbsp;Directorio Puntos de venta</DropdownItem>
                <DropdownItem 
                disabled={localStorage.getItem("confirmed")==="false"}
                as={Link} to="/enconstruccion"
                ><AiOutlineContacts size={20}/>
                &nbsp;&nbsp;Disponibles</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Menu>
          <Menu >
            <Dropdown item text='Administración' floating 
                disabled={localStorage.getItem("confirmed")==="false"}
            >
              <DropdownMenu>
                <DropdownItem
                as={Link} to="/enconstruccion"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar disponibles</DropdownItem>
                <DropdownItem
                as={Link} to="/menusemanal"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar Menu</DropdownItem>
                <DropdownItem
                as={Link} to="/enconstruccion"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar directorio administrativo</DropdownItem>
                <DropdownItem
                as={Link} to="/enconstruccion"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar directorio de puntos de venta</DropdownItem>
                <DropdownItem
                as={Link} to="/productosAloha"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar categoria de productos</DropdownItem>
                <DropdownItem
                as={Link} to="/puntosventaaloha"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar información puntos de venta</DropdownItem>
                <DropdownItem
                as={Link} to="/modrecetas"
                disabled={localStorage.getItem("confirmed")==="false"}
                ><GoChecklist size={20}/>
                &nbsp;&nbsp;Modificar receta</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Menu>
          <Menu.Item
            name='sign-in'
            disabled={localStorage.getItem("confirmed")==="false"}
            onClick={() => {
              Cerrarsesion();
              clearCacheData();}}
            position='right'
          ><FaSignOutAlt size={20}/>
            &nbsp;&nbsp;Cerrar sesión
          </Menu.Item>
        </Menu>
      </div>
    )
  }

