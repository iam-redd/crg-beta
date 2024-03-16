import React from 'react'
import styles from './OrderForm.module.css'
import axios from '../../../store/axios'
import { useDispatch, useSelector } from 'react-redux'
import { cancelBasket } from '../../../store/slices/basketSlice'
export default function OrderForm({totalPrice}) {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const userInfo = useSelector(state => state.user.userInfo)

    async function newOrder(e) {
        try {
            e.preventDefault()
            console.log(e.target.comment.value)
            const comment = e.target.comment.value
            const data = await axios.post('/new-order', { basket, comment, totalPrice })
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
    }
    return (
        <>
            {
                basket.length > 0 && userInfo !== null ?
                    <form className={styles.form} onSubmit={newOrder}>
                        <textarea className={styles.textarea} name='comment'></textarea>
                        {/* <input type="text" className={styles.input} name='name' placeholder='Name' /> */}
                        {/* <input type="text" className={styles.input} name='email' placeholder='Phone number' /> */}
                        <button className={styles.btn}>ЗАКАЗАТЬ</button>
                    </form> : <h3 style={{ color: '#F44336' }}>Не авторизованные пользователи не могут заказать</h3>
            }
        </>
    )
}
