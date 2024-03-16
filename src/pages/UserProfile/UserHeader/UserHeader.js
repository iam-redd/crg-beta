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
      <div className={styles.header}>
        {
          token ? <div
            className={styles.btn}
            onClick={handleLogout}
          >
            Выйти из профиля
          </div> :
            <div
              className={styles.btn}
              onClick={() => handleVisible()}
            >
              Воити
            </div>
        }
      </div>
      <div>
        {
          isVisible &&
          <div className={styles.hrefWrapper}>
            <div className={styles.btn}><Link to="/user/login">Воити</Link></div>
            <div className={styles.btn}><Link to="/user/registration">Зарегистрироватся</Link></div>
          </div>
        }
      </div>
      <ul>
        <li><Link to={'/user/my-orders'}>MyOrders</Link></li>
      </ul>
      <Outlet />
    </>
  )
}
