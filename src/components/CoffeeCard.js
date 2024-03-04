import React, { useState } from 'react';
import { Button, Card, IconButton, Option, Progress, Select, Typography } from '@material-tailwind/react';
import cart from '../assets/icons/icons8-cart-64.png'
import img from '../assets/cards/JMB_8162.jpg'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
function CoffeeCard({ data }) {
    const weightSize = ['250гр', '500гр', '1000гр']
    const [boolBasket, setBoolBasket] = useState(false)

    const navigate = useNavigate()
    const [pomol, setPomol] = useState(null)
    const [weight, setWeight] = useState(null)
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const basket = useSelector(state => state.basket.basket)
    const navigate = useNavigate()
    const changePomol = (val) => {
        const template = basket.filter(product => product.pomol === val)
        const template2 = template.filter(product => product.weight === weight)
        if(basket.length > 0 && template2.length > 0){
            console.log(template2)
            setBoolBasket(true)
        }else{
            setBoolBasket(!true)
        }
        setPomol(val)
    }
    const changeWeight = (val) => {
        const template = basket.filter(product => product.weight === val)
        const template2 = template.filter(product => product.pomol === pomol)
        if(basket.length > 0 && template2.length > 0 && data._id === template2[0].id){
            console.log(template2)
            setBoolBasket(true)
        }else{
            setBoolBasket(!true)
        }
        setWeight(val)
    }


    function addToBasketе() {
        if (pomol === null) {
            return console.log('Помол не выбран')
        }
        if (weight === null) {
            return console.log('Обьем упаковки не выбран')
        }
        const info = { id: data._id, amount, weight, pomol }
        dispatch(addTooBasket(info))
        setBoolBasket(true)
        return console.log('Добавлен в корзину')
    }
    return (
        <div className='mb-5'>
            <Card className='w-80 h-full border py-5 px-5'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>{data?.name ? data.name : ''}</h2>
                <p className='text-red-600 text-xs text-center font-medium'>под эспрессо</p>
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

                            <Select size="md" label="Выберите помол" defaultValue={'turku'} onChange={(e) => changePomol(e)}>
                                <Option  value='turku'>Под турку</Option>
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
                        <span>{
                            !weightSize.includes(weight)&& "от "
                        }
                            {
                                -1 === weightSize.indexOf(weight) ? data.priceUser[0] : data.priceUser[weightSize.indexOf(weight)]
                            }

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
                            <Button variant='outlined' color='red' onClick={() => navigate('/basket')}> <span><img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" /></span>Перейти</Button> :
                            <Button variant='outlined' color='red'>В корзину</Button>
                    }

                </div>
            </Card>
        </div>
    );
};

export default CoffeeCard;



