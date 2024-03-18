import React from 'react'
import { DefaultSpinner } from '../../../../components/Spinner'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'

export default function AllOrders({ data, getAllOrders }) {

    return (
        <>
            {
                data === null ?
                    <DefaultSpinner /> :
                    <div className="">
                        {
                            data.map(product => {
                                return (
                                    <OrderCardMonitorng key={product._id} data={product} getAllOrders={getAllOrders} />
                                )
                            })
                        }
                    </div>
            }
        </>

    )
}
