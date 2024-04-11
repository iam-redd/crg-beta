import React from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button} from '@material-tailwind/react'


const AdminComponent = () => {

    return (
        <div>
        <div className='flex justify-center items-center h-max flex-col sm:flex-row gap-2 my-10'>
        
        <Link to='monitoring'>   
            <Button color='blue-gray' variant='outlined'>Заказы</Button>
        </Link> 
        <Link to='create'>
            <Button color='blue-gray' variant='outlined'>Добавить</Button>
        </Link>
        <Link to='all-goods'>
            <Button color='blue-gray' variant='outlined'>Все товары</Button>
        </Link>
        <Link to='all-users'>
            <Button color='blue-gray' variant='outlined'>Пользователи</Button>
        </Link>
        </div>            
        </div>
    );
};

export default AdminComponent;