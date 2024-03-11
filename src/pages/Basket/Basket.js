import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import url from '../../default.json'
import { useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard.js';
const Basket = () => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const basket = useSelector(state => state.basket.basket)
    console.log(basket[0]?.amount * +basket[0]?.price.split(' ').join(''))
    const [data, setData] = useState(null)
    async function getFavorites() {
        try {
            const data = await axios.post(`${url.backendUrl}/post/favorites`, { params: allProductsId })
            if (data.status === 200) {
                setData(basket)
            } else {
                throw new Error('Произошло ошибка')
            }
        } catch (error) {
            alert(error.message)
        }

    }
    useEffect(() => {
        data === null && allProductsId.length > 0 && getFavorites()
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
                                data.map((product, index) => {
                                    return (
                                        <ProductCard key={index} index={index} />
                                    )
                                })
                            }
                        </>
                }
            </> : <h2>Корзина поста</h2>}
        </div>
    );
};

export default Basket;