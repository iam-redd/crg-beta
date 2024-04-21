import React, { useState } from 'react'
import styles from './UserHeader.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../store/slices/userSlice';
import {
  ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, ArrowRightEndOnRectangleIcon, Cog6ToothIcon
} from "@heroicons/react/24/outline";
import url from '../../../default.json'
import { Link, Outlet } from 'react-router-dom';
import { List, ListItemSuffix, ListItemPrefix, Card, ListItem } from '@material-tailwind/react';
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
          userInfo ? <div className='xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-2'>
            <div className='flex justify-between items-center p-2 xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full'>
              <div className='flex flex-col items-center'>
                <div className={styles.userImg}>
                  {
                    userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <span></span>
                  }
                </div>
                <div className={styles.userName}>Привет, <span>{userInfo.name}</span></div>
              </div>
              <div className='sm:ml-2 md:ml-10 lg:ml-5 xl:ml-20'>
                <p className='text-gray-400'>Ваши данные:</p>
                <div className={styles.userMail}>Почта: <span>{userInfo.email}</span></div>
                <div className={styles.userPhone}>Номер телефона: <span>{userInfo.phoneNumber}</span></div>
                <div className={styles.userAddress}>Адрес доставки: <span>{userInfo.address[0]}</span></div>
                {(userInfo.role === 'admin' || userInfo.role === 'superUser') &&
                  <div className={styles.userOrg}>Организация: {userInfo.organization}</div>}
              </div>
            </div>
            <div className={styles.unauto}>
              <div className='p-2 items-center flex mt-5 md:mt-0 justify-center'>
                <Card className='w-96 xl:w-60'>
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
            <div className='items-center xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-2'>
              <div className='flex justify-center items-center xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full sm:items-start'>
                <div className='flex flex-col items-center mx-5'>
                  <div className={styles.userImgD}></div>
                  <div className={styles.userNameD}>Привет</div>
                </div>
                <div className='sm:ml-2 md:ml-10 lg:ml-5 xl:ml-20'>
                  <p>Ваши данные:</p>
                  <div className={styles.userMailD}>Почта: </div>
                  <div className={styles.userPhoneD}>Номер телефона: </div>
                  <div className={styles.userStatusD}>Статус: </div>
                  <div className={styles.userOrgD}>Организация: </div>
                </div>
              </div>
              <div className={styles.unauto}>

                <div className='items-center flex mt-5 justify-center'>
                  <Card className='w-96 xl:w-60'>
                    <List>
                      <p className='text-center text-sm my-5 text-red-600'>Вы не авторизованы, <br /> пожалуйста войдите в свой аккаунт или зарегистрируйтесь!</p>

                      <Link to={'/user/login'}>
                        <ListItem>
                          <ListItemPrefix>

                            <ArrowRightEndOnRectangleIcon className='w-5 h-5' />

                          </ListItemPrefix>
                          Войти
                        </ListItem>
                      </Link>

                    </List>
                  </Card>
                </div>
              </div>
            </div>
        }
      </div>
      <Outlet />
    </>
  )
}
