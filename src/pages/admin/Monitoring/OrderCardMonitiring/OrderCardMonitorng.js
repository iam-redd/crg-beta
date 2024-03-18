import React from 'react'
import styles from './OrderCardMonitoring.module.css'
import OrderStatus from './OrderStatus/OrderStatus'
export default function OrderCardMonitorng({ data, getAllOrders }) {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                ID {data._id}
            </div>
            <div className={styles.main}>
                <p>Статус: <span className={styles.status}>{data.status}</span></p>
                <p>Дата заказа: <span className={styles.status}>{data.createdAt}</span></p>
                <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
                <OrderStatus status={data.status} getAllOrders={getAllOrders} id={data._id} />
            </div>
        </div>
    )
}
