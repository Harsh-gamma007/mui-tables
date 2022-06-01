import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Spinner from "./spinner/Spinner";
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, closeSnackbar } from '../redux/actions/users';

export const Table = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const message = useSelector(state => state.users.message);
  const open = useSelector(state => state.users.open);
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
    dispatch(closeSnackbar())
  };
  const table = (
      <DataGrid
        rows={users}
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
        <button onClick={
          (e) => {
            e.preventDefault()
            dispatch(getUsers())
          }
          } disabled={loading}>Show Data</button>
        {loading ? <Spinner/> : table}
      </div>
      </div>
      <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message= {message}
      />
    </>
  )
}
