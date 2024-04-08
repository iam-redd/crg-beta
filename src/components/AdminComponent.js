import React from 'react';
import { Link } from 'react-router-dom';

import calls from '../assets/icons/application.png'
import add from '../assets/icons/image-gallery.png'
import allGoods from '../assets/icons/allgoods.png'
import usersImg from '../assets/icons/people.png'

const AdminComponent = () => {

    return (
        <div>
        <div className='flex justify-center'>
            <Link to='monitoring'>
                <div className='border rounded p-2 m-5 '>
                 <img src={calls} alt='' />
                    Заявки
                </div>
            </Link>
            <Link to='create'>
                <div className='border rounded p-2 m-5 '>
                <img src={add} alt='' />                                    
                     Добавить                                  
            </div>
            </Link> 
            <Link to='all-goods'>
            <div className='border rounded p-2 m-5 '>
                <img src={allGoods} alt='' />                                
                    Товары                              
            </div>
            </Link>
            <Link to='all-users'>
            <div className='border rounded p-2 m-5 '>
                <img src={usersImg} alt='' />                                
                    Пользователи                                   
            </div>
            </Link> 
        </div>            
        </div>
    );
};

export default AdminComponent;