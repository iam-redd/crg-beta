import React, { useState } from 'react'
import styles from './UserHeader.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/slices/userSlice';
import {
  ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, Cog6ToothIcon, ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import url from '../../../default.json'
import { Link, Outlet } from 'react-router-dom';
import { List, ListItemSuffix, ListItemPrefix, Card, ListItem, Chip, Input, Typography } from '@material-tailwind/react';
import Modals from './Modals/Modals';

export default function UserHeader() {
  const [, setToken] = useState(window.localStorage.getItem('token'))
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    setToken(null)
  }

  const openLogin = () => {

  }
  return (
    <>
      <div>
        {
          userInfo !== null ?
            <div className='xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-4 border-b-2'>
              <div className='flex flex-wrap justify-around sm:justify-center text-center md:text-start items-center p-2 xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full'>
                <div className='flex flex-col items-center'>
                  <div className={styles.userImg}>
                    {
                      userInfo.avatarUrl !== '' ? <img src={`${process.env.REACT_APP_SERVER}/${userInfo.avatarUrl}`} alt="User avatar" /> : <span></span>
                    }
                  </div>
                </div>
                <div className='sm:ml-4 md:ml-4 lg:ml-5 xl:ml-10 w-full'>
                  <div className="flex gap-2 items-center justify-center flex-wrap py-2">
                    <span className="text-lg font-bold text-blue-gray-900">{userInfo.name}</span>
                    {userInfo.role === 'admin' ?
                      <div >
                        <Chip className='rounded-full font-medium' size="sm" variant="gradient" color='red' value={userInfo.role === 'admin' ? 'админ' : 'ОПТ'} />
                      </div>
                      :
                      <div>
                        <Chip className='rounded-full font-medium' size="sm" variant="gradient" color={userInfo.role === 'user' ? 'cyan' : 'amber'} value={userInfo.role === 'user' ? 'Розница' : userInfo.role === 'superUser' ? 'ОПТ' : userInfo.role === 'developer' ? 'Разработчик' : userInfo.role === 'master' ? 'Владелец' : userInfo.role === 'manager' || userInfo.role === 'admin' ? 'Менеджер':'Оператор'
                        } />
                      </div>
                    }
                  </div>
                  <div className={styles.userMail}>Почта: <span>{userInfo.email}</span></div>
                  <div className={styles.userPhone}>Номер телефона: <span>{userInfo.phoneNumber}</span></div>
                  {
                    // userInfo?.address?.length === 1 ? <div className={styles.userAddress}>Адрес доставки: <span>{userInfo.address[0]}</span></div> :
                    <div className={styles.userAddress}>Адрес доставки:
                      <ul>
                        {
                          userInfo.address.map(address => <li key={address}><span>{address}</span></li>)
                        }
                      </ul>
                    </div>
                  }

                  {(userInfo.role === 'admin' || userInfo.role === 'superUser') &&
                    <div className={styles.userOrg}>Организация: {userInfo.org}</div>}
                </div>
              </div>
              <div className={styles.unauto}>
                <div className='p-2 items-center flex justify-center'>
                  <Card className='w-96 sm:w-56 xl:w-60'>
                    <List>
                      <Link to={'/user/my-orders'}>
                        <ListItem>
                          <ListItemPrefix>
                            <ArchiveBoxIcon className='w-5 h-5' />
                          </ListItemPrefix>
                          <ListItemSuffix className='ml-1'>Мои заказы</ListItemSuffix>
                        </ListItem>
                      </Link>
                      <Link to={'/user/settings'}>
                        <ListItem>
                          <ListItemPrefix>
                            <Cog6ToothIcon className='w-5 h-5' />
                          </ListItemPrefix>
                          <ListItemSuffix className='ml-1'>Настройки</ListItemSuffix>
                        </ListItem>
                      </Link>
                      <Link to={'/user'}>
                        <ListItem onClick={handleLogout}>
                          <ListItemPrefix>
                            <ArrowLeftStartOnRectangleIcon className='w-5 h-5' />
                          </ListItemPrefix>
                          <ListItemSuffix className='ml-1'>Выйти из профиля</ListItemSuffix>
                        </ListItem>
                      </Link>
                      {userInfo.role === 'admin' || userInfo.role === 'operator' || userInfo.role === 'developer' || userInfo.role === 'heaver' || userInfo.role === 'master' || userInfo.role === 'manager' ?
                        <Link to={'/admin'}>
                          <ListItem>
                            <ListItemPrefix>
                              <ComputerDesktopIcon className='w-5 h-5' />
                            </ListItemPrefix>
                            <ListItemSuffix className='ml-1'>ADMIN</ListItemSuffix>
                          </ListItem>
                        </Link>
                        :
                        <></>
                      }
                    </List>
                  </Card>
                </div>
              </div>
            </div>
            :
            <div className='w-full'>
              <Modals />
            </div>

          // <Navigate to='/login'/>
        }

      </div>
      <Outlet />
    </>
  )
}
