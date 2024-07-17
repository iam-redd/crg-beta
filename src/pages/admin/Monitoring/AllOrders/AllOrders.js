import React from 'react'
import { DefaultSpinner } from '../../../../components/Spinner'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'
import axios from '../../../../store/axios'

export default function AllOrders({ data, getAllOrders, index }) {
    const allOrders = data.reverse() || null
    return (
        <>
            {
                allOrders === null ?
                    <DefaultSpinner /> :
                    <div className="">
                        {
                            data.map(product => {
                                return (
                                    <OrderCardMonitorng
                                        key={product._id}
                                        data={product}
                                        getAllOrders={getAllOrders}
                                        index={index} />
                                )
                            })
                        }
                    </div>
            }
        </>

    )
}
