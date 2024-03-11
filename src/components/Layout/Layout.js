import Header from '../Header';
import Footer from '../Footer'
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
import axios from '../../store/axios'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllGoodsQuery } from '../../store/goodsApi';
import { setAllProducts, setSelectedProducts } from '../../store/slices/serviceDataSlice';
import { getProductsFromLocalStorage } from '../../store/slices/basketSlice';
const Layout = () => {
    const { data, isSuccess } = useGetAllGoodsQuery()
    const dispatch = useDispatch()
    const allProductsInBasket = JSON.parse(window.localStorage.getItem('allProductsId'))
    const productsInBasket = JSON.parse(window.localStorage.getItem('basket'))


    async function getMe() {
        try {
            const token = window.localStorage.getItem('token')
            if (token) {
                const data = await axios.get('/auth/me')
                console.log(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    function productsFromLocalStorage() {
            dispatch(getProductsFromLocalStorage({allProductsId:allProductsInBasket,basket:productsInBasket}))
    }

    useEffect(() => {
        getMe()
        if(allProductsInBasket.length > 0 && productsInBasket.length > 0){
            productsFromLocalStorage()
        }
        if (isSuccess) {
            dispatch(setAllProducts(data))
            dispatch(setSelectedProducts(data))
        }
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
