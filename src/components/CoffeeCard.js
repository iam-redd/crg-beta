import React from 'react';
import cardImg from '../assets/cards/JMB_8162.jpg'
import { Button, Card, IconButton, Option, Progress, Select, Typography } from '@material-tailwind/react';

function CoffeeCard () {
    return (
        <div>
        <Card className='w-80 h-full border py-5 px-5'>
                <div className='flex justify-end py-2 px-4'>
                Топ-недели
                </div>
                <h2 className='text-center font-bold text-2xl'>Перу</h2>
                <div className='flex mt-5'>
                    <img src={cardImg} alt='card-img' className='object-cover w-1/2'/>
                    <div  className='grid grid-cols-1 grid-rows-6 gap-3 px-4 py-3 text-xs'>
                        <p>
                            Обработка: <span>Мытая</span>
                        </p>
                        <p>Кислотность:</p>
                        <Progress color='red' size='sm' value={70}/>
                        <p>Плотность:</p>
                        <Progress color='red' size='sm' value={60}/>
                        <p>Оценка Q: <span>83.5</span></p>
                    </div>
                </div>
                <div className='mt-5 text-sm'>
                        <p>
                            Описание: <span>
                            Кофе с сочной кислотностью, плотным, округлым телом и нотками чёрной  смородины, чёрного чая, сушёных тёмных ягод и специй
                                    </span>
                        </p>
                </div>
                <div className='flex justify-between items-center mt-8 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                    Помол: 
                    <div className='col-span-3'>
                        <Select size="md" label="Выберите помол">
                            <Option>Под турку</Option>
                            <Option>Под гейзер/Мокка</Option>
                            <Option>Под Эспрессо</Option>
                            <Option>Под Фильтр</Option>
                            <Option>Под Френч-пресс</Option>
                        </Select>
                    </div>
                    </div>
                    
                </div>
                <div className='flex justify-between mt-5 text-sm'>
                <div className='grid grid-cols-4 items-center'>
                    <p>Вес:</p>
                    <div className='col-span-3'>
                        <Select size="md" label="Выберите вес">
                            <Option>250гр</Option>
                            <Option>500гр</Option>
                            <Option>1000гр</Option>
                        </Select>
                    </div>
                </div>
                    
                </div>
                <div className='mt-5'>
                    <Typography variant='h5'>Цена: <span>50000</span> UZS</Typography>
                </div>
                <div className='flex mt-5 items-center justify-between'>
                    <div className='flex items-center justify-between'>
                    <IconButton color='red' className=' w-8 h-8'>-</IconButton>
                    <span className='mx-2'>1</span>
                    <IconButton color='red' className=' w-8 h-8'>+</IconButton>
                    </div>
                        <Button variant='outlined' color='red'>В корзину</Button>
                </div>
                

            </Card>
            
        </div>
    );
};

export default CoffeeCard;