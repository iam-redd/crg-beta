import React from 'react'
import styles from './ProductCard.module.css'
import url from '../../../default.json'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProduct, incrementProduct, removeProductFromBasket } from '../../../store/slices/basketSlice'
function ProductCard({ index }) {
    const basket = useSelector(state => state.basket.basket)
    const dispatch = useDispatch()
    function remove() {
        if (window.confirm(`Вы действительно хотите удалить ${basket[index].name} из корзины`)) {
            dispatch(removeProductFromBasket(index))
        }
    }
    function decrement() {
        try {
            if (basket[index].amount === 1) {
                console.log('-----')
                return remove()
            } else {
                dispatch(decrementProduct(index))
            }
        }
        catch (error) {
            console.log('first error')
        }
    }
    console.log(basket[index]);

    function increment() {
        dispatch(incrementProduct(index))
    }
    return (
        <>
            {
                basket[index]?.amount > 0 ?
                    <div className={`rounded mx-4 my-2 ${styles.product_container}`}>
                        <img className={styles.img} src={`${url.backendUrl}/${basket[index]?.img}`} alt="" />
                        <div className='ml-4'>

                            <div className='text-md font-bold'>{basket[index]?.name}</div>
                            {(basket[index].type === 'tea' || 'coffee-beans') && 
                                <p>---{basket[index].tags}</p>
                            }
                            {basket[index].type === 'coffe-beans' && 
                            <div className='flex flex-col'>
                                <span className='text-sm'>
                                    Вес: <span className='ml-1 font-medium border-b border-dashed border-black'>{basket[index].weight}</span>
                                </span>
                                <span className='text-sm my-1'>
                                    Обжарка: <span className='ml-1 text-xs text-red-200 justify-center rounded border border-red-200 p-1'>{basket[index].roast}</span>
                                </span>
                                <span className='text-sm'>
                                    Помол: <span className='font-medium border-b border-dashed border-black'>{basket[index].pomol}</span>
                                </span>
                            </div>
                            }
                            <div className={`mt-5 ${styles.btn_wrapper}`}>
                                <button
                                    className={styles.btn}
                                    onClick={decrement}>-</button>
                                <span>{basket[index]?.amount}</span>
                                <button
                                    className={styles.btn}
                                    onClick={increment}>+</button>
                                <button
                                    className={`ml-2 ${styles.btn}`}
                                    onClick={remove}>Удалить</button>
                            </div>
                        </div>
                    </div> : <></>
            }
        </>
    )
}

export default ProductCard
