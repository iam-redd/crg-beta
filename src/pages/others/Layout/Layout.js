import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'
import List from '../../../components/Others'
import { DefaultSpinner } from '../../../components/Spinner';

const Layout = () => {
  return (
    <>
      <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
        <div className='grid grid-cols-4'>
          <div className='col-span-1 px-4'>
            <List />
          </div>
          <div className='col-span-4 md:col-span-3 px-4'>
            <Suspense fallback={<DefaultSpinner />}>
              <Outlet />
            </Suspense>
          </div>

        </div>
      </div>

    </>
  );
};

export default Layout;