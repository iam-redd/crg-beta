import React, { useState } from 'react'
import axios from '../../../../../store/axios'
import { toast } from 'react-toastify'
import {Button} from "@material-tailwind/react";

export default function OrderStatus({ status, id, getAllOrders, index }) {
    const statusesDb = ['Отказано', 'В ожидании', 'Оформлен', 'В пути', 'Доставлен']
    const allStatuses = ['Отказать', 'Одобрить', 'Отправить', 'Доставлен']
    const [isSpinner, setIsSpinner] = useState(false)
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
            <Button
                size='md'
                variant='outlined'
                color='red'
                disabled={!bool0 || isLoading}
                className={`items-center flex gap-2`}
                onClick={() => bool0 && !isLoading && updateStatus('Отказано')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/>
                </svg>
                {allStatuses[0]}
            </Button>
            <Button
                size='md'
                variant='filled'
                color='green'
                disabled={!bool1 || isLoading}
                ripple={true}
                className={`items-center flex gap-2`}
                onClick={() => bool1 && !isLoading && updateStatus('Оформлено')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                {allStatuses[1]}
            </Button>
            <Button
                size='md'
                variant='outlined'
                color='blue'
                disabled={!bool2 || isLoading}
                className={`items-center flex gap-2`}
                onClick={() => bool2 && !isLoading && updateStatus('В пути')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-5">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/>
                </svg>
                {allStatuses[2]}
            </Button>
            <Button
                size='md'
                variant='outlined'
                color='blue-gray'
                disabled={!bool3 || isLoading}
                className={`items-center flex gap-2`}
                onClick={() => bool3 && !isLoading && updateStatus('Доставлен')}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/>
                </svg>
                {allStatuses[3]}
            </Button>
        </div>
    )
}
