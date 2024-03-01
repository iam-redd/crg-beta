import { useNavigate, Link } from 'react-router-dom';
import styles from './userProfile.module.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { logout } from '../../store/slices/userSlice';

const UserProfile = () => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [isVisible, setVisible] = useState(false)
    const handleVisible = () => setVisible(!isVisible)
    const dispatch = useDispatch()
    // const decoded = jwt.verify(token, 'secret123')
    // const userId = decoded._id
    // console.log(userId)

    const handleLogout = () => {
        dispatch(logout())
        setToken(null)
    }
    return (
        <div>
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
    );
};

export default UserProfile;