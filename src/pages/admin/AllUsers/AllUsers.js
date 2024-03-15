import { useState } from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from '../../../store/axios'
import { useEffect } from 'react'
import { DefaultSpinner } from '../../../components/Spinner'
import styles from './AllUsers.module.css'
export default function AllUsers() {
  const [users, setUsers] = useState(null)
  async function getAllUsersFunc() {
    try {
      const data = await axios.post('/get/all-users')
      if (data.status === 200) {
        console.log(data.data)
        setUsers(data.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    users === null && getAllUsersFunc()
  });
  return (
    <div>
      {
        users !== null ? <div className="">
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Телефоон</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">{row.phoneNumber}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div> : <DefaultSpinner />
      }
    </div>
  )
}
