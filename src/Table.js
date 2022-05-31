import React, { useState }  from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import Spinner from "./Spinner";
import Snackbar from '@mui/material/Snackbar';

export const Table = () => {
  const [user, setUser] = useState([])
  const [message, setMessage] = useState('')
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setOpen(false);
  };

  const User = () => {
    
    setIsLoading(true);
    axios.get(`https://jsonplaceholder.typicode.com/users`) //This is sending get request to json server
    .then(data => {
      
      const a = data.data
      setUser(a)
      setIsLoading(false)
      setOpen(true)
      setMessage('Values Fetched..')
    })
  .catch(error => {
    setIsLoading(false)
    console.log(error)
    setMessage(error)
  });
  }

  const table = (
    
    
      <DataGrid
        rows={user}
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
    <button onClick={User} disabled={isLoading}>Show Data</button>
    {isLoading ? <Spinner/> : table}
    
    </div>
    </div>
    <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
      </>
  )
}
