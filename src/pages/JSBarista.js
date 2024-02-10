import React from 'react';
import { Card } from '@material-tailwind/react';
import schoolImg from '../assets/kons_img4.jpg'

const JSBarista = () => {
    return (
        <div className='2xl:max-w-screen-2xl m-auto'>
            <Card className='w-full h-1/2 border' >
                <div className='grid grid-cols-5'>
                    <div className='col-span-3 p-5'>
                        <h1 className='text-4xl'>Базовый курс бариста</h1>
                        <span className='text-xl'>Откройте для себя тонкости правильного приготовления кофе и освойте базовые умения бариста под руководством опытных специалистов</span>
                    </div>

                    <div className='col-span-2 object-cover p-2'>
                        <img className='rounded-xl ' src={schoolImg} alt='schoolImg' />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default JSBarista;