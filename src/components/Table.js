import React, { useState }  from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Spinner from "./Spinner";
import Snackbar from '@mui/material/Snackbar';

export const Table = () => {
  const [user, setUser] = useState({
    data: [],
    message:'',
    open: false,
    isLoading: false,
  })
  const columns = [
    { field: 'id', headerName: 'ID', minWidth: 70 },
    { field: 'name', headerName: 'Name', minWidth: 130 },
    { field: 'username', headerName: 'Username', minWidth: 130 },
    { field: 'email', headerName: 'Email', minWidth: 130},
  ];
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUser((previousData) => ({...previousData, open:false }))
  };
  const User = () => {  
    setUser((previousData) => ({...previousData, isLoading:true }))
    axios.get(`https://jsonplaceholder.typicode.com/users`)
    .then(data => { 
      const a = data.data
      setUser((previousData) => ({...previousData, data:a, isLoading:false, open:true, message:'Values Fetched..'}))
    })
  .catch(error => {
    setUser((previousData) => ({...previousData, message:error, isLoading:false }))
  });
  }
  const table = (
      <DataGrid
        rows={user.data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]} 
      />
  )
  return (
    <>
      <div style={{ height: 400, width: '700' }}>
      <h1>Table using DataGrid</h1>
      <div style={{ height: 400, minWidth: '580px' }}>
        <button onClick={User} disabled={user.isLoading}>Show Data</button>
        {user.isLoading ? <Spinner/> : table}
      </div>
      </div>
      <Snackbar
          open={user.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={user.message}
      />
    </>
  )
}
