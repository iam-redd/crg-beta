import { useNavigate, Link, useLocation } from 'react-router-dom';
import styles from './userProfile.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/userSlice';

const UserProfile = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [isVisible, setVisible] = useState(false)
    const handleVisible = () => setVisible(!isVisible)
    const dispatch = useDispatch()

    const location = useLocation()
    const fromPage = location.state?.from?.pathname || '/'

    const handleLogout = () => {
        dispatch(logout())
        setToken(null)
    }
    return (
        <div className=''>

        <div className='md:h-full md:flex-wrap xl:flex xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
        <div className='border-1 flex'>
                <div className='w-1/5'>
                    <div>
                        <img src='../../assets/crg-team.png' alt='profile img'/> {/* Картинка профиля пользователя */}
                    </div>
                    <div>
                        <button className='button-blck'>Изменить</button>
                    </div>
                </div>
                <div>
                <div>
                    <div>Имя пользователя</div>
                    <h3>Abdullajon</h3>
                </div>
                <div>
                    <div>Номер телефона</div>
                    <h3>+998909927144</h3>
                </div>
                </div>
            </div>

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
                        <div className={styles.btn}><Link to="/user-profile/login">Воити</Link></div>
                        <div className={styles.btn}><Link to="/user-profile/registration">Зарегистрироватся</Link></div>
                    </div>
                }
            </div>

        </div>

            
    </div>
    );
};

export default UserProfile;