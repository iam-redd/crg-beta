import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminComponent from '../../../components/AdminComponent';

import styles from './Layout.module.css'
function Layout() {
  return (
    <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
      <div className='grid grid-cols-10'>
        <div className='col-span-2'>
          <AdminComponent />
        </div>
        <div className='text-xl font-bold text-center col-span-8'>
          <div className={styles.container}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout