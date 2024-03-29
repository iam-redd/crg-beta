import React from 'react';
import { Button, Card, Option, Progress, Select, Typography } from '@material-tailwind/react';

const AnyCard = () => {
    return (
        <div className=''>
            <Card className='w-80 h-auto border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>Название сиропа или что то еще</h2>
                <p className='text-center text-xs'>Сироп или химия</p>
                <div className='flex mt-5'>
                    <img src='' alt='card-img' className='object-cover w-full' />
                    Фото
                </div>
                <div className='mt-5 text-sm'>
                    <p>
                        Описание: <span>
                            Какой то цай с каким то цаем пипиську поднимет и блаблаблаблаблаблабл аблабалаблабалб алабалабал абалабал
                        </span>
                    </p>
                </div>
                <div className='mt-5'>
                    <Typography variant='h6'>Цена: 
                        <span> 220 000
                        </span> UZS</Typography>
                </div>
                <div className='flex mt-5 items-center justify-between'>
                    {/* <div className='flex items-center justify-between'>
                        <IconButton
                            color='red'
                            className=' w-8 h-8'
                            // onClick={() => setAmount(amount === 1 ? 1 : amount - 1)}
                        >-</IconButton>
                        <span className='mx-2'>{amount}</span>
                        <IconButton
                            color='red'
                            className=' w-8 h-8'
                            // onClick={() => setAmount(amount + 1)}
                            >+</IconButton>
                    </div> */}
                    <Button
                                variant='outlined'
                                color='red'
                                onClick={''}>В корзину</Button>

                                <Button
                                variant='outlined'
                                color='red'
                                onClick={''}
                                >
                                Подробно</Button>

                </div>
            </Card>
        </div>
    );
};

export default AnyCard;