import React from 'react'
import styles from './OrderStatus.module.css'
import axios from '../../../../../store/axios'

export default function OrderStatus({ status, id, getAllOrders }) {
    const statusesDb = ['Отказано', 'В ожидании', 'Оформлен', 'В пути', 'Доставлен']
    const allStatuses = ['Отказ', 'Одобрить', 'Отправить', 'Доставлен']
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
                className={`${styles.colorRed} ${styles.btn_wrapper} ${status === 'Отказано' && styles.opacity}`}
                onClick={() => updateStatus('Отказано')}>
                <div className={styles.btn_}>1</div>
                {allStatuses[0]}
            </div>
            <div className={`${styles.btn_wrapper}`}
                onClick={() => updateStatus('Оформлен')}>
                <div className={styles.btn}>2</div>
                {allStatuses[1]}
            </div>
            <div className={styles.btn_wrapper}
                onClick={() => updateStatus('В пути')}>
                <div className={styles.btn}>3</div>
                {allStatuses[2]}
            </div>
            <div className={styles.btn_wrapper}
                onClick={() => updateStatus('Доставлен')}>
                <div className={styles.btn}>4</div>
                {allStatuses[3]}
            </div>
        </div>
    )
}
