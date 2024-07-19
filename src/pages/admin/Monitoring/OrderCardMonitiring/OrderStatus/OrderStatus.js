import React, { useState } from 'react'
import styles from './OrderStatus.module.css'
import axios from '../../../../../store/axios'
import { toast } from 'react-toastify'

export default function OrderStatus({ status, id, getAllOrders, index }) {
    const statusesDb = ['Отказано', 'В ожидании', 'Оформлен', 'В пути', 'Доставлен']
    const allStatuses = ['Отказ', 'Одобрить', 'Отправить', 'Доставлен']
    const [isLoading, setLoading] = useState(false)
    const notifyError = (text) => toast.error(text);
    let bool0 = true
    let bool1 = true
    let bool2 = true
    let bool3 = true

    if (index === 0) {
        bool2 = false
        bool3 = false
    }
    if (index === 1) {
        bool1 = false
        bool3 = false
    }
    if (index === 2) {
        bool0 = false
        bool1 = false
        bool2 = false

    }
    if (index === 3) {
        bool0 = false
        bool1 = false
        bool2 = false
        bool3 = false
    }
    if (index === 4) {
        bool0 = false
        bool1 = false
        bool2 = false
        bool3 = false

    }

    if (index === 5) {
        if (status === "Отказано") {
            bool0 = false
            bool1 = false
            bool2 = false
            bool3 = false
        }
        if (status === "В ожидании") {
            bool2 = false
            bool3 = false
        }
        if (status === "Одобрено") {
            bool2 = false
            bool3 = false
        }
        if (status === "В пути") {
            bool0 = false
            bool1 = false
            bool2 = false
        }
        if (status === "Доставлен") {
            bool0 = false
            bool1 = false
            bool2 = false
            bool3 = false
        }
    }


    async function updateStatus(nextStatus) {
        try {
            setLoading(true)
            if (status !== nextStatus) {
                const request = await axios.patch('/order', {
                    orderId: id,
                    nextStatus
                })

                if (request.status === 200) {
                    getAllOrders()
                }
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            if(e.response.status === 404){
                notifyError(e.response.data.message)

            }

        }
    }
    return (
        <div className={styles.container}>
            <div
                className={`${styles.colorRed} ${styles.btn_wrapper} ${!bool0 && styles.opacity}`}
                onClick={() => bool0 && !isLoading && updateStatus('Отказано')}>
                <div className={styles.btn_}>1</div>
                {allStatuses[0]}
            </div>
            <div className={`${styles.btn_wrapper} ${!bool1 && styles.opacity}`}
                onClick={() => bool1 && !isLoading && updateStatus('Оформлен')}>
                <div className={styles.btn}>2</div>
                {allStatuses[1]}
            </div>
            <div className={`${styles.btn_wrapper} ${!bool2 && styles.opacity}`}
                onClick={() => bool2 && !isLoading && updateStatus('В пути')}>
                <div className={styles.btn}>3</div>
                {allStatuses[2]}
            </div>
            <div className={`${styles.btn_wrapper} ${!bool3 && styles.opacity}`}
                onClick={() => bool3 && !isLoading && updateStatus('Доставлен')}>
                <div className={styles.btn}>4</div>
                {allStatuses[3]}
            </div>
        </div>
    )
}
