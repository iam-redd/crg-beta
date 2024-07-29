import React, { useState } from 'react'
import styles from './OrderStatus.module.css'
import axios from '../../../../../store/axios'
import { toast } from 'react-toastify'
import {CheckBadgeIcon, ExclamationCircleIcon, NoSymbolIcon, PaperAirplaneIcon} from "@heroicons/react/24/solid";

export default function OrderStatus({ status, id, getAllOrders, index }) {
    const statusesDb = ['Отказано', 'В ожидании', 'Оформлен', 'В пути', 'Доставлен']
    const allStatuses = ['Отказать', 'Одобрить', 'Отправить', 'Доставлен']
    const [isLoading, setLoading] = useState(false)
    const notifyError = (text) => toast.error(text);
    let bool0 = true
    let bool1 = true
    let bool2 = true
    let bool3 = true

    if (index === 0) {
        bool2 = false
        bool3 = false
    }
    if (index === 1) {
        bool1 = false
        bool3 = false
    }
    if (index === 2) {
        bool0 = false
        bool1 = false
        bool2 = false

    }
    if (index === 3) {
        bool0 = false
        bool1 = false
        bool2 = false
        bool3 = false
    }
    if (index === 4) {
        bool0 = false
        bool1 = false
        bool2 = false
        bool3 = false

    }

    if (index === 5) {
        if (status === "Отказано") {
            bool0 = false
            bool1 = false
            bool2 = false
            bool3 = false
        }
        if (status === "В ожидании") {
            bool2 = false
            bool3 = false
        }
        if (status === "Одобрено") {
            bool2 = false
            bool3 = false
        }
        if (status === "В пути") {
            bool0 = false
            bool1 = false
            bool2 = false
        }
        if (status === "Доставлен") {
            bool0 = false
            bool1 = false
            bool2 = false
            bool3 = false
        }
    }


    async function updateStatus(nextStatus) {
        try {
            setLoading(true)
            if (status !== nextStatus) {
                const request = await axios.patch('/order', {
                    orderId: id,
                    nextStatus
                })

                if (request.status === 200) {
                    getAllOrders()
                }
                setLoading(false)
            }
        } catch (e) {
            setLoading(false)
            if(e.response.status === 404){
                notifyError(e.response.data.message)

            }

        }
    }
    return (
        <div className={`w-full flex justify-center gap-6 p-4`}>
            <div
                className={`text-red-500 font-medium text-md text-center items-center flex flex-col cursor-pointer ${!bool0 && styles.opacity}`}
                onClick={() => bool0 && !isLoading && updateStatus('Отказано')}>
                    <NoSymbolIcon className='size-12 hover:scale-110' />
                {allStatuses[0]}
            </div>
            <div className={`text-green-500 font-medium text-md text-center items-center flex flex-col cursor-pointer ${!bool1 && styles.opacity}`}
                 onClick={() => bool1 && !isLoading && updateStatus('Оформлено')}>
                <CheckBadgeIcon className='size-12 hover:scale-110' />
                {allStatuses[1]}
            </div>
            <div className={`text-blue-500 font-medium text-md text-center items-center flex flex-col cursor-pointer ${!bool2 && styles.opacity}`}
                onClick={() => bool2 && !isLoading && updateStatus('В пути')}>
                <PaperAirplaneIcon className='size-12 hover:scale-110' />
                {allStatuses[2]}
            </div>
            <div className={`text-yellow-500-500 font-medium text-md text-center items-center flex flex-col cursor-pointer ${!bool3 && styles.opacity}`}
                onClick={() => bool3 && !isLoading && updateStatus('Доставлен')}>
                <ExclamationCircleIcon className='size-12 hover:scale-110' />
                {allStatuses[3]}
            </div>
        </div>
    )
}
