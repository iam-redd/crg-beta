import React, { useState } from 'react'
import styles from './OrderCard.module.css'
import icon from '../../../../assets/icons/iconbottom.png'
import { AnimatePresence, motion } from 'framer-motion'
import url from '../../../../default.json'
export default function OrderCard({ data }) {
  const [isVisible, setVisible] = useState(false)
  const handleVisible = () => setVisible(!isVisible)
  const variants = {
    open: { transform: 'rotate(-180deg' },
    closed: { transform: 'rotate(0deg' }
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        ID заказа: #{data._id}
      </div>
      <div className={styles.main}>
        <p>Статус: <span className={styles.status}>{data.status}</span></p>
        <p>Дата заказа: <span className={styles.status}>{data.createdAt}</span></p>
        <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
      </div>
    </div>
    
  )
  
}
