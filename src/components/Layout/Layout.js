import Header from '../Header';
import Footer from '../Footer'
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
const Layout = () => {
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
