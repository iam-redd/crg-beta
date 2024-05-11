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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import secretKey from '../../default.json'
const Layout = () => {
    const { data, isSuccess } = useGetAllGoodsQuery()
    const dispatch = useDispatch()
    const allProductsInBasket = JSON.parse(window.localStorage.getItem('allProductsId')) || []
    const productsInBasket = JSON.parse(window.localStorage.getItem('basket')) || []
    const notifyError = (text) => toast.error(text);
    const token = window.localStorage.getItem('token');
    const userInfo = window.localStorage.getItem('userInfo');
    // if(token === null || userInfo === null){
    //     getMe()
    // }else{

    // }

    async function getMe() {
        try {
            const token = window.localStorage.getItem('token')
            const data = window.localStorage.getItem('data')
            if (token) {
                // const str = JSON.stringify(data)
                // const ciphertext = CryptoJS.AES.encrypt(str, secretKey.secretKey).toString();
                // window.localStorage.setItem('data',JSON.stringify(ciphertext))
                // console.log(ciphertext)
                if(data !== null){
                    console.log(data)
                    const bytes = CryptoJS.AES.decrypt(JSON.parse(data), secretKey.secretKey);
                    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
                    console.log(JSON.parse(decryptedText))
                    const a = JSON.parse(decryptedText)
                    dispatch(addData({ ...a, token }))
                    
                }else{
                    const { data } = await axios.get('/auth/me')
                    const str = JSON.stringify(data)
                    const ciphertext = CryptoJS.AES.encrypt(str, secretKey.secretKey).toString();
                    window.localStorage.setItem('data',JSON.stringify(ciphertext))
                    console.log(ciphertext)
                    dispatch(addData({ ...data, token }))
                }
            } else {
                notifyError('Не удалось авторизоватся')
            }
 
        } catch (error) {
            console.log(error)
            // if (error.response.status === 404) {
            notifyError('Не удалось авторизоватся')
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
            <Footer className={styles.footer} />
        </div>
    );
}

export default Layout;