import React from 'react'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'
import { DefaultSpinner } from '../../../../components/Spinner'

export default function IssuedOrders({ data, getAllOrders, index }) {
    return (<div>
        {
            data !== null ? <>
                {
                    data.map(product => {
                        return (
                            product.status === 'Оформлен' &&
                            <OrderCardMonitorng
                                key={product._id}
                                data={product}
                                getAllOrders={getAllOrders}
                                index={index} />
                        )
                    })
                }</> : <DefaultSpinner />
        }
    </div>)
}
