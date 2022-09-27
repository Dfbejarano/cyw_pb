import React, { useState, Component } from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {Dropdown,Menu,DropdownMenu,DropdownItem, Image} from "semantic-ui-react";
import "./Recetas.css";
import Cretopos from "../../imagenes/cretopos.jpg";
import Tostada_guacate from "../../imagenes/Tostada_guacate.jpg";
import Banner_heladeria from "../../imagenes/Banner_heladeria.jpg";

function Recetas() {

    const [centroOp, setcentroOp] = useState("");

    return (
        <div class ='container-home'>
        <Header/>
            <div class ='menu-main'>
                <Menu widths={4} >
                    <Menu.Item
                    name='Restaurante'
                    onClick={() => (setcentroOp("Restaurante"))}
                    />
                    <Menu.Item
                    name='Artesano'
                    onClick={() => (setcentroOp("Artesano"))}
                    />
                    <Menu.Item
                    name='Heladería'
                    onClick={() => (setcentroOp("Heladerias"))}
                    />
                    <Menu.Item
                    name='Heladería aeropuerto'
                    onClick={() => (setcentroOp("Heladería Aeropuerto"))}
                    />
                </Menu>
                <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{centroOp}</h1>
                {centroOp == "Restaurante" ?
                <>
                    <Image className="banner-menu" src={Cretopos} />
                    <Menu >
                        <Dropdown item text="Sal">
                            <DropdownMenu >
                                <Dropdown.Item>Sopas</Dropdown.Item>
                                <Dropdown.Item>Entradas</Dropdown.Item>
                                <Dropdown item text="Crepes de Sal" >
                                    <DropdownMenu>
                                        <Dropdown.Item >Vegetarianos</Dropdown.Item>
                                        <Dropdown.Item>Clásicos</Dropdown.Item>
                                        <Dropdown.Item>Pollo</Dropdown.Item>
                                        <Dropdown.Item>Carne</Dropdown.Item>
                                        <Dropdown.Item>Frutos del mar</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown.Item>Pannecook</Dropdown.Item>
                                <Dropdown.Item>Mini Pannecook</Dropdown.Item>
                                <Dropdown.Item>Ensaladas</Dropdown.Item>
                                <Dropdown.Item>Pitas</Dropdown.Item>
                                <Dropdown.Item>Infantiles</Dropdown.Item>
                                <Dropdown item text="Brunch" >
                                    <DropdownMenu>
                                        <Dropdown.Item >Huevos</Dropdown.Item>
                                        <Dropdown.Item>Crepes</Dropdown.Item>
                                        <Dropdown.Item>Infantiles</Dropdown.Item>
                                        <Dropdown.Item>Otras opciones</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown item text="Dulce" scrolling="1">
                            <DropdownMenu >
                                <Dropdown.Item>Copas de Helado</Dropdown.Item>
                                <Dropdown.Item>Crepes Dulce</Dropdown.Item>
                                <Dropdown.Item>Waffles</Dropdown.Item>
                                <Dropdown.Item>Mini Waffles</Dropdown.Item>
                                <Dropdown.Item>Gofres</Dropdown.Item>
                                <Dropdown.Item>Crepes Tradicionales</Dropdown.Item>
                                <Dropdown.Item>Mas Delicias</Dropdown.Item>
                                <Dropdown.Item>Cheese Crepes</Dropdown.Item>
                                <Dropdown.Item>Caprichos</Dropdown.Item>
                                <Dropdown.Item>Crepes Especiales</Dropdown.Item>
                                <Dropdown.Item>Amantes del Chocolate</Dropdown.Item>
                                <Dropdown.Item>Tartufini</Dropdown.Item>
                                <Dropdown.Item>Glases Deco</Dropdown.Item>
                                <Dropdown.Item>Italianos</Dropdown.Item>
                                <Dropdown.Item>Copas Gourmet</Dropdown.Item>
                                <Dropdown.Item>Copas Delizzia</Dropdown.Item>
                                <Dropdown.Item>Glamour</Dropdown.Item>
                                <Dropdown.Item>Infantiles</Dropdown.Item>
                                <Dropdown.Item >Brunch - Waffles</Dropdown.Item>
                                <Dropdown.Item>Brunch - Mini waffles</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown item text="Bebidas" >
                            <DropdownMenu >
                                <Dropdown item text="Bebidas Frías" >
                                    <DropdownMenu>
                                        <Dropdown.Item >Jugos y Batidos</Dropdown.Item>
                                        <Dropdown.Item>Embotelladas</Dropdown.Item>
                                        <Dropdown.Item>Licores</Dropdown.Item>
                                        <Dropdown.Item>Sodas</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown.Item>Bebidas Calientes</Dropdown.Item>
                                <Dropdown.Item>Brunch</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                    </Menu>
                </>
                : null
            }
            {centroOp == "Artesano" ?
                <>
                    <Image className="banner-menu" src={Tostada_guacate} />
                    <Menu >
                        <Dropdown item text="Menu Almuerzo" >
                            <DropdownMenu >
                                <Dropdown.Item>Entradas</Dropdown.Item>
                                <Dropdown.Item>Sopas</Dropdown.Item>
                                <Dropdown.Item>Ensaladas y Bowls</Dropdown.Item>
                                <Dropdown.Item>Crepes de sal y otros sabores</Dropdown.Item>
                                <Dropdown item text="Postres" >
                                    <DropdownMenu>
                                        <Dropdown.Item >Gofres</Dropdown.Item>
                                        <Dropdown.Item>Helados</Dropdown.Item>
                                        <Dropdown.Item>Crepes</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown item text="Menu Desayuno">
                            <DropdownMenu >
                                <Dropdown.Item>Huevos</Dropdown.Item>
                                <Dropdown.Item>Crepes y Gofres</Dropdown.Item>
                                <Dropdown.Item>Otros Sabores</Dropdown.Item>
                                <Dropdown.Item>Menu Infantil</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>

                        <Dropdown item text="Bebidas" >
                            <DropdownMenu >
                                <Dropdown.Item>Bebidas frías</Dropdown.Item>
                                <Dropdown.Item>Bebidas Calientes</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                    </Menu>
                </>
                : null
            }
            {centroOp == "Heladerias" ?
                <>
                    <Image className='banner-menu' src={Banner_heladeria} />
                    <Menu>
                    <Dropdown item text="Sal" >
                            <DropdownMenu>
                                <Dropdown.Item>Crepes de Sal</Dropdown.Item>
                                <Dropdown.Item>Sopas</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown item text="Dulce">
                            <DropdownMenu>
                                <Dropdown.Item>Helados Infantiles</Dropdown.Item>
                                <Dropdown.Item>Conos y Vasos</Dropdown.Item>
                                <Dropdown.Item>Copas Heladeria</Dropdown.Item>
                                <Dropdown.Item>Gofres Heladeria</Dropdown.Item>
                                <Dropdown.Item>Crepes Dulces</Dropdown.Item>
                                <Dropdown.Item>Otros Sabores</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown item text="Bebidas" >
                            <DropdownMenu>
                                <Dropdown item text="Bebidas Frías">
                                    <DropdownMenu>
                                        <Dropdown.Item>Jugos y Batidos</Dropdown.Item>
                                        <Dropdown.Item>Embotelladas</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown.Item>Bebidas Calientes</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                    </Menu>
                </>
                : null
            }
            {centroOp == "Heladería Aeropuerto" ?
                <>
                    <Image className='banner-menu' src={Banner_heladeria} />
                    <Menu>
                        <Dropdown item text="Sal" >
                            <DropdownMenu>
                                <Dropdown.Item>Crepes de sal</Dropdown.Item>
                                <Dropdown.Item>Sopas</Dropdown.Item>
                                <Dropdown.Item>Pitas</Dropdown.Item>
                                <Dropdown.Item>Ensaladas</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown item text="Dulce">
                            <DropdownMenu>
                                <Dropdown.Item>Helados Infantiles</Dropdown.Item>
                                <Dropdown.Item>Conos y Vasos</Dropdown.Item>
                                <Dropdown.Item>Copas Heladeria</Dropdown.Item>
                                <Dropdown.Item>Gofres Heladeria</Dropdown.Item>
                                <Dropdown.Item>Crepes Dulces</Dropdown.Item>
                                <Dropdown.Item>Otros Sabores</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown item text="Bebidas" >
                            <DropdownMenu>
                                <Dropdown item text="Bebidas Frías">
                                    <DropdownMenu>
                                        <Dropdown.Item>Jugos y Batidos</Dropdown.Item>
                                        <Dropdown.Item>Embotelladas</Dropdown.Item>
                                    </DropdownMenu>
                                </Dropdown>
                                <Dropdown.Item>Bebidas Calientes</Dropdown.Item>
                                <Dropdown.Item>Brunch</Dropdown.Item>
                            </DropdownMenu>
                        </Dropdown>
                    </Menu>
                </>
                : null
            }
            </div>
            <Footer />
        </div>

    )
    }

export default Recetas;