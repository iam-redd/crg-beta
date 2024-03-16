import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import ProductCard from './ProductCard/ProductCard.js';
import styles from './Basket.module.css'
import OrderForm from './OrderForm/OrderForm.js';
import { useNavigate } from 'react-router-dom';
const Basket = () => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
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
    useEffect(() => {
        data === null && allProductsId.length > 0 && getFavorites()
        basket.length > 0 && totalCost()
    });
    return (
        <div>
            {
                allProductsId.length > 0 ? <>
                    {
                        data === null ?
                            <div className="">Loading...</div> :
                            <>
                                {
                                    data.map((_, index) => {
                                        return (
                                            <ProductCard key={index} index={index} />
                                        )
                                    })
                                }
                                <OrderForm totalPrice={totalPrice} />
                                <div className={styles.totalLine}>
                                    <div>
                                        <span className={styles.total}>Итого</span>
                                        &nbsp;&nbsp;{totalPrice} сум
                                    </div>
                                </div>
                            </>
                    }
                </> : <button className={styles.btn}
                onClick={()=> navigate('/shop')}>Добавить товаров в корзину</button>}
        </div>
    );
};

export default Basket;