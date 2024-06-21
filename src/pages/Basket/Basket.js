import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import ProductCard from './ProductCard/ProductCard.js';
import styles from './Basket.module.css'
import OrderForm from './OrderForm/OrderForm.js';

import emptyBasket from '../../assets/cart.png'

import { useNavigate } from 'react-router-dom';
import { DefaultSpinner } from '../../components/Spinner.js';
import { updateStopList } from '../../store/slices/basketSlice.js';
const Basket = () => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const allProducts = useSelector(state => state.service.allProducts)
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const [totalPrice, setTotalPrice] = useState(0)


    const [data, setData] = useState(null)
    const navigate = useNavigate()
    async function getFavorites() {
        try {
            const data = await axios.post(`/post/favorites`, { params: allProductsId })
            if (data.status === 200) {
                setData(basket)
            } else {
                throw new Error('Произошло ошибка')
            }
        } catch (error) {
            alert(error.message)
        }

    }
    function totalCost() {
        let total = 0
        basket.map((product) => {
            const price = +product.price.split(' ').join('')
            const amount = product.amount
            total += amount * price
            return null
        })
        priceAdjustment(total)
    }
    function priceAdjustment(val) {
        let temp = String(val).split('')
        let str = []
        temp = temp.reverse()
        temp.map((item, index) => {
            if (index === 2 || index === 5 || index === 8) {
                str.push(item)
                str.push(' ')
            } else {
                str.push(item)
            }
            return null
        })
        str = str.reverse().join('')
        setTotalPrice(str)
    }

    function updateStatusGoods(goods) {
        let statuses = []
        basket.map((product) => {
            allProducts.filter(good => {
                if (product.id === good._id) {
                    statuses.push(good.stopList)
                }
                return null
            })
            return null
        })
        dispatch(updateStopList(statuses))

    }
    useEffect(() => {
        data === null && allProductsId.length > 0 && getFavorites()
        data === null && allProducts !== null && updateStatusGoods(allProducts)
        basket.length > 0 && totalCost()
    });
    return (
        <div className='xl:mx-auto xl:max-w-screen-xl 2xl:max-w-screen-2xl'>
            {
                allProductsId.length > 0 ? <>
                    {
                        data === null ?
                            <div className=""><DefaultSpinner /></div> :
                            <>
                                <div className='text-xl font-bold text-center my-6 lg:my-10'>Корзина</div>
                                <div className='flex flex-col md:flex-row justify-between'>
                                    <div className='w-full'>
                                        {
                                            data.map((_, index) => {
                                                return (
                                                    <ProductCard key={index} index={index} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='p-8 md:p-2'>
                                        <div className={`flex-col`}>
                                            <div>
                                                <span className='font-bold text-lg'>Итого к оплате:</span>
                                                <span className='border-b '>{totalPrice} сум</span>
                                            </div>
                                        </div>
                                        <OrderForm totalPrice={totalPrice} />
                                    </div>
                                </div>
                            </>
                    }
                </> :
                    <div className='flex flex-col items-center'>
                        <div className='opacity-10 pt-10 w-72'><img src={emptyBasket} alt='' className='' /></div>
                        <div className='my-10 text-center'>У вас пока нет товаров в корзине, можем это исправить кликнув по кнопке снизу</div>
                        <button className={`mb-20 ${styles.btn}`}
                            onClick={() => navigate('/shop')}>Перейти в магазин</button>
                    </div>}
        </div>
    );
};

export default Basket;