import React from 'react'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'
import { DefaultSpinner } from '../../../../components/Spinner'

export default function OnTheWayOrders({data , getAllOrders}) {
    return (<div>
        {
            data !== null ? <>
                {
                    data.map(product => {
                        return (
                            product.status === 'В пути' &&
                            <OrderCardMonitorng key={product._id} data={product} getAllOrders={getAllOrders} />
                        )
                    })
                }</> : <DefaultSpinner />
        }
    </div>)
}
