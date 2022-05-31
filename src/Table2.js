import React, {useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DevPagination from './Pagination/Pagination';
import Pagination from '@mui/material/Pagination';

import axios from 'axios';
import Spinner from "./Spinner";
import Snackbar from '@mui/material/Snackbar';

export default function Table2() {

  const [user, setUser] = useState([])
  const [message, setMessage] = useState('')
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = React.useState(1);
  const PER_PAGE = 5;

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
      console.log(error)
      setMessage(error)
    });
    
    }
    
  const count = Math.ceil(user.length / PER_PAGE);
  const _DATA = DevPagination(user, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const table = (
    <TableBody>
    {_DATA.currentData().map((row) => (
    <TableRow
    key={row.id}
    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
    
    <TableCell align="right">{row.id}</TableCell>
    <TableCell component="th" align="right" scope="row">
    {row.name}
    </TableCell>
    <TableCell align="right">{row.username}</TableCell>
    <TableCell align="right">{row.email}</TableCell>
    </TableRow>
    ))}
    </TableBody>
    )
    
  return (
    <>
    <div style={{ height: 400, minWidth: '580px' }}>
    <button onClick={User} disabled={isLoading}>Show Data</button>
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
        {isLoading ? <Spinner/> : table}
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
    
      </div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
      </>
  );
}
