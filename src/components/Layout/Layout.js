import Header from '../Header';
import Footer from '../Footer'
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'
import axios from '../../store/axios'
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetAllGoodsQuery } from '../../store/goodsApi';
import { setAllProducts, setSelectedProducts } from '../../store/slices/serviceDataSlice';
import { getProductsFromLocalStorage } from '../../store/slices/basketSlice';
import { addData } from '../../store/slices/userSlice';
import { DefaultSpinner } from '../Spinner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import secretKey from '../../default.json'
const Layout = () => {
    const { data, isSuccess } = useGetAllGoodsQuery()
    const dispatch = useDispatch()
    const allProductsInBasket = JSON.parse(window.localStorage.getItem('allProductsId')) || []
    const productsInBasket = JSON.parse(window.localStorage.getItem('basket')) || []


    async function getMe() {
        try {
            const token = window.localStorage.getItem('token')
            const data = window.localStorage.getItem('data')
            if (token) {
                if (data !== null) {
                    const bytes = CryptoJS.AES.decrypt(JSON.parse(data), secretKey.secretKey);
                    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
                    const a = JSON.parse( decryptedText)
                    dispatch(addData(a))
                } else {
                    const { data } = await axios.get('/me')
                    const str = JSON.stringify(data.data)
                    const ciphertext = CryptoJS.AES.encrypt(str, secretKey.secretKey).toString();
                    window.localStorage.setItem('data', JSON.stringify( ciphertext))
                    dispatch(addData(ciphertext))
                }
            } else {
                // notifyError('Не удалось авторизоватся')
                console.log('Не удалось авторизоватся')
            }

        } catch (error) {
            console.log(error)
            // if (error.response.status === 404) {
            // notifyError('Не удалось авторизоватся')
            // }
        }
    }

    function productsFromLocalStorage() {
        dispatch(getProductsFromLocalStorage({ allProductsId: allProductsInBasket, basket: productsInBasket }))
    }

    useEffect(() => {
        getMe()
        if (allProductsInBasket.length > 0 && productsInBasket.length > 0) {
            productsFromLocalStorage()
        }
        if (isSuccess) {
            dispatch(setAllProducts(data))
            dispatch(setSelectedProducts(data))
        }
    });
    return (
        <div className={styles.container}>
            <Header />
            <div className={`min-h-svh`}>
                <Suspense fallback={<DefaultSpinner />}>
                    <ToastContainer />
                    <Outlet />
                </Suspense>
            </div>
            <Footer className='mx-auto' />
        </div>
    );
}

export default Layout;