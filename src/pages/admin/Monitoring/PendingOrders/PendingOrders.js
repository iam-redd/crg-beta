import React from 'react'
import { DefaultSpinner } from '../../../../components/Spinner'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'

export default function PendingOrders({ data, getAllOrders, index }) {
    console.log(index)
    return (
        <div>
            {
                data !== null ? <>
                    {
                        data.map(product => {
                            return (
                                product.status === 'В ожидании' &&
                                <OrderCardMonitorng
                                    key={product._id}
                                    data={product}
                                    getAllOrders={getAllOrders}
                                    index={index} />
                            )
                        })
                    }</> : <DefaultSpinner />
            }
        </div>
    )
}
