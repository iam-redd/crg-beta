import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminComponent from '../../../components/AdminComponent';
import { useSelector } from 'react-redux';


function Layout() {
  const allGoods = useSelector(state => state.service.allProducts)
  const navigate = useNavigate()
  allGoods == null && navigate('/user')
  useEffect(()=> {
  },[])
  return (
    <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
      <button onClick={()=> navigate('/user')}>Назад</button>
      <div className='flex-col'>
        <div className=''>
          <AdminComponent />
        </div>
        <div className='text-xl font-bold text-center col-span-8'>
          <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout