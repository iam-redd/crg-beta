import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import ProductCard from './ProductCard/ProductCard.js';
import styles from './Basket.module.css'
import OrderForm from './OrderForm/OrderForm.js';

import {Input, Button, Checkbox, Typography} from '@material-tailwind/react'

import emptyBasket from '../../assets/cart.png'

import { useNavigate } from 'react-router-dom';
const Basket = () => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const basket = useSelector(state => state.basket.basket)
    const [totalPrice, setTotalPrice] = useState(0)

    const [promocode, setPromocode] = React.useState("");
  const onChange = ({ target }) => setPromocode(target.value);

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
                            <div className='text-xl font-bold text-center my-6 lg:my-10'>Корзина</div>
                                {
                                    data.map((_, index) => {
                                        return (
                                            <ProductCard key={index} index={index} />
                                        )
                                    })
                                }
                                <div className={`flex-col ${styles.totalLine}`}>
                                <div>
                                    
                                    <div className="relative flex w-full max-w-[24rem]">
                                        <Input
                                            type="text"
                                            label="Промокод"
                                            value={promocode}
                                            onChange={onChange}
                                            className="pr-20"
                                            containerProps={{
                                            className: "min-w-0",
                                            }}
                                        />
                                        <Button
                                            size="sm"
                                            variant='outlined'
                                            color={promocode ? "gray" : "blue-gray"}
                                            disabled={!promocode}
                                            className="!absolute right-1 top-1 rounded"
                                        >
                                            Применить
                                        </Button>
                                    </div>
                                    <div>Сумма заказа: </div>
                                    <div>Скидка:  </div>
                                </div>
                                <div>
                                    <span className='font-bold text-lg'>Итого к оплате:</span>
                                    <span className='border-b '>{totalPrice} сум</span>
                                </div>
                                </div>
                                <div className='flex'>
                                <Checkbox 
                                    label={
                                        <span className='text-sm '> Согласен с условиями
                                        <a href=' # '>&nbsp;обработки персональных данных</a>
                                        <a href=' # '>&nbsp;Доставки</a>
                                        <a href='# '>&nbsp;Публичной оферты</a>
                                        </span>
                                    }
                                />
                                </div>
                                
                                <OrderForm totalPrice={totalPrice} />
                                
                            </>
                    }
                </> :
            <div  className='flex flex-col items-center'>
                    <div className='opacity-10 pt-10 w-72'><img src={emptyBasket} alt='' className=''/></div>
                    <div className='my-10 text-center'>У вас пока нет товаров в корзине, можем это исправить кликнув по кнопке снизу</div>
                <button className={`mb-20 ${styles.btn}`}
                onClick={()=> navigate('/shop')}>Перейти в магазин</button>
            </div>}
        </div>
    );
};

export default Basket;