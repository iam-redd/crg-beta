import React, { useState } from 'react'
import styles from './UserHeader.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../../store/slices/userSlice';
import { Link, Outlet } from 'react-router-dom';
export default function UserHeader() {
  const [token, setToken] = useState(window.localStorage.getItem('token'))
  const [isVisible, setVisible] = useState(false)
  const handleVisible = () => setVisible(!isVisible)
  const dispatch = useDispatch()


  const handleLogout = () => {
    dispatch(logout())
    setToken(null)
  }
  return (
    <>
      
          <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-xl w-full'>
          {
            token ? <div>
              
            <div className='flex justify-center p-10 items-center'>
              <div className={styles.userImg}>User image</div>
              <div className='ml-20'>
                <div className={styles.userName}>Имя пользователя: <span>Жавохир</span></div>
                <div className={styles.userMail}>Почта: <span>Brbalo@main.ru</span></div>
                <div className={styles.userPhone}>Номер телефона: <span>+99890topomi o'l</span></div>
                <div className={styles.userStatus}>Статус: <span>Admin</span></div>
                <div className={styles.userOrg}>Организация: <span>Don Coffee</span></div>
              </div>
            </div>
            <div className='flex mx-auto w-full justify-end my-10'>
            <button
              className={styles.btn}
              onClick={handleLogout}
            >
              Выйти из профиля
            </button>
            </div>


            </div>
            
            :
              <div>
                Вы не авторизованы, войдите в свой аккаунт
                <div className=''>
                <button className='button-blck' onClick={() => handleVisible()}>Войти / Зарегистрироватся</button>
                </div>
              </div>
          }
        </div>
        <div>
          {
            isVisible &&
            <div className='max-w-screen-xl 2xl:max-w-screen-xl w-full'>
              <div className={styles.btn}><Link to="/user/login">Воити</Link></div>
              <div className={styles.btn}><Link to="/user/registration">Зарегистрироватся</Link></div>
            </div>
          }
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
        <div>Loading///</div>
        }
      
      
      <Outlet />
    </>
  )
}
