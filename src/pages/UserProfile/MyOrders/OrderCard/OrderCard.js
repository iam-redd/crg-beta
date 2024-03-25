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
        <p>Статус: <span className={data.status !== 'Отказано' ? styles.status : styles.statusRejected}>{data.status}</span></p>
        <p>Дата заказа: <span className={styles.status}>{data.createdAt.split('').splice(0,10)}</span></p>
        <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
      </div>
      <div
        className={styles.footer}
        onClick={handleVisible}>
        <span style={{color:'#7d7d7d'}}>
          {
            <>
              {
                data.listProducts.length
              }
              {
                data.listProducts.length === 1 ? ' товар' :
                  <>
                    {
                      data.listProducts.length < 5 ? ' товара' : ' товаров'
                    }
                  </>
              }
            </>
          }
        </span>
        <span>
          {
            <motion.img
              src={icon}
              alt=""
              className={styles.img}
              animate={isVisible ? "open" : "closed"}
              variants={variants}
            />
          }
        </span>
      </div>
      <AnimatePresence>
        {
          isVisible &&
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            style={{ overflow: 'hidden' }}>
            <div className={styles.list_wrapper}>
              {
                data.listProducts.map((product, index) => {
                  return (
                    <Order data={product} key={index} />
                  )
                })
              }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>

  )
}


function Order({ data }) {
  return (
    <div className={styles.order}>
      <img src={`${url.backendUrl}/${data.img}`} alt="" />
      <div className={styles.info}>
        <p>Название: {data.name}</p>
        <p>Вес: {data.weight}</p>
        <p>Цена: {data.price} сум</p>
        <p>Кол-во: {data.amount} шт.</p>
      </div>
    </div>

  )

}
