import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminComponent from '../../../components/AdminComponent';
import { useSelector } from 'react-redux';


function Layout() {
  const userInfo = useSelector(state => state.user.userInfo)
  const navigate = useNavigate()
  // console.log(userInfo)
  if(userInfo === null) navigate('/')
  if(userInfo !== null){
    if(userInfo.role === 'user' || userInfo.role === 'superUser') navigate('/')
  }

  return (
    <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
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