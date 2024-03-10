import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import axios from '../../store/axios.js'
import url from '../../default.json'
import { useEffect } from 'react';
import ProductCard from './ProductCard/ProductCard.js';
const Basket = () => {
    const favorites = useSelector(state => state.basket.allProductsId)
    const [data,setData] = useState(null)
    // console.log(favorites)
    async function getFavorites() {
        try {
            const data = await axios.post(`${url.backendUrl}/post/favorites`, { params: favorites })
            if(data.status === 200){
                setData(data.data)
                // console.log(data.data)
            }else{
                throw new Error('Произошло ошибка')
            }
        } catch (error) {
            alert(error.message)
        }

    }
    useEffect(() => {
        data === null && favorites.length !== 0 && getFavorites()
    } );
    return (
        <div>
            {
                data === null ?
                <div className="">Loading...</div>:
                <>
                {
                    data.map((product)=> {
                        return(
                            <ProductCard key={product.name} data={product}/>
                        )
                    })
                }
                </>
            }
        </div>
    );
};

export default Basket;