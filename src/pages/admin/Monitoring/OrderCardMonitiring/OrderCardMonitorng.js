import React, { useState } from 'react'
import styles from './OrderCardMonitoring.module.css'
import OrderStatus from './OrderStatus/OrderStatus'
import icon from '../../../../assets/icons/iconbottom.png'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from './ProductCard/ProductCard'
import { useSelector } from 'react-redux'
export default function OrderCardMonitorng({ data, getAllOrders, index }) {
    const [isVisible, setVisible] = useState(false)
    const [isVisible2, setVisible2] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const [isVisibleEdit] = useState(false)
    const handleVisible = () => setVisible(!isVisible)
    const handleVisible2 = () => setVisible2(!isVisible2)
    const variants = {
        open: { transform: 'rotate(-180deg' },
        closed: { transform: 'rotate(0deg' }
    }
    return (
        <>
            {
                <div className={styles.container}>
                    <div className={styles.header}>
                        № {data.identifier}
                    </div>
                    <div className={styles.main}>
                        <p>Заказчик: <span className={styles.status}>{data.userName}</span></p>
                        <p>Статус: <span className={styles.status}>{data.status}</span></p>
                        <p>Дата заказа: <span className={styles.status}>{data.creationDate}</span></p>
                        <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
                        <p>Способ оплаты: <span className={styles.status}>{data.paymentMethod}</span></p>
                    </div>
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
                                className={styles.wrapper}
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                            >
                                <div className={styles.list_wrapper}>
                                    {
                                        data.listProducts.map((product, x) => {
                                            return (
                                                <ProductCard
                                                    data={product}
                                                    key={x}
                                                    isVisible={isVisibleEdit}
                                                    orderId={data._id}
                                                    getAllOrders={getAllOrders}
                                                    bool={true}
                                                    index={index}
                                                />
                                            )
                                        })
                                    }
                                </div>

                            </motion.div>
                        }

                    </AnimatePresence>
                    {
                        data.rejectedList.length > 0 &&
                        <div className={styles.footer}
                            onClick={handleVisible2}>
                            <span>
                                <> Удалённые товары из заказа
                                    {
                                        ' ' + data.rejectedList.length
                                    }
                                    {
                                        data.rejectedList.length === 1 ? ' товар' :
                                            <>
                                                {
                                                    data.rejectedList.length < 5 ? ' товара' : ' товаров'
                                                }
                                            </>
                                    }
                                </>
                            </span>
                            <span>
                                {
                                    <motion.img
                                        src={icon}
                                        alt=""
                                        className={styles.img}
                                        animate={isVisible2 ? "open" : "closed"}
                                        variants={variants}
                                    />
                                }
                            </span>
                        </div>
                    }
                    <AnimatePresence>
                        {
                            isVisible2 &&
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                style={{ overflow: 'hidden' }}>
                                <div className={styles.list_wrapper}>
                                    {
                                        data.rejectedList.map((product, index) => {
                                            return (
                                                <ProductCard data={product} key={index} isVisible={isVisibleEdit} orderId={data._id} getAllOrders={getAllOrders} />
                                            )
                                        })
                                    }
                                </div>

                            </motion.div>
                        }
                    </AnimatePresence>
                    <OrderStatus status={data.status} getAllOrders={getAllOrders} id={data._id} index={index} />
                </div>
            }
        </>
    )
}



