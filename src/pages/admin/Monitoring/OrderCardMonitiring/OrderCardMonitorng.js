import React, { useState } from 'react'
import styles from './OrderCardMonitoring.module.css'
import OrderStatus from './OrderStatus/OrderStatus'
import icon from '../../../../assets/icons/iconbottom.png'
import url from '../../../../default.json'
import { AnimatePresence , motion} from 'framer-motion'
export default function OrderCardMonitorng({ data, getAllOrders }) {
    const [isVisible, setVisible] = useState(false)
  const handleVisible = () => setVisible(!isVisible)
  const variants = {
    open: { transform: 'rotate(-180deg' },
    closed: { transform: 'rotate(0deg' }
  }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                ID {data._id}
            </div>
            <div className={styles.main}>
                <p>Статус: <span className={styles.status}>{data.status}</span></p>
                <p>Дата заказа: <span className={styles.status}>{data.createdAt}</span></p>
                <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
                <div
                    className={styles.footer}
                    onClick={handleVisible}>
                    <span>
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
                <OrderStatus status={data.status} getAllOrders={getAllOrders} id={data._id} />
            </div>
        </div>
    )
}



function Order({ data }) {
    return (
        <div className={styles.order}>
            <img src={`${url.backendUrl}/${data.img}`} alt="" />
            <div className={styles.info}>
                <p>Найменования: {data.name}</p>
                <p>Обьём: {data.weight}</p>
                <p>Цена: {data.price} сум</p>
                <p>Количество: {data.amount}</p>
            </div>
        </div>

    )

}