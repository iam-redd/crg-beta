import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react'
import { useSelector } from 'react-redux';


const AdminComponent = () => {
    const userInfo = useSelector(state => state.user.userInfo)

    return (
        <div>
            <div className='flex justify-center items-center h-max flex-col sm:flex-row gap-2 my-10'>
                {
                    // userInfo !== null && userInfo.role === 'admin' || userInfo.role === 'developer'&&
                    <Link to='all-goods'>
                        <Button color='blue-gray' variant='outlined'>Все товары</Button>
                    </Link>
                }
                <Link to='monitoring'>
                    <Button color='blue-gray' variant='outlined'>Заказы</Button>
                </Link>
                <Link to='all-users'>
                    <Button color='blue-gray' variant='outlined'>Пользователи</Button>
                </Link>
                {
                    // userInfo !== null && userInfo.role === 'admin' || userInfo.role === 'developer' &&
                    <Link to='create'>
                        <Button color='blue-gray' variant='outlined'>Добавить</Button>
                    </Link>
                }
            </div>
        </div>
    );
};

export default AdminComponent;