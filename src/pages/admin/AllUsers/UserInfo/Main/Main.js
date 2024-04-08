import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../../../../store/axios'
import { DefaultSpinner } from '../../../../../components/Spinner'
import OrderCard from './OrderCard/OrderCard'
export default function Main() {
    const { id } = useParams()
    const [data, setData] = useState(null)
    async function getUserOrders() {
        const request = await axios.get(`/user-orders/${id}`)
        console.log(request)
        setData(request.data)
    }

    useEffect(() => {
        data === null && getUserOrders()
    });
    return (
        <div>
            {
                data !== null ?
                    <>
                        {
                            data.length > 0 ?
                                <>
                                    <div className="" style={{ lineHeight: '35px' }}>История заказов пользователья</div>
                                    <>
                                        {
                                            data.map(order => <OrderCard data={order} />)
                                        }
                                    </>
                                </> :
                                <div className="" style={{ lineHeight: '35px' }}>История заказов пусто</div>}
                    </> :
                    <DefaultSpinner />
            }
        </div>
    )
}
