import React, { useEffect, useState } from 'react'
import axios from '../../../store/axios'
import { DefaultSpinner } from '../../../components/Spinner'
import OrderCard from './OrderCard/OrderCard'
export default function MyOrders() {
  const [data, setData] = useState(null)
  async function getMyOrders() {
    try {
      const data = await axios.get('/get-my-orders')
      if (data.status === 200) {
        setData(data.data.reverse())
      } else throw new Error('Что-то пошло не так')
    } catch (error) {
    }
  }

  useEffect(() => {
    data === null && getMyOrders()
  });
  return (
    <div className='xs:px-2'>
      <h2 className='flex justify-center font-bold my-5 xs:my-3'>История заказов</h2>
      {/* <div
        className={styles.btnBack}
        onClick={() => navigate(-1)}>Скрыть</div> */}
      <div>
        {
          data !== null ?
            <>
              {
                data.length > 0 ?
                  <>
                    <div className='flex flex-col justify-center p-2'>
                    {
                      data.map(order=> <OrderCard key={order._id} data={order}/>)
                    }
                      </div></> : <h2 className='text-center'>У вас нет еще оформленных заказов</h2>
              }
            </> :
            <DefaultSpinner />
        }
      </div>
    </div>
  )
}
