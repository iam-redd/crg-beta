import React, { useState } from 'react'
import styles from '../../../../../../pages/admin/Monitoring/OrderCardMonitiring/OrderCardMonitoring.module.css'
import icon from '../../../../../../assets/icons/iconbottom.png'
import { AnimatePresence, motion } from 'framer-motion'
import ProductCard from '../../../../../../pages/admin/Monitoring/OrderCardMonitiring/ProductCard/ProductCard'
export default function OrderCardMonitorng({ data, getAllOrders, index }) {
    const [isVisible, setVisible] = useState(false)
    const [isVisible2, setVisible2] = useState(false)

    const [isVisibleEdit] = useState(false)
    const handleVisible = () => setVisible(!isVisible)
    const handleVisible2 = () => setVisible2(!isVisible2)
    const variants = {
        open: { transform: 'rotate(-180deg' },
        closed: { transform: 'rotate(0deg' }
    }
    const style = {
        fontSize:'14px',
        lineHeight:'20px',
        fontWeight:'400'
    }
    return (
        <div className='w-full h-auto text-start border shadow-md rounded-2xl border-blue-gray-900 mb-4' style={style}>
            <div className={styles.header}>
                Номер заказа
            </div>
            <div className='flex flex-col gap-2 m-4 text-sm'>
                <p>Статус:{data.status === 'Доставлено' ? <span className='text-xs bg-green-100 rounded-full p-1 ml-2'>{data.status}</span> : <span className='text-xs bg-blue-gray-100 rounded-full p-1 ml-2'>{data.status}</span>}
                </p>
                <p>Дата заказа: <span className={styles.status}>{data.creationDate}</span></p>
                <p>Сумма заказа: <span className={styles.status}>{data.totalPrice}</span></p>
                <p>ID {data._id}</p>
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
        </div>
    )
}



