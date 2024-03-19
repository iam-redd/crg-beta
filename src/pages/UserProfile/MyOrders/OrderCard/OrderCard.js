import React from 'react'
import styles from './OrderCard.module.css'
export default function OrderCard({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        ID заказа: #{data._id}
      </div>
        <div className='flex mt-2'>
          <div className={styles.main}>
            <p>Статус: <span className={styles.status}>{data.status}</span></p>
            <p>Дата заказа: <span className={styles.status}>{data.createdAt}</span></p>
            <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
          </div>
          <div className='grow ml-5 text-sm'>
            <p>Список товаров: <span>Что именно заказано и сколько</span></p>
          </div>
          <div className=''>X</div>
        </div>
    </div>
    
  )
  
}
