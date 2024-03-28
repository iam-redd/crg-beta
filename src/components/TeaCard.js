import React from 'react';
import { Button, Card, Option, Progress, Select, Typography } from '@material-tailwind/react';

const TeaCard = () => {
    return (
        <div className=''>
            <Card className='w-80 h-full border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>Xdlkw NEOAND</h2>
                <div className='flex mt-5'>
                    <img src='' alt='card-img' className='object-cover w-1/2' />
                    <div className='grid grid-cols-1 grid-rows-8 gap-1 px-3 py-2 text-xs'>
                        <p>
                            Обработка: <span>dmlkwqd</span>
                        </p>
                        <p>Кислотность:</p>
                        <Progress color='red' size='sm' value='3' />
                        <p>Плотность:</p>
                        <Progress color='red' size='sm' value='3' />
                        <p>Оценка Q: <span>32</span></p>
                    </div>
                </div>
                <div className='mt-5 text-sm'>
                    <p>
                        Описание: <span>
                            knwlenwej ckwek wkec kjewc wec wke kw k we wk cc we,c s,m ckjwa cmns c
                        </span>
                    </p>
                </div>
                
                <div className='flex justify-between mt-5 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        <p>Вес:</p>
                        <div className='col-span-3'>
                            <Select
                                size="md"
                                label="Выберите вес"
                                >
                                
                                    
                                        <Option>
                                            50 гр
                                        </Option>
                                        <Option>100 гр</Option>
                                    
                                
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

                </div>
            </Card>
        </div>
    );
};

export default TeaCard;