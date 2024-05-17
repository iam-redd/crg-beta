import React from 'react';
import { Outlet } from 'react-router-dom'


const Layout = () => {
    return (
      <>
        <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
          <div className='flex-col'>
            <div className=''>
            <Outlet />
            </div>
          </div>
        </div>
      
    </>
    );
};

export default Layout;