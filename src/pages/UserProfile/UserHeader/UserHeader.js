import React, { useState } from 'react'
import styles from './UserHeader.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/userSlice';
import {
  ArchiveBoxIcon, ArrowLeftStartOnRectangleIcon, Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { Link, Outlet } from 'react-router-dom';
import { Button, List, ListItemSuffix, ListItemPrefix, Card, ListItem } from '@material-tailwind/react';
export default function UserHeader() {
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  // const [isVisible, setVisible] = useState(false)
  // const handleVisible = () => setVisible(!isVisible)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    setToken(null)
  }
  return (
    <>
      <div>
        {
          token ? <div className='xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-2'>
            <div className='flex xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full sm:items-start'>
              <div className='flex flex-col items-center'>
                <div className={styles.userImg}></div>
                <div className={styles.userName}>Привет, <span>Жавохир</span></div>
              </div>
              <div className='sm:ml-2 md:ml-10 lg:ml-5 xl:ml-20'>
                <p>Ваши данные:</p>
                <div className={styles.userMail}>Почта: <span>Brbalo@main.ru</span></div>
                <div className={styles.userPhone}>Номер телефона: <span>+99890topomi o'l</span></div>
                <div className={styles.userStatus}>Статус: <span>Admin</span></div>
                <div className={styles.userOrg}>Организация: <span>Don Coffee</span></div>
              </div>
            </div>
            <div className={styles.unauto}>
              {
                token ?
                  <div className={styles.tabs}>
                    <Card>
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
                        <ListItem onClick={handleLogout}>
                          <ListItemPrefix>
                            <ArrowLeftStartOnRectangleIcon className='w-5 h-5' />
                          </ListItemPrefix>
                          <ListItemSuffix className='ml-1'>Выйти из профиля</ListItemSuffix>
                        </ListItem>
                      </List>
                    </Card>
                  </div>
                  :
                  <div></div>
              }
            </div>
          </div>
            :
            <div className='mx-auto max-w-screen-xl flex justify-between'>
              <div className='flex justify-start items-center'>
                <div className='flex flex-col items-center'>
                  <div className={styles.userImgD}></div>
                  <div className={styles.userNameD}>Привет, Жавохир</div>
                </div>
                <div className='ml-20'>

                  <div className={styles.userMailD}>Почта:Brbalo@main.ru</div>
                  <div className={styles.userPhoneD}>Номер телефона:+99890topomi o'l</div>
                  <div className={styles.userStatusD}>Статус:Admin</div>
                  <div className={styles.userOrgD}>Организация:Don Coffee</div>
                </div>
              </div>
              <div className={styles.unauto}>
                <p className='flex text-center'>Вы не авторизованы, <br />войдите в свой аккаунт</p>
                <div className=''>
                  {/*<button className='button-blck' onClick={() => handleVisible()}>Войти / Зарегистрироватся</button>*/}
                  <div className={styles.btn}><Link to="/user/login">Войти</Link></div>
                </div>
                {
                  token ?
                    <div className={styles.tabs}>
                      <ul className='flex justify-around px-5'>
                        <li className={styles.tabsItem}><Link to={'/user/my-orders'}>История заказов</Link></li>
                        <li className={styles.tabsItem}><Link to={'/user/settings'}>Настройки профиля</Link></li>
                      </ul>
                    </div>
                    :
                    <div></div>
                }
              </div>

            </div>
        }
      </div>





      <Outlet />
    </>
  )
}
