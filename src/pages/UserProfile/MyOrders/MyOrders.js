import React, { useEffect, useState } from 'react'
import styles from './MyOrders.module.css'
import { useNavigate } from 'react-router-dom'
import axios from '../../../store/axios'
import { DefaultSpinner } from '../../../components/Spinner'
import OrderCard from './OrderCard/OrderCard'
export default function MyOrders() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  console.log(data)
  async function getMyOrders() {
    try {
      const data = await axios.get('/get-my-orders')
      if (data.status === 200) {
        setData(data.data)
      } else throw new Error('Что-то пошло не так')
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    data === null && getMyOrders()
  });
  return (
    <div>
      <div
        className={styles.btnBack}
        onClick={() => navigate(-1)}>Go Back</div>
      <div>
        {
          data !== null ?
            <>
              {
                data.length > 0 ?
                  <>
                    {
                      data.map(order=> <OrderCard key={order._id} data={order}/>)
                    }</> : <h2>У вас нет еще оформленных заказов</h2>
              }
            </> :
            <DefaultSpinner />
        }
      </div>
    </div>
  )
}
