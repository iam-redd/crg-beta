import Header from '../Header';
import Footer from '../Footer'
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
import axios from '../../store/axios'
import { useEffect } from 'react';
const Layout = () => {

    async function getMe (){
        try {
            const token = window.localStorage.getItem('token')
            if(token){
                const data = await axios.get('/auth/me')
                console.log(data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMe()
    });
    return (
        <div>
            <Header />
            <div className={styles.container}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
