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
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { editAllUsers, setCurrentUser } from '../../../store/slices/forAdmin';
export default function AllUsers() {
  const navigate = useNavigate()
  const [isSucccess, setSecccess] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const selectedUsers = useSelector(state => state.forAdmin.selectedUsers)
  const dispatch = useDispatch()
  async function getAllUsersFunc() {
    try {
      const data = await axios.post('/get/all-users')
      if (data.status === 200) {
        dispatch(editAllUsers(data.data))
        setLoading(false)
        console.log(data.data)
      }
    } catch (error) {
      console.log(error.message)
      navigate('/')
    }
  }

  async function levelUp(id) {
    try {
      setSecccess(false)
      const request = await axios.patch('/user/level-up', {
        currentUserId: id
      })
      if (request.status === 403) {
        console.log('status 404')
      }

      if (request.status === 200) {
        getAllUsersFunc()
      }
      setSecccess(true)
    } catch (error) {
      console.log(error.message)

    }
  }

  useEffect(() => {
    selectedUsers === null && getAllUsersFunc()
    selectedUsers !== null && setLoading(false)
  });

  return (
    <div>
      {
        !isLoading ? <div className="">
          <SearchBar />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>A basic table example with a caption</caption>
              <TableHead>
                <TableRow>
                  <TableCell>Имя</TableCell>
                  <TableCell align="right">Статус</TableCell>
                  <TableCell align="right">Телефон</TableCell>
                  <TableCell align="right">Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedUsers.map((row) => {
                  const id = row._id
                  return (
                    <TableRow key={row.email} >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          dispatch(setCurrentUser(row))
                          navigate(`/admin/all-users/${id}`)
                        }}>
                        {row.name}
                      </TableCell>
                      <TableCell align="right">
                        <div className={styles.role}>
                          {row.role}
                          {row.role === 'user' &&
                            <button
                              className={styles.btn}
                              disabled={!isSucccess}
                              onClick={() => isSucccess && levelUp(id)}>
                              Поднять
                            </button>}
                        </div>
                      </TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                    </TableRow>)
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </div> : <DefaultSpinner />
      }
    </div>
  )
}


