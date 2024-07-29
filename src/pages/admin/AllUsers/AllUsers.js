import { useState } from 'react'
import * as React from 'react';
import axios from '../../../store/axios'
import { useEffect } from 'react'
import { DefaultSpinner } from '../../../components/Spinner'
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchBar/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { editAllUsers, setCurrentUser } from '../../../store/slices/forAdmin';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Avatar,
  Select,
  Option,
} from "@material-tailwind/react";
import icon from '../../../assets/icons/user.png'
import { toast } from 'react-toastify';
export default function AllUsers() {
  const notifyError = (text) => toast.error(text);
  const userInfo = useSelector(state => state.user.userInfo)
  const TABLE_HEAD = ["Пользователь", "Контакты", "Статус", 'Состояния'];

  const navigate = useNavigate()
  const [isSuccess, setSuccess] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [managers, setManagers] = useState(null)
  const selectedUsers = useSelector(state => state.forAdmin.selectedUsers)
  const dispatch = useDispatch()
  async function getAllUsersFunc() {
    try {
      const data = await axios.post('/get/all-users')
      if (data.status === 200) {
        dispatch(editAllUsers(data.data))
        setLoading(false)
      } else {
        notifyError('Ошибка')
      }
    } catch (error) {
      notifyError(error.message)
      // navigate('/')
    }
  }

  async function block(id, bool) {
    try {
      const response = await axios.patch(`${bool ? '/unlock-user  ' : '/block-user'}`, {
        user: id
      })

      if (response.status === 200) {
        await getAllUsersFunc()
      }
    }
    catch (err) {
    }
  }



  async function levelUp(id) {
    try {
      setSuccess(false)
      const request = await axios.patch('/user/level-up', {
        currentUserId: id
      })
      if (request.status === 403) {
      }

      if (request.status === 200) {
        await getAllUsersFunc()
      }
      setSuccess(true)
    } catch (error) {

    }
  }
  async function getAllManagers() {
    try{const { data } = await axios.get('/managers')
      setManagers(data)}
    catch (error) {
    }
  }

  managers === null && getAllManagers()


  async function changeManagerForUser(id, manager) {
    try {
      const response = await axios.post('/change-manager', { id, manager })
    } catch (error) {
    }
  }

  useEffect(() => {
    selectedUsers === null && getAllUsersFunc()
    selectedUsers !== null && setLoading(false)
  }, [setLoading, getAllUsersFunc, selectedUsers]);

  return (

      <div>
        {
          !isLoading && selectedUsers !== null ? <div className="">

                <Card className="h-full w-full">
                  <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex justify-center">
                      <div>
                        <Typography variant="h5" color="blue-gray">
                          Список пользователей
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                          Тут можно посмотреть историю покупок пользователей или дать статус ОПТ
                        </Typography>
                      </div>
                    </div>
                    <SearchBar />
                  </CardHeader>
                  <CardBody className="overflow-scroll p-0 mt-6">
                    <table className="w-full min-w-max table-auto text-left">
                      <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head._id}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                              <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal leading-none opacity-70"
                              >
                                {head}
                              </Typography>
                            </th>
                        ))}
                        {
                          userInfo !== null && userInfo.role === 'admin' ? <th
                              className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                          >
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal leading-none opacity-70"
                            >
                              Менеджер
                            </Typography>
                          </th> : <></>}
                      </tr>
                      </thead>
                      <tbody>
                      {
                        selectedUsers.map(

                            (row, index) => {
                              const id = row._id
                              const isLast = index === selectedUsers.length - 1;
                              const classes = isLast
                                  ? "p-4"
                                  : "p-4 border-b border-blue-gray-50";

                              return (
                                  <tr key={id}>
                                    <td className={classes}>
                                      <div className="flex items-center gap-3">
                                        <Avatar src={row.avatarUrl !== '' ? `${process.env.REACT_APP_SERVER}/${row.avatarUrl}` : icon} alt={row.name} size="sm"
                                                className='cursor-pointer'
                                                onClick={() => {
                                                  dispatch(setCurrentUser(row))
                                                  navigate(`/admin/all-users/${id}`)
                                                }}
                                        />

                                        <div className="flex flex-col">
                                          <Typography
                                              variant="small"
                                              color="blue-gray"
                                              className="font-normal cursor-pointer"
                                              onClick={() => {
                                                dispatch(setCurrentUser(row))
                                                navigate(`/admin/all-users/${id}`)
                                              }}
                                          >
                                            {row.name}
                                          </Typography>
                                          <Typography
                                              variant="small"
                                              color="blue-gray"
                                              className="font-normal opacity-70"
                                          >
                                            {row.role}
                                          </Typography>
                                        </div>
                                      </div>
                                    </td>
                                    <td className={classes}>
                                      <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                          {row.phoneNumber}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                          {row.email}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                          {row.telegram}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                          {row.organization}
                                        </Typography>
                                      </div>
                                    </td>
                                    <td className={classes}>
                                      <div className="w-max">
                                        {row.role === 'user' ?
                                            <button
                                                className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
                                                disabled={!isSuccess}
                                                onClick={() => isSuccess && levelUp(id)}>
                                              ДАТЬ ОПТ
                                            </button> : <>
                                              {
                                                row.role === 'superUser' ? <Button variant='outlined' size='sm' disabled={true}>УЖЕ ОПТ</Button> :
                                                    <Button variant='outlined' size='sm' disabled={true}>Staff</Button>
                                              }
                                            </>}
                                      </div>
                                    </td>
                                    <td className={classes}>
                                      {row.role !== 'admin' && <div className="w-max">
                                        {row.isActive ?
                                            <div
                                                className={`text-red-700 hover:text-white border border-red-400 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:red-green-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800`}
                                                onClick={() => block(id, false)}>
                                              Заблокировать
                                            </div> : <div
                                                className={`text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-bolder rounded-lg text-xs px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800`}
                                                onClick={() => block(id, true)}>
                                              Активировать
                                            </div>}
                                      </div>}
                                    </td>
                                    {
                                      managers !== null && userInfo.role === 'admin' ?
                                          <td>
                                            <Select
                                                label='Менеджер'
                                                value={row.manager.name}
                                                onChange={(e) => changeManagerForUser(row._id, e)}>
                                              {
                                                managers.map((manager, index) => {
                                                  return (
                                                      <Option value={manager.name} key={index}>{manager.name}</Option>
                                                  )
                                                })
                                              }
                                            </Select>
                                          </td> : <></>}
                                  </tr>
                              );
                            },
                        )}
                      </tbody>
                    </table>
                  </CardBody>
                  <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                      <Button variant="outlined" size="sm">
                        Previous
                      </Button>
                      <Button variant="outlined" size="sm">
                        Next
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
              : <DefaultSpinner />
        }
      </div>

  )
}

