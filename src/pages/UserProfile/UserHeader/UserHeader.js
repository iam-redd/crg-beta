import React, { useState } from 'react'
import styles from './UserHeader.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/slices/userSlice';
import {
  ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, Cog6ToothIcon
} from "@heroicons/react/24/outline";
import url from '../../../default.json'
import { Link, Navigate, Outlet } from 'react-router-dom';
import { List, ListItemSuffix, ListItemPrefix, Card, ListItem, Chip } from '@material-tailwind/react';

export default function UserHeader() {
  const [, setToken] = useState(window.localStorage.getItem('token'))
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    setToken(null)
  }
  return (
    <>
      <div>
        {
          userInfo !== null ? <div className='xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-4 border-b-2'>
            <div className='flex flex-wrap justify-around sm:justify-center text-center md:text-start items-center p-2 xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full'>
              <div className='flex flex-col items-center'>
                <div className={styles.userImg}>
                  {
                    userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <span></span>
                  }
                </div>
              </div>
              <div className='sm:ml-4 md:ml-4 lg:ml-5 xl:ml-10'>
                <div className="flex gap-2 items-center flex-wrap justify-end sm:justify-start py-2">
                  <span className="text-lg font-bold text-blue-gray-900">{userInfo.name}</span>
                  {userInfo.role === 'admin' ?
                    <div >
                      <Chip className='rounded-full font-medium' size="sm" variant="gradient" color='red' value={userInfo.role === 'admin' ? 'админ' : 'ОПТ'} />
                    </div>
                    :
                    <div>
                      <Chip className='rounded-full font-medium' size="sm" variant="gradient" color={userInfo.role === 'user' ? 'cyan' : 'amber'} value={userInfo.role === 'user' ? 'Розница' : 'ОПТ'} />
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
                           userInfo.address.map(address => <li><span>{address}</span></li>)
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
                  </List>
                </Card>
              </div>
            </div>
          </div>
            :
            <Navigate to='/login'/>
        }
      </div>
      <Outlet />
    </>
  )
}
