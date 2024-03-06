import React from 'react';
import { Card } from '@material-tailwind/react';
import schoolImg from '../assets/kons_img4.jpg'

const JSBarista = () => {
    return (
        <div className='2xl:max-w-screen-2xl m-auto'>
            <Card className='w-full border mt-10' >
                <div className='flex'>
                    <div className='p-5 m-auto w-2/4'>
                        <h1 className='text-4xl font-bold'>Школа бариста</h1>
                        <span className='text-xl'>Научим, если ты новичок и поможем улучшить твои навыки, если уже умеешь готовить кофе</span>
                    </div>

                    <div className='object-cover p-2 w-1/3'>
                        <img className='rounded-xl ' src={schoolImg} alt='schoolImg' />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default JSBarista;