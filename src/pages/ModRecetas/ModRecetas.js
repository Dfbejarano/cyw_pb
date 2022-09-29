import React, {useRef}  from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import axios from 'axios';
import "./ModRecetas.css";

import {Menu, Form, Message, Icon} from "semantic-ui-react";

import Box from '@mui/material/Box';
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton  } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import Modal from 'react-modal';

const urlvideos = "http://192.168.181.41:1337/api/productos?populate[0]=video&filters[tienevideo][$eq]=true&pagination[pageSize]=200";
const urlinstructivos = "http://192.168.181.41:1337/api/productos?populate[0]=instructivo&filters[tieneinstructivo][$eq]=true&pagination[pageSize]=200";


export default function App() {

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    
    async (newRow) => {
      console.log(newRow);
      let newRow2 = {
        data: {artesano: newRow.artesano, categoria: newRow.categoria, heladeria: newRow.heladeria, 
          linea:newRow.linea, nombre:newRow.name, restaurante: newRow.restaurante, subcategoria: newRow.subcategoria}
      }
      console.log(newRow2);
      await axios({
        method: 'PUT',
        url: `http://192.168.181.41:1337/api/productos/${newRow.id}`,
        data: newRow2,
        mode: 'no-cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
    }).then((res) => {
      console.log(res);
      return res;
    })
    
    .catch((e) => {
      console.log(e);
      return e;
    });
      setSnackbar({ children: 'Producto actualizado exitosamente', severity: 'success' });
    },
  );


  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
    console.log(error.message);
  }, []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [mergerows, setmergerows] = React.useState();
  const [mergerows2, setmergerows2] = React.useState();

  const [centroOp, setcentroOp] = React.useState();

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpen2, setIsOpen2] = React.useState(false);

  const [videoOpen, setIvideoOpen] = React.useState();

  const [instructivoOpen, setIinstructivoOpen] = React.useState();

  const [openConfirmation, setopenConfirmation] = React.useState(false);

  const [productoEliminar, setproductoEliminar] = React.useState();

  const [productoidEliminar, setproductoidEliminar] = React.useState();

  const Loadingwaiting = () => (
    <Loading/>
  );

  function openModal(event, cellValues) {
    setIsOpen(true);
    setIvideoOpen(cellValues.value);
  }

  function eliminar(event, cellValues) {
    console.log(cellValues.row);
    setproductoEliminar(cellValues.row.name);
    setproductoidEliminar(cellValues.row.id);
    setopenConfirmation(true);
  }

  const handleCloseConfirmation = () => {
    setopenConfirmation(false);
  };

  const processdelete = React.useCallback(
      async () => {
        await axios({
          method: 'DELETE',
          url: `http://192.168.181.41:1337/api/productos/${productoidEliminar}`,
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          }
      }).then((res) => {
        console.log(res);
        return res;
      })
      
      .catch((e) => {
        console.log(e);
        return e;
      });
        setSnackbar({ children: 'Producto eliminado  exitosamente', severity: 'success' });
        setopenConfirmation(false);
        setmergerows(mergerows.filter((row) => row.id !== productoidEliminar));
        setmergerows2(mergerows2.filter((row) => row.id !== productoidEliminar));
        console.log(mergerows);
      },
  );

  function openModal2(event, cellValues) {
    setIsOpen2(true);
    setIinstructivoOpen(cellValues.value);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModal2() {
    setIsOpen2(false);
  }

  React.useEffect(() => {
    
    axios({
      method: 'GET',
      url: urlvideos
    }).then((response) => {
      const productid = response.data.data.map(product => product.id); 
      const productoname = response.data.data.map(product => product.attributes.nombre); 
      const restaura = response.data.data.map(product => product.attributes.Restaurante);
      const artes = response.data.data.map(product => product.attributes.Artesano); 
      const helade = response.data.data.map(product => product.attributes.Heladeria); 
      const li = response.data.data.map(product => product.attributes.Linea); 
      const catego = response.data.data.map(product => product.attributes.Categoria); 
      const subcatego = response.data.data.map(product => product.attributes.Subcategoria);
      const videos = response.data.data.map(product => "http://192.168.181.41:1337" + product.attributes.video.data.attributes.url);
      const mergeArray = [];
      for (let  i = 0; i < productid.length; i++) {
        mergeArray[i] = { id: productid[i], name: productoname[i], restaurante: restaura[i], artesano:artes[i], heladeria: helade[i],
          linea:li[i], categoria:catego[i], subcategoria: subcatego[i], video: videos[i]};
      }
      setmergerows(mergeArray); 
    });
    axios({
      method: 'GET',
      url: urlinstructivos
    }).then((response) => { 
      const productid = response.data.data.map(product => product.id); 
      const productoname = response.data.data.map(product => product.attributes.nombre); 
      const restaura = response.data.data.map(product => product.attributes.Restaurante);
      const artes = response.data.data.map(product => product.attributes.Artesano); 
      const helade = response.data.data.map(product => product.attributes.Heladeria); 
      const li = response.data.data.map(product => product.attributes.Linea); 
      const catego = response.data.data.map(product => product.attributes.Categoria); 
      const subcatego = response.data.data.map(product => product.attributes.Subcategoria);
      const instructivo = response.data.data.map(product => "http://192.168.181.41:1337" + product.attributes.instructivo.data.attributes.url); 
      const mergeArray2 = [];
      for (let  i = 0; i < productid.length; i++) {
        mergeArray2[i] = { id: productid[i], name: productoname[i], restaurante: restaura[i], artesano:artes[i], heladeria: helade[i],
          linea:li[i], categoria:catego[i], subcategoria: subcatego[i], instructivo: instructivo[i] };
      }
      setmergerows2(mergeArray2); 
    });
    console.log(isLoading);

    const timer = setTimeout(() => {
      setIsLoading(true)
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
      </GridToolbarContainer>
    );
  }

  const options1 = [
    { key: 't', text: 'Si', value: 'true' },
    { key: 'f', text: 'No', value: 'false' },
  ]

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, type: 'number'},
    { field: 'name', headerName: 'NOMBRE PRODUCTO', editable: true, width: 200},
    {field: 'restaurante', headerName: 'RESTAURANTE',width: 120, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'artesano', headerName: 'ARTESANO',width: 100, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'heladeria', headerName: 'HELADERIA',width: 100, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'heladeria_aeropuerto', headerName: 'HELADERIA AEROPUERTO',width: 140, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'linea', headerName: 'LINEA',width: 100, editable: true, type: 'singleSelect', valueOptions: ({ row }) => {
      return row.artesano === 'true'
        ? ['Menu Almuerzo', 'Menu Desayuno', 'Bebidas']
        : ['Sal', 'Dulce', 'Bebidas'];}},
    {field: 'categoria', headerName: 'CATEGORIA',width: 150, editable: true, type: 'singleSelect',  valueOptions: ({ row }) => {
      if (row.restaurante === 'true' && row.linea === 'Sal'){
        return ['Sopas', 'Entradas', 'Crepes de Sal', 'Pannecook', 'Mini Pannecook', 'Ensaladas', 'Pitas', 'Infantiles', 'Brunch']
      }
      if (row.restaurante === 'true' && row.linea === 'Dulce'){
        return ['Copas de Helado', 'Crepes Dulce', 'Waffles', 'Mini Waffles', 'Gofres', 'Crepes Tradicionales', 'Mas Delicias', 'Cheese Crepes', 'Caprichos', 'Crepes Especiales', 'Amantes del Chocolate',
        'Tartufini', 'Glases Deco', 'Italianos', 'Copas Gourmet', 'Copas Delizzia', 'Glamour', 'Infantiles', 'Brunch - Waffles', 'Brunch - Mini waffles']
      }
      if (row.restaurante === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes', 'Waffles', 'Brunch']
      }
      if (row.artesano === 'true' && row.linea === 'Menu Almuerzo'){
        return ['Entradas', 'Sopas', 'Ensaladas y Bowls', 'Crepes de sal y otros sabores', 'Postres']
      }
      if (row.artesano === 'true' && row.linea === 'Menu Desayuno'){
        return ['Huevos', 'Crepes y Gofres', 'Otros Sabores', 'Menu Infanti']
      }
      if (row.artesano === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas frías', 'Bebidas Calientes']
      }
      if (row.heladeria === 'true' && row.linea === 'Sal'){
        return ['Crepes de Sal', 'Sopas']
      }
      if (row.heladeria === 'true' && row.linea === 'Dulce'){
        return ['Helados Infantiles', 'Conos y Vasos', 'Copas Heladeria', 'Gofres Heladeria', 'Crepes Dulces', 'Otros Sabores']
      }
      if (row.heladeria === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Sal'){
        return ['Crepes de sal', 'Sopas', 'Pitas', 'Ensaladas']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Dulce'){
        return ['Helados Infantiles', 'Conos y Vasos', 'Copas Heladeria', 'Gofres Heladeria', 'Crepes Dulces', 'Otros Sabores']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes', 'Brunch']
      }
      else {
        return ['Sin seleccion ']
      }}},
    {field: 'subcategoria', headerName: 'SUBCATEGORIA',width: 150, editable: true, type: 'singleSelect', valueOptions: ({ row }) => {
      if (row.restaurante === 'true' && row.categoria === 'Crepes de Sal'){
        return ['Vegetarianos', 'Clásicos', 'Pollo', 'Carne', 'Frutos del mar']
      }
      if (row.restaurante === 'true' && row.categoria === 'Brunch'){
        return ['Huevos', 'Crepes', 'Infantiles', 'Otras opciones']
      }
      if (row.restaurante === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas', 'Licores', 'Sodas']
      }
      if (row.artesano === 'true' && row.categoria === 'Postres'){
        return ['Gofres', 'Helados', 'Crepes']
      }
      if (row.Heladerias === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas']
      }
      if (row.heladeria_aeropuerto === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas']
      }
      else {
        return ['Sin seleccion ']
      }}},
    { field: 'video', headerName: 'VIDEO',width: 100, 
    renderCell: (cellValues) => (
      <div> 
        <Button variant="contained" size="small" color="primary" onClick={(event) => {openModal(event, cellValues);}}>VER</Button>
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} ariaHideApp={false} contentLabel="ModalVideo" style={{
                overlay: {position: 'fixed', display: 'flex',alignItems: 'center',justifyContent: 'center'},
                content: {width: '90%',height: '90%',top: "50%",left: "50%", textAlign: "center", position: 'center',
                border: '1px solid #ccc',borderRadius: '3rem',
                }}}>
        <h2>VIDEO</h2>
        <video src={videoOpen} width="90%" height="80%" controls="controls" type="video/mp4"/>
        <h2></h2>
        <Button variant="contained" size="small" color="primary" onClick={closeModal}>Cerrar</Button>
      </Modal>
      </div>
    ),},
    { field: 'eliminar', headerName: 'ELIMINAR',width: 130, 
    renderCell: (cellValues) => (
      <div> 
        <Button variant="contained" size="small" color="primary" onClick={(event) => {eliminar(event, cellValues);}}>ELIMINAR</Button>
        <Dialog
          open={openConfirmation}
          onClose={handleCloseConfirmation}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Esta seguro(a)?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Confirma que esta seguro(a) en eliminar el producto {productoEliminar}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={processdelete}>ELIMINAR</Button>
            <Button onClick={handleCloseConfirmation} autoFocus>CANCELAR</Button>
          </DialogActions>
        </Dialog>
      </div>
    ),}
  ]

  const columns2 = [
    { field: 'id', headerName: 'ID', width: 80, type: 'number'},
    { field: 'name', headerName: 'NOMBRE PRODUCTO', editable: true, width: 200},
    {field: 'restaurante', headerName: 'RESTAURANTE',width: 120, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'artesano', headerName: 'ARTESANO',width: 100, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'heladeria', headerName: 'HELADERIA',width: 100, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'heladeria_aeropuerto', headerName: 'HELADERIA AEROPUERTO',width: 140, editable: true, type: 'singleSelect', valueOptions:['true']},
    {field: 'linea', headerName: 'LINEA',width: 100, editable: true, type: 'singleSelect', valueOptions: ({ row }) => {
      return row.artesano === 'true'
        ? ['Menu Almuerzo', 'Menu Desayuno', 'Bebidas']
        : ['Sal', 'Dulce', 'Bebidas'];}},
    {field: 'categoria', headerName: 'CATEGORIA',width: 150, editable: true, type: 'singleSelect',  valueOptions: ({ row }) => {
      if (row.restaurante === 'true' && row.linea === 'Sal'){
        return ['Sopas', 'Entradas', 'Crepes de Sal', 'Pannecook', 'Mini Pannecook', 'Ensaladas', 'Pitas', 'Infantiles', 'Brunch']
      }
      if (row.restaurante === 'true' && row.linea === 'Dulce'){
        return ['Copas de Helado', 'Crepes Dulce', 'Waffles', 'Mini Waffles', 'Gofres', 'Crepes Tradicionales', 'Mas Delicias', 'Cheese Crepes', 'Caprichos', 'Crepes Especiales', 'Amantes del Chocolate',
        'Tartufini', 'Glases Deco', 'Italianos', 'Copas Gourmet', 'Copas Delizzia', 'Glamour', 'Infantiles', 'Brunch - Waffles', 'Brunch - Mini waffles']
      }
      if (row.restaurante === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes', 'Waffles', 'Brunch']
      }
      if (row.artesano === 'true' && row.linea === 'Menu Almuerzo'){
        return ['Entradas', 'Sopas', 'Ensaladas y Bowls', 'Crepes de sal y otros sabores', 'Postres']
      }
      if (row.artesano === 'true' && row.linea === 'Menu Desayuno'){
        return ['Huevos', 'Crepes y Gofres', 'Otros Sabores', 'Menu Infanti']
      }
      if (row.artesano === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas frías', 'Bebidas Calientes']
      }
      if (row.heladeria === 'true' && row.linea === 'Sal'){
        return ['Crepes de Sal', 'Sopas']
      }
      if (row.heladeria === 'true' && row.linea === 'Dulce'){
        return ['Helados Infantiles', 'Conos y Vasos', 'Copas Heladeria', 'Gofres Heladeria', 'Crepes Dulces', 'Otros Sabores']
      }
      if (row.heladeria === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Sal'){
        return ['Crepes de sal', 'Sopas', 'Pitas', 'Ensaladas']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Dulce'){
        return ['Helados Infantiles', 'Conos y Vasos', 'Copas Heladeria', 'Gofres Heladeria', 'Crepes Dulces', 'Otros Sabores']
      }
      if (row.heladeria_aeropuerto === 'true' && row.linea === 'Bebidas'){
        return ['Bebidas Frías', 'Bebidas Calientes', 'Brunch']
      }
      else {
        return ['Sin seleccion ']
      }}},
    {field: 'subcategoria', headerName: 'SUBCATEGORIA',width: 150, editable: true, type: 'singleSelect', valueOptions: ({ row }) => {
      if (row.restaurante === 'true' && row.categoria === 'Crepes de Sal'){
        return ['Vegetarianos', 'Clásicos', 'Pollo', 'Carne', 'Frutos del mar']
      }
      if (row.restaurante === 'true' && row.categoria === 'Brunch'){
        return ['Huevos', 'Crepes', 'Infantiles', 'Otras opciones']
      }
      if (row.restaurante === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas', 'Licores', 'Sodas']
      }
      if (row.artesano === 'true' && row.categoria === 'Postres'){
        return ['Gofres', 'Helados', 'Crepes']
      }
      if (row.Heladerias === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas']
      }
      if (row.heladeria_aeropuerto === 'true' && row.categoria === 'Bebidas Frías'){
        return ['Jugos y Batidos', 'Embotelladas']
      }
      else {
        return ['Sin seleccion ']
      }}},
    { field: 'instructivo', headerName: 'INSTRUC',width: 100, 
    renderCell: (cellValues) => (
      <div> 
        <Button variant="contained" size="small" color="primary" onClick={(event) => {openModal2(event, cellValues);}}> VER</Button>
        <Modal isOpen={modalIsOpen2} onRequestClose={closeModal2} ariaHideApp={false} contentLabel="ModalVideo" style={{
                overlay: {position: 'fixed', display: 'flex',alignItems: 'center',justifyContent: 'center'},
                content: {width: '90%',height: '90%',top: "50%",left: "50%", textAlign: "center", position: 'center',
                border: '1px solid #ccc',borderRadius: '3rem',
                }}}>
        <h2>INSTRUCTIVO</h2>  
        <img src={instructivoOpen} ></img>
        <h2></h2>
        <Button variant="contained" size="small" color="primary" onClick={closeModal2}>Cerrar</Button>
      </Modal>
      </div>
    ),},
    { field: 'eliminar', headerName: 'ELIMINAR',width: 130, 
    renderCell: (cellValues) => (
      <div> 
        <Button variant="contained" size="small" color="primary" onClick={(event) => {eliminar(event, cellValues);}}>ELIMINAR</Button>
      </div>
    ),}
  ]

  const [uploadfile, setuploadfile] = React.useState(null);

  const [urlfile, seturlfile] = React.useState();

  const [messageupload, setmessageupload] = React.useState(false);

  const handleChange = (event) => {
    setuploadfile({file: event.target.files[0]})
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("file submit", uploadfile.file);
    let file = new FormData();
    file.append("files",  uploadfile.file);

    const upload = await axios({
      method : 'POST',
      url : 'http://192.168.181.41:1337/api/upload/',
      data: file
    })
    .then((response) => {
      seturlfile(response.data[0].id);
      })
      .catch((error)=>{
        console.log(error);
    })
    setuploadfile(null);
    setmessageupload(true);
  }
  
  return (
      isLoading ? 
      <div>
          <Header/>
          <div className='table-product'>
            <p style={{backgroundColor: "lightblue",marginTop:"2%", marginLeft:"2%", marginRight:"2%"}} className='description'
            >IMPORTANTE: La opcíon de columns le va a permitir quitar columnas, filter le va a permitir filtrar, density le
            va a permitir reducir el espacio de filas, y export le va a permitir exportar la información (debe tener cuidado con 
            esta opcicón en cuanto si exporta con una fila sombreada solo le exportará esta fila) </p>
            <div class ='menu-main'>
              <Menu widths={2} >
                <Menu.Item
                name='VIDEOS'
                onClick={() => (setcentroOp("VIDEOS"))}
                />
                <Menu.Item
                name='INSTRUCTIVOS'
                onClick={() => (setcentroOp("INSTRUCTIVOS"))}
                />
              </Menu>
            </div>
            <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{centroOp}</h1>
                  {centroOp == "VIDEOS" ?
                  <>
                    <Box sx={{ 
                    height: 800, 
                    width: '98%',
                    m: 2 }}>
                    <DataGrid disableIgnoreModificationsIfProcessingProps 
                    getRowId={(mergerows) => mergerows.id}
                    rows={mergerows}
                    columns={columns}
                    pageSize={12}
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    rowsPerPageOptions={[20]}
                    experimentalFeatures={{ newEditingApi: true }}
                    GridToolbar 
                    components={{
                      LoadingOverlay: Loadingwaiting,
                      Toolbar: CustomToolbar,
                      NoRowsOverlay: Loadingwaiting,
                      ErrorOverlay: Loadingwaiting
                    }}
                    />
                          {!!snackbar && (
                    <Snackbar
                      open
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      onClose={handleCloseSnackbar}
                      autoHideDuration={6000}
                    >
                      <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                    )}
                    </Box>
                    <div className='create-products'>
                      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>INGRESAR PRODUCTO CON VIDEO</h1>
                      <p style={{backgroundColor: "lightblue",marginTop:"2%", marginLeft:"2%", marginRight:"2%"}} className='description'
                        >IMPORTANTE: Subir un archivo de video en formato mp4 no mayor a 300 MB y un instructivo en formato JPG </p>
                        <div className='FileUpload'>
                          <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleChange}/>
                            <button>Enviar archivo</button>
                          </form>
                        </div>
                        {messageupload ?
                          <Message
                          success
                          header='Envio exitoso con el siguiente id'
                          content= {urlfile}
                        />
                        :null}
                          <Form>
                            <Form.Group widths='equal'>
                              <Form.Input fluid label='Producto' placeholder='Producto' />
                              <Form.Select
                                fluid
                                label='Restaurante'
                                options={options1}
                                placeholder='Restaurante'
                              />
                              <Form.Select
                                fluid
                                label='Artesano'
                                options={options1}
                                placeholder='Artesano'
                              />
                              <Form.Select
                                fluid
                                label='Heladeria'
                                options={options1}
                                placeholder='Heladeria'
                              />
                              <Form.Select
                                fluid
                                label='Heladeria Aeropuerto'
                                options={options1}
                                placeholder='Heladeria Aeropuerto'
                              />
                              <Form.Select
                                fluid
                                label='Linea'
                                options={options1}
                                placeholder='Linea'
                              />
                              <Form.Select
                                fluid
                                label='Categoria'
                                options={options1}
                                placeholder='Categoria'
                              />
                              <Form.Select
                                fluid
                                label='Subcategoria'
                                options={options1}
                                placeholder='Subcategoria'
                              />
                              <Form.Input fluid label='ID archivo' placeholder='ID archivo' />
                              </Form.Group>
                              <div className='button-final'>
                            <Form.Button>Enviar</Form.Button>
                            </div>
                        </Form>
                          </div>
                </>
          : null
      }
      {centroOp == "INSTRUCTIVOS" ?
                  <>
                    <Box sx={{ 
                    height: 800, 
                    width: '98%',
                    m: 2 }}>
                    <DataGrid disableIgnoreModificationsIfProcessingProps 
                    getRowId={(mergerows2) => mergerows2.id}
                    rows={mergerows2}
                    columns={columns2}
                    pageSize={12}
                    editMode="row"
                    processRowUpdate={processRowUpdate}
                    onProcessRowUpdateError={handleProcessRowUpdateError}
                    rowsPerPageOptions={[20]}
                    experimentalFeatures={{ newEditingApi: true }}
                    GridToolbar 
                    components={{
                      Toolbar: CustomToolbar,
                      LoadingOverlay: Loadingwaiting
                    }}
                    />
                          {!!snackbar && (
                    <Snackbar
                      open
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                      onClose={handleCloseSnackbar}
                      autoHideDuration={6000}
                    >
                      <Alert {...snackbar} onClose={handleCloseSnackbar} />
                    </Snackbar>
                    )}
                    </Box>
                    <div className='create-products'>
                      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>INGRESAR PRODUCTO CON INSTRUCTIVO</h1>
                      <p style={{backgroundColor: "lightblue",marginTop:"2%", marginLeft:"2%", marginRight:"2%"}} className='description'
                        >IMPORTANTE: Subir un archivo de video en formato mp4 no mayor a 300 MB y un instructivo en formato JPG </p>
                        <div className='FileUpload'>
                          <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleChange}/>
                            <button>Enviar archivo</button>
                          </form>
                        </div>
                        {messageupload ?
                          <Message
                          success
                          header='Envio exitoso con el siguiente id'
                          content= {urlfile}
                        />
                        :null}
                          <Form>
                            <Form.Group widths='equal'>
                              <Form.Input fluid label='Producto' placeholder='Producto' />
                              <Form.Select
                                fluid
                                label='Restaurante'
                                options={options1}
                                placeholder='Restaurante'
                              />
                              <Form.Select
                                fluid
                                label='Artesano'
                                options={options1}
                                placeholder='Artesano'
                              />
                              <Form.Select
                                fluid
                                label='Heladeria'
                                options={options1}
                                placeholder='Heladeria'
                              />
                              <Form.Select
                                fluid
                                label='Heladeria Aeropuerto'
                                options={options1}
                                placeholder='Heladeria Aeropuerto'
                              />
                              <Form.Select
                                fluid
                                label='Linea'
                                options={options1}
                                placeholder='Linea'
                              />
                              <Form.Select
                                fluid
                                label='Categoria'
                                options={options1}
                                placeholder='Categoria'
                              />
                              <Form.Select
                                fluid
                                label='Subcategoria'
                                options={options1}
                                placeholder='Subcategoria'
                              />
                              <Form.Input fluid label='ID archivo' placeholder='ID archivo' />
                              </Form.Group>
                              <div className='button-final'>
                            <Form.Button>Enviar</Form.Button>
                            </div>
                        </Form>
                          </div>
                </>
          : null
      }
      </div >
      
        <div className='footer-main'>
        <Footer/>
        </div>
      </div>
      : <Loading/>
  );
}

