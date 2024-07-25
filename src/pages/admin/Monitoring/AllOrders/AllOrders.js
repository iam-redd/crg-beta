import React from 'react'
import { DefaultSpinner } from '../../../../components/Spinner'
import OrderCardMonitorng from '../OrderCardMonitiring/OrderCardMonitorng'
import { useSelector } from 'react-redux'

export default function AllOrders({ data, getAllOrders, index }) {
    const userInfo = useSelector(state => state.user.userInfo)
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
