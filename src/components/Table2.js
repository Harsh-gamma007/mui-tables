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
import Spinner from "./spinner/Spinner";
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, closeSnackbar } from '../redux/actions/users';

export default function Table2() {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users);
  const loading = useSelector(state => state.users.loading);
  const message = useSelector(state => state.users.message);
  const open = useSelector(state => state.users.open);
  const [page, setPage] = useState(1);
  const PER_PAGE = 5;
  const count = Math.ceil(users.length / PER_PAGE);
  const _DATA = DevPagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeSnackbar())
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
        <button onClick={
          (e) => {
            e.preventDefault()
            dispatch(getUsers())
          }
        } disabled={loading}>Show Data</button>
          {loading ? <Spinner/> : table}
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
