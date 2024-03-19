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
            token ? <div
              className={styles.btn}
              onClick={handleLogout}
            >
              Выйти из профиля
            </div> :
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
              <div className={styles.btn}><Link to="/user">Back</Link></div>
            </div>
          }
        </div>

        <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-xl w-full'>
        <ul>
          <li className={styles.btn}><Link to={'/user/my-orders'}>Мои покупки</Link></li>
        </ul>
        </div>
      
      
      <Outlet />
    </>
  )
}
