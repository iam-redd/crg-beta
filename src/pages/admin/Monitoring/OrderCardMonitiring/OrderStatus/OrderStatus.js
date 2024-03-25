import React from 'react'
import styles from './OrderStatus.module.css'
import axios from '../../../../../store/axios'

export default function OrderStatus({ status, id, getAllOrders, index }) {
    const statusesDb = ['Отказано', 'В ожидании', 'Оформлен', 'В пути', 'Доставлен']
    const allStatuses = ['Отказ', 'Одобрить', 'Отправить', 'Доставлен']
    let bool0 = true
    let bool1 = true
    let bool2 = true
    let bool3 = true

    if (index === 0) {
        bool0 = false
        bool1 = false
        bool2 = false
        bool3 = false
    }
    if (index === 1) {
        bool2 = false
        bool3 = false
    }
    if (index === 2) {
            bool3 = false
        
    }
    if (index === 5) {
        if (status === "В ожидании") {
            bool1 = false
            bool2 = false
            bool3 = false
        }
        if (status === "Одобрено") {
            bool2 = false
            bool3 = false
        }
        if (status === "В пути") {
            bool3 = false
        }
    }


    async function updateStatus(nextStatus) {
        if (status !== nextStatus) {
            const request = await axios.patch('/order', {
                orderId: id,
                nextStatus
            })

            if (request.status === 200) {
                getAllOrders()
            }
        }
    }
    return (
        <div className={styles.container}>
            <div
                className={`${styles.colorRed} ${styles.btn_wrapper} ${bool0 && styles.opacity}`}
                onClick={() => bool0 && updateStatus('Отказано')}>
                <div className={styles.btn_}>1</div>
                {allStatuses[0]}
            </div>
            <div className={`${styles.btn_wrapper} ${bool1 && styles.opacity}`}
                onClick={() => bool1 && updateStatus('Оформлен')}>
                <div className={styles.btn}>2</div>
                {allStatuses[1]}
            </div>
            <div className={`${styles.btn_wrapper} ${bool2 && styles.opacity}`}
                onClick={() => bool2 && updateStatus('В пути')}>
                <div className={styles.btn}>3</div>
                {allStatuses[2]}
            </div>
            <div className={`${styles.btn_wrapper} ${bool3 && styles.opacity}`}
                onClick={() => bool3 && updateStatus('Доставлен')}>
                <div className={styles.btn}>4</div>
                {allStatuses[3]}
            </div>
        </div>
    )
}
