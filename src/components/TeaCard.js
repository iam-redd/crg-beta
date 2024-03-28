import React from 'react';
import { Button, Card, Option, Progress, Select, Typography } from '@material-tailwind/react';

const TeaCard = () => {
    return (
        <div className=''>
            <Card className='w-80 h-auto border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>Название чая</h2>
                <p className='text-center text-xs'>Черный чай или зеленый</p>
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
                
                <div className='flex justify-between mt-5 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        <p>Вес:</p>
                        <div className='col-span-1'>
                            <Select
                                size="md"
                                label="Выберите вес"
                                >
                                <Option>50 гр</Option>
                                <Option>100 гр</Option>
                            </Select>
                        </div>
                    </div>
                    
                </div>
                <div className='flex justify-between mt-2 text-sm'>
                <div className='grid grid-cols-4 items-center'>
                        <p>Упа-ка: </p>
                        <div className='col-span-3'>
                            <Select
                                size="sm"
                                label="Выберите вес"
                                >
                                        <Option>Крафт пакет</Option>
                                        <Option>Картон</Option>
                                        <Option>Алюминь</Option>
                            </Select>
                        </div>
                    </div>
                    </div>
                <div className='mt-5'>
                    <Typography variant='h6'>Цена: 
                        <span>r 430-43
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

export default TeaCard;