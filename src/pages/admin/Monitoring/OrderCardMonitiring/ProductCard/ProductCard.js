import React, { useState } from 'react'
import styles from './ProductCard.module.css'
import url from '../../../../../default.json'
import axios from '../../../../../store/axios'
export default function Order({ data, orderId, getAllOrders, bool, index }) {
    const [amount, setAmount] = useState(0)
    let currentAmount = data.amount
    let type = ''
        if (data.type === 'coffe-beans') type = 'Кофе'
        else if (data.type === 'tea') type = 'Чай'
        else if (data.type === 'syrup') type = 'Сироп'
        else if (data.type === 'accessory') type = 'Аксессуар'
        else if (data.type === 'chemistry') type = 'Химия'
        else if (data.type === 'coffee-capsule') type = 'Кофе в капсуле'
        else if (data.type === 'drip') type = 'Дрип-кофе'
    async function save() {
        try {
            const comment = `This is comment`
            console.log({
                orderId,
                productId: data.id,
                currentAmount: currentAmount,
                nextAmount: data.amount + amount,
                comment
            })
            const request = await axios.patch('/order/product/amount',
                {
                    orderId,
                    productId: data.id,
                    currentAmount: currentAmount,
                    nextAmount: data.amount + amount,
                    comment
                })
            console.log(request)
            if (request.status === 200) {
                getAllOrders()
                setAmount(0)
            }
        }
        catch (error) {
            console.log(error.message)
        }
    }

    function decrement() {
        if (2 > data.amount + amount) {
            save()
            return null
        }
        setAmount((prev) => prev - 1)
    }

    function increment() {
        setAmount((prev) => prev + 1)
    }

    async function deleteProductFromOrder() {
        try {
            const comment = `This is comment`
            console.log({
                orderId,
                productId: data.id,
                amount: data.amount,
                comment
            })
            const request = await axios.patch('/order/product',
                {
                    orderId,
                    productId: data.id,
                    amount: data.amount,
                    comment,
                    productWeight: data.weight
                })
            if (request.status === 200) {
                console.log(request.data)
                getAllOrders()
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            {
                bool ?
                    <div className={styles.order}>
                        <img className={styles.img} src={`${process.env.REACT_APP_SERVER}/${data.img}`} alt=""  />
                        <div className={styles.info}>
                            <p >Найменования:
                                {data.name}
                                {
                                    amount !== 0 &&
                                    <span className={styles.btn} onClick={save}>Cохранить</span>
                                }
                            </p>
                            <p>Обьём: {data.weight}
                            </p>
                            <p>Цена: {data.price}сум</p>
                            <p>Вид товара: {type}</p>

                            <p style={{ display: 'flex' }}>Количество:
                                {
                                    index === 0 && <button
                                        className={styles.btn}
                                        onClick={decrement}>-</button>
                                }
                                {data.amount + amount}
                                {
                                    index === 0 && <button
                                        className={styles.btn}
                                        onClick={increment}>+</button>
                                }
                                {
                                    index === 0 && <button className={styles.btn}
                                        onClick={deleteProductFromOrder}>Удалить</button>
                                }
                            </p>
                        </div>
                    </div> :
                    <div className={styles.order}>
                        <img src={`${process.env.REACT_APP_SERVER}/${data.img}`} className={styles.img} alt="" />
                        <div className={styles.info}>
                            <p >Найменования:
                                {data.name}
                            </p>
                            <p>Обьём: {data.weight}
                            </p>
                            <p >Количество: {data?.amount}
                            </p>
                        </div>
                    </div>
            }
        </>


    )

}



