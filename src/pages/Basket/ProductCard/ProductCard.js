import React from 'react'
import styles from './ProductCard.module.css'
import url from '../../../default.json'
import { useDispatch, useSelector } from 'react-redux'
import { decrementProduct, incrementProduct, removeProductFromBasket } from '../../../store/slices/basketSlice'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors'
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material'

function ProductCard({ index }) {
    const basket = useSelector(state => state.basket.basket)
    const dispatch = useDispatch()
    function remove() {
        // if (window.confirm(`Вы действительно хотите удалить ${basket[index].name} из корзины`)) {
            dispatch(removeProductFromBasket(index))
        // }
    }
    function decrement() {
        try {
            if (basket[index].amount === 1) {
                return remove()
            } else {
                dispatch(decrementProduct(index))
            }
        }
        catch (error) {
        }
    }

    function increment() {
        dispatch(incrementProduct(index))
    }
    return (
        <>
            {
                basket[index]?.amount > 0 ?
                    <div className={`rounded mx-4 my-2 flex flex-wrap sm:flex-nowrap ${styles.product_container}`}>
                        <img className={` sm:w-2/4 lg:w-1/5 md:w-2/5 ${styles.resize} ${styles.img}`} src={`${process.env.REACT_APP_SERVER}/${basket[index]?.img[0]}`} alt="product card" />
                        <div className='ml-4 xl:ml-10 flex flex-auto flex-col md:flex-row'>
                            <div className='flex flex-col justify-center md:justify-start'>
                            <div className={`font-bold text-lg text-center md:text-start mt-2 md:mt-0`}>
                                <span>{basket[index]?.name } </span>
                                <span className='text-sm font-medium text-red-700'>
                                    {
                                        basket[index].stopList && <span> нет в наличии!</span>
                                    }
                                </span>
                            </div>
                            <div className='flex flex-row justify-center text-center'>
                            <div className='flex flex-col gap-4'>
                            {(basket[index].type === 'tea' || 'coffee-beans') &&
                                <p>{basket[index].package}</p>
                            }
                            {basket[index].type === 'coffe-beans' &&
                                <div className='flex flex-col'>
                                    <span className='text-sm'>
                                        Вес: <span className='ml-1 font-medium border-b border-dashed border-black'>{basket[index].weight}</span>
                                    </span>
                                    <span className='text-sm my-2'>
                                        Обжарка: <span className='ml-1 text-xs text-red-400 justify-center rounded border border-red-200 p-1'>{basket[index].roast}</span>
                                    </span>
                                    <span className='text-sm'>
                                        Помол: <span className='font-medium border-b border-dashed border-black'>{basket[index].pomol}</span>
                                    </span>
                                </div>
                            }
                            </div>
                            
                            </div>
                            </div>
                            <div className={`mt-5 items-center w-full md:w-max flex-auto flex justify-end md:flex-start`}>
                                <p className='text-sm font-medium'>Кол-во:</p>
                                <IconButton onClick={decrement}>
                                    <IndeterminateCheckBox sx={{ color: red[300] }}/>
                                </IconButton>
                                <span>{basket[index]?.amount}</span>
                                <IconButton onClick={increment}>
                                    <AddBox sx={{ color: red[300] }}/>
                                </IconButton>
                                
                                <IconButton onClick={remove} aria-label="delete" size="large">
                                <DeleteIcon sx={{ color: red[600] }} />
                                </IconButton>
                                
                            </div>
                        </div>
                        
                    </div> : <></>
            }
        </>
    )
    
}

export default ProductCard
