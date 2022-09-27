import React   from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import axios from 'axios';
import "./ProductosAloha.css";


import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const baseURL = "http://192.168.181.23:8080/products";
const baseURL2 = "http://192.168.181.23:8080/products_update";


export default function App() {
  const [post, setPost] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const Loadingwaiting = () => (
    <Loading/>
  );

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      console.log(newRow);
      await axios({
        method: 'PUT',
        url: baseURL2,
        data: newRow,
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

  React.useEffect(() => {
    axios({
      method: 'GET',
      url: baseURL,
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      setPost(response.data);  
      
    });
    const timer = setTimeout(() => {
      setIsLoading(true)
    }, 2000);
    return () => clearTimeout(timer);
  }, []);


  if (!post) return null;

  const columns = [
    { field: 'ItemId', headerName: 'ID PRODUCTO', width: 130, type: 'number'},
    { field: 'LongName', headerName: 'NOMBRE PRODUCTO', width: 300},
    { field: 'Linea de producto', headerName: 'LINEA', editable: true, type: 'singleSelect', width: 180,  
    valueOptions: ['Categorias', 'Linea de Dulce', 'Linea de Sal', 'Anchetas', 'Linea Brunch / Desayuno', 'Bebidas', 'Accesorios', 'CEC',
      'copas', 'Crepes en Casa', 'Empaques', 'materia prima', 'Modificadores', 'Producto Anchetas'],},
    { field: 'Linea de negocio', headerName: 'LINEA DE NEGOCIO', editable: true, type: 'singleSelect', width: 150, valueOptions:['Categorias', 'Heladeria', 'Restaurante',
      'BIKO', 'Artesano', 'CEC', 'Crepes en Casa', 'Empleados'] },
    { field: 'Categoria', headerName: 'CATEGORIA', editable: true, width: 150},
    { field: 'Subcategoria', headerName: 'SUB CATEGORIA', editable: true, type: 'singleSelect', width: 150, valueOptions: ['Artesanos', 'Categorias', 'Conos y Vasos', 
    'Copas', 'Infantiles', 'Vegano']},
    { field: 'ERP', headerName: 'ID ERP', editable: true, width: 110, type: 'number'}
  ]

  return (
    isLoading ? 
    <div>
        <Header/>
        <div className='table-product'>
          <p style={{backgroundColor: "lightblue",marginTop:"2%", marginLeft:"2%", marginRight:"2%"}} className='description'
          >IMPORTANTE: La opcíon de columns le va a permitir quitar columnas, filter le va a permitir filtrar, density le
          va a permitir reducir el espacio de filas, y export le va a permitir exportar la información (debe tener cuidado con 
          esta opcicón en cuanto si exporta con una fila sombreada solo le exportará esta fila) </p>
          <Box sx={{ 
          height: 800, 
          width: '100%',
          m: 2 }}>
          <DataGrid disableIgnoreModificationsIfProcessingProps 
          getRowId={(post) => post.ItemId}
          rows={post}
          columns={columns}
          pageSize={20}
          editMode="row"
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          rowsPerPageOptions={[20]}
          experimentalFeatures={{ newEditingApi: true }}
          GridToolbar 
          components={{
            Toolbar: GridToolbar,
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
        </div >
      <div className='footer-main'>
        <Footer/>
      </div>
    </div>
    : <Loading/>
  );
}

