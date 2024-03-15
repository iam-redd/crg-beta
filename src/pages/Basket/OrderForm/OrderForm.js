import React from 'react'
import styles from './OrderForm.module.css'
import axios from '../../../store/axios'
import { useDispatch, useSelector } from 'react-redux'
import { cancelBasket } from '../../../store/slices/basketSlice'
export default function OrderForm() {
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const userInfo = useSelector(state => state.user.userInfo)

    async function newOrder(e) {
        e.preventDefault()
        console.log(e.target.comment.value)
        const comment = e.target.comment.value
        const {data} = await axios.post('/new-order', { basket ,comment })
        console.log(data)
        if(data.ok){
            console.log('Order created successfully')
            dispatch(cancelBasket())
        }else{
            console.log('Order not created successfully')
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
                </form> : <h3 style={{color:'#F44336'}}>Не авторизованные пользователи не могут заказать</h3>
            }
        </>
    )
}
