import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import url from '../../../default.json'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProduct, incrementProduct, removeProductFromBasket } from '../../../store/slices/basketSlice'
function ProductCard({ data }) {
    const [temp,setTemp] = useState([])
    const basket = useSelector(state => state.basket.basket)
    const index = basket.findIndex(product => product.id === data._id)
    const product = basket[index] || {}
    const dispatch = useDispatch()
    function increment() {
        dispatch(incrementProduct(index))
    }

    function decrement() {
        // dispatch(decrementProduct(index))
        if (false) {
            dispatch(decrementProduct(index))
            console.log('decrement')
        } else {
            setTemp([...temp,1])
            dispatch(removeProductFromBasket(index))
        }
    }
    return (
        <div className={styles.product_container}>
            <img className={styles.img} src={`${url.backendUrl}/${data.img}`} alt="" />
            <div className="">
                <div className="">{data.name}</div>
                <div className={styles.btn_wrapper}>
                    <button
                        className={styles.btn}
                        onClick={decrement}>-</button>
                    <span>{basket[index].amount}</span>
                    <button
                        className={styles.btn}
                        onClick={increment}>+</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
