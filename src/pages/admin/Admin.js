import React from 'react';
import AdminComponent from '../../components/AdminComponent';


const Admin = () => {
    return (
        <div className='mx-auto max-w-screen-xl 2xl:max-w-screen-2xl rounded-none px-4 2xl:px-0 py-2 lg:px-8 lg:py-4'>
            <div className='grid grid-cols-10'>
                <div className='col-span-2'>
                <AdminComponent/>
                </div>
                {/* <div className='text-xl font-bold text-center col-span-8'>Admin panel</div> */}
            </div>
        </div>
    );
};

export default Admin;