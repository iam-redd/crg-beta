import React, { useState } from 'react'
import styles from './OrderForm.module.css'
import axios from '../../../store/axios'
import { Option, Select } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux'
import { cancelBasket } from '../../../store/slices/basketSlice'
export default function OrderForm({ totalPrice }) {
    const [btnBool, setBtnBool] = useState(false)
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const userInfo = useSelector(state => state.user.userInfo)
    const [paymentMethod ,changePay] = useState(null)
    const [pomolColor, setPomoltColor] = useState(false)
    async function newOrder(e) {
        try {
            e.preventDefault()
            if (paymentMethod === null) {
                setPomoltColor(true)
                return console.log('Способ оплаты не выбран')
            }
            setBtnBool(true)
            const comment = e.target.comment.value
            const data = await axios.post('/new-order', { basket, comment, totalPrice ,paymentMethod })
            console.log(data)
            if (data.status === 200) {
                console.log(new Date(data.data.createdAt))
                // console.log('Order created successfully')
                dispatch(cancelBasket())
            } else {
                console.log('Order not created successfully')
                throw new Error('Order not created successfully')
            }
        } catch (error) {
            console.log('Что-то пошло не так')
        }
        setBtnBool(false)
    }

    

    const handlePomolColor = () => setPomoltColor(false)
    return (
        <>
            {
                basket.length > 0 && userInfo !== null ?
                    <form className={` ${styles.form}`} onSubmit={newOrder}>
                    <span className='text-center sm:text-start'>Способ оплаты</span>    
                    <div className='col-span-3 w-auto'>
                            <Select size="md"
                                label="Выберите способ оплаты"
                                onChange={(e) => changePay(e)}
                                style={{ borderColor: pomolColor ? "red" : '' }}
                                onClick={handlePomolColor}>
                                <Option value='Перечислением'>Перечислением</Option>
                                <Option value='PayMe'>PayMe</Option>
                                <Option value='Другое'>Другое</Option>
                                
                            </Select>
                        </div>
                        <textarea className={styles.textarea} name='comment' placeholder='Комментария для заказа'></textarea>
                        {/* <input type="text" className={styles.input} name='name' placeholder='Name' /> */}
                        {/* <input type="text" className={styles.input} name='email' placeholder='Phone number' /> */}
                        <button
                            className={styles.btn}
                            disabled={btnBool}>{
                                btnBool ? 'Loading...' : 'ЗАКАЗАТЬ'
                            }</button>
                    </form> : <p className='text-center' >Для того чтобы оформить свой заказ, пожалуйста войдите в свой аккаунт или зарегистрируйтесь</p>
            }
        </>
    )
}
