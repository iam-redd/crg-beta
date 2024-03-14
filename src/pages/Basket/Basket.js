import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import url from '../../default.json'
import ProductCard from './ProductCard/ProductCard.js';
import styles from './Basket.module.css'
import OrderForm from './OrderForm/OrderForm.js';
const Basket = () => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const basket = useSelector(state => state.basket.basket)
    const [totalPrice, setTotalPrice] = useState(0)
    const [data, setData] = useState(null)
    const token = '6669205103:AAE24RYRkDOPbZ46ygWV6CoZENfXBIiAQi8'
    const chat_id = '-1002066903328'
    const uri = `https://api.telegram.org/bot${token}/sendMessage`
    async function createAnOrder() {
        const name = 'Kadyrzhan'
        let message = `<br>Hi Telegram</br>\n`
        message += `<br>Name:</br>${name}\n`
        message += `<br>Name:</br>${name}\n`
        message += `<br>Name:</br>${name}\n`
        message += `<br>Name:</br>${name}`
        const request = await axios.post(uri, {
            chat_id: chat_id,
            parse_mode: 'HTML',
            text: message,
        })
        console.log(request)

    }
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
        })
        // console.log(total)
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
                                
                                <OrderForm />
                                <div className={styles.totalLine}>
                                    <div>
                                        <span className={styles.total}>Итого</span>
                                        &nbsp;&nbsp;{totalPrice} сум
                                    </div>
                                </div>
                            </>
                    }
                </> : <h2>Корзина поста</h2>}
        </div>
    );
};

export default Basket;