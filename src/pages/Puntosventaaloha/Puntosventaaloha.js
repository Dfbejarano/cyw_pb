import React   from 'react';
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Loading from "../../components/Loading/Loading";
import axios from 'axios';
import "./Puntosventaaloha.css";


import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const baseURL = "http://192.168.181.23:8080/pdv";
const baseURL2 = "http://192.168.181.23:8080/pdv_update";

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
      setSnackbar({ children: 'Punto de venta actualizado exitosamente', severity: 'success' });
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
    { field: 'StoreId', headerName: 'CODIGO ALOHA', width: 130, type: 'number'},
    { field: 'Name', headerName: 'NOMBRE ALOHA', width: 300},
    { field: 'nombre_limpio', headerName: 'NOMBRE UNIDO CON HELADERIA', editable: true, width: 180},
    { field: 'tipo', headerName: 'DISCRIMINAR BARRA', editable: true, width: 150},
    { field: 'tipo2', headerName: 'SIN DISCRIMINAR BARRA', editable: true, width: 150},
    { field: 'ciudad', headerName: 'CIUDAD', editable: true, width: 150},
    { field: 'zona', headerName: 'ZONA', editable: true, width: 110}
  ]

  return (
    isLoading ? 
    <div>
        <Header/>
        <div className='table-pdv'>
          <p style={{backgroundColor: "lightblue",marginTop:"2%", marginLeft:"2%", marginRight:"2%"}} className='description'
          >IMPORTANTE: La opcíon de columns le va a permitir quitar columnas, filter le va a permitir filtrar, density le
          va a permitir reducir el espacio de filas, y export le va a permitir exportar la información (debe tener cuidado con 
          esta opcicón en cuanto si exporta con una fila sombreada solo le exportará esta fila) </p>
          <Box sx={{ 
          height: 800, 
          width: '100%',
          m: 2 }}>
          <DataGrid disableIgnoreModificationsIfProcessingProps 
          getRowId={(post) => post.StoreId}
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

