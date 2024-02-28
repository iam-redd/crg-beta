import React, { useState } from 'react';
import { Button, Card, IconButton, Option, Progress, Select, Typography } from '@material-tailwind/react';
import cart from '../assets/icons/icons8-cart-64.png'
import img from '../assets/cards/JMB_8162.jpg'
import {useNavigate} from 'react-router-dom'
function CoffeeCard({ data }) {
    const weightSize = ['250гр', '500гр', '1000гр']
    const [boolBasket,setBoolBasket] = useState(false)
  
    const navigate = useNavigate()

    return (
        <div className='mb-5'>
            <Card className='w-80 h-full border py-5 px-5'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>{'Efhiopia'}</h2>
                <div className='flex mt-5'>
                    <img src={`${img}`} alt='card-img' className='object-cover w-1/2' />
                    <div className='grid grid-cols-1 grid-rows-8 gap-1 px-3 py-2 text-xs'>
                        <p>
                            Обработка: <span>Мытая</span>
                        </p>
                        <p>Кислотность:</p>
                        <Progress color='red' size='sm' value={80} />
                        <p>Плотность:</p>
                        <Progress color='red' size='sm' value={50} />
                        <p>Оценка Q: <span>{80}</span></p>
                    </div>
                </div>
                <div className='mt-5 text-sm'>
                    <p>
                        Описание: <span>
                            {'Определённый вкусовой профиль, баланс в котором смещён в сторону сладости и тактильности, плотное тело, мягкая ненавязчивая кислотность, шоколадные нотки. Натуральная обработка.'}
                        </span>
                    </p>
                </div>
                <div className='flex justify-between items-center mt-4 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        Помол:
                        <div className='col-span-3'>
                            <Select size="md" label="Выберите помол">
                                <Option value='turku'>Под турку</Option>
                                <Option value='mokka'>Под гейзер/Мокка</Option>
                                <Option value='espresso'>Под Эспрессо</Option>
                                <Option value='filter'>Под Фильтр</Option>
                                <Option value='french-press'>Под Френч-пресс</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between mt-5 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        <p>Вес:</p>
                        <div className='col-span-3'>
                            <Select size="md" label="Выберите вес">
                                {
                                    weightSize.map((item, index) => (
                                        <Option
                                            key={index}
                                            value={item}
                                        >{item}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Typography variant='h6'>Цена:
                        <span>
                            150 000
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
                    {
                        boolBasket ?
                            <Button variant='outlined' color='red' onClick={()=> navigate('/basket')}> <span><img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" /></span>Перейти</Button> :
                            <Button variant='outlined' color='red'>В корзину</Button>
                    }

                </div>
            </Card>
        </div>
    );
};

export default CoffeeCard;



