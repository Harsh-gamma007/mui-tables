import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DevPagination from './Pagination';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import Spinner from "./Spinner";
import Snackbar from '@mui/material/Snackbar';

export default function Table2() {

  const [user, setUser] = useState({
    data: [],
    message:'',
    open: false,
    isLoading: false,
  })
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const User = () => {
    setUser((previousData) => ({...previousData, isLoading:true }))
    axios.get(`https://jsonplaceholder.typicode.com/users`) 
    .then(data => {
      const a = data.data
      setUser((previousData) => ({...previousData, data:a, isLoading:false, open:true, message:'Values Fetched..'}))
    })
    .catch(error => {
      setUser((previousData) => ({...previousData, message:error }))
    }); 
  }  
  const count = Math.ceil(user.data.length / PER_PAGE);
  const _DATA = DevPagination(user.data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setUser((previousData) => ({...previousData, open:false }))
  };
  const table = (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
      <TableBody>
        {_DATA.currentData().map((row) => (
        <TableRow key={row.id}>
          <TableCell align="right">{row.id}</TableCell>
          <TableCell component="th" align="right" scope="row">
          {row.name}
          </TableCell>
          <TableCell align="right">{row.username}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
        </TableRow>
        ))}
      </TableBody>
    </Table>
      <Pagination
        count={count}
        size="large"
        page={page}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </TableContainer>
    )
  return (
    <>
      <div style={{ height: 400, minWidth: '580px' }}>
        <button onClick={User} disabled={user.isLoading}>Show Data</button>
          {user.isLoading ? <Spinner/> : table}
      </div>
      <Snackbar
          open={user.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={user.message}
      />
    </>
  );
}
