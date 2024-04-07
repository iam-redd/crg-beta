import React, { useState } from 'react';
import { Button, Card, Option, Progress, Select, Typography } from '@material-tailwind/react';
import cart from '../assets/icons/icons8-cart-64.png'
/*import img from '../assets/cards/JMB_8162.jpg'*/
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { addTooBasket } from '../../src/store/slices/basketSlice'
import url from '../default.json'
function CoffeeCard({ data }) {
    const width = window.innerWidth
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const weightSize = ['250гр', '500гр', '1000гр']
    const basket = useSelector(state => state.basket.basket)
    const [weightColor, setWeightColor] = useState(false)
    const [pomolColor, setPomoltColor] = useState(false)
    
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const [boolBasket, setBoolBasket] = useState(
        allProductsId !== null ?
            allProductsId.length > 0 ? allProductsId.includes(data._id) : false :
            false
    )
    const amount = 1;
    const [pomol, setPomol] = useState(null)
    const [weight, setWeight] = useState(null)
    const navigate = useNavigate()
    const changePomol = (val) => {
        setPomoltColor(false)
        const template = basket.filter(product => product.pomol === val)
        const template2 = template.filter(product => product.weight === weight)
        if (basket.length > 0 && template2.length > 0) {
            console.log(template2)
            setBoolBasket(true)
        } else {
            setBoolBasket(!true)
        }
        setPomol(val)
    }
    const changeWeight = (val) => {
        setWeightColor(false)
        const template = basket.filter(product => product.weight === val)
        const template2 = template.filter(product => product.pomol === pomol)
        if (basket.length > 0 && template2.length > 0 && data._id === template2[0].id) {
            console.log(template2)
            setBoolBasket(true)
        } else {
            setBoolBasket(!true)
        }
        setWeight(val)
    }


    function addToBasketе() {
        setPomoltColor(false)
        setWeightColor(false)
        if (pomol === null) {
            setPomoltColor(true)
            return console.log('Помол не выбран')
        }
        if (weight === null) {
            setWeightColor(true)
            return console.log('Обьем упаковки не выбран')
        }
        const info = {
            id: data._id,
            amount,
            weight,
            pomol,
            price: userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[weightSize.indexOf(weight)] : data.priceUser[weightSize.indexOf(weight)],
            name: data.name,
            img: data.img,
            type: data.type,
        }
        dispatch(addTooBasket(info))
        setBoolBasket(true)
        return console.log('Добавлен в корзину')
    }

    const handleWeightColor = () => setWeightColor(false)
    const handlePomolColor = () => setPomoltColor(false)

    return (
        <div className=''>
            <Card className='w-80 h-full border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>{data?.name ? data.name : ''}</h2>
                <p className='text-xs flex text-red-200 justify-center'>{data.roast}</p> {/*Вытаскиваем с базы для эспрессо или фильтра*/}
                <div className='flex mt-5'>
                    <img src={`${url.backendUrl}/${data.img}`} alt='card-img' className='object-cover w-1/3' />
                    <div className='grid grid-cols-1 grid-rows-8 gap-1 px-3 py-2 text-xs'>
                        <p>
                            Обработка: <span>{data.treatment}</span>
                        </p>
                        <p>Кислотность:</p>
                        <Progress color='red' size='sm' value={data?.acidity ? data.acidity : 0} />
                        <p>Плотность:</p>
                        <Progress color='red' size='sm' value={data?.density ? data.density : 0} />
                        <p>Оценка Q: <span>{data?.scores ? data.scores : 0}</span></p>
                    </div>
                </div>
                <div className='mt-5 text-sm'>
                    <p>
                        Описание: <span>
                            {data?.description ? data.description : ''}
                        </span>
                    </p>
                </div>
                <div className='flex justify-between items-center mt-4 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        Помол:
                        <div className='col-span-3'>
                            <Select size="md"
                                label="Выберите помол"
                                onChange={(e) => changePomol(e)}
                                style={{ borderColor: pomolColor ? "red" : '' }}
                                onClick={handlePomolColor}>
                                <Option value='не-молотый'>Не молотый</Option>
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
                            <Select
                                size="md"
                                label="Выберите вес"
                                onChange={(e) => changeWeight(e)}
                                style={{ borderColor: weightColor ? "red" : '' }}
                                onClick={handleWeightColor}>
                                {
                                    weightSize.map((item, index) => (
                                        <Option
                                            key={index}
                                            value={item}
                                            disabled={!data.weight[index]}
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
                            !weightSize.includes(weight) && "от "
                        }
                            {
                                userInfo !== null && userInfo.role === 'superUser' ?
                                    <>
                                        {
                                            -1 === weightSize.indexOf(weight) ?
                                                data.priceWS[0] :
                                                data.priceWS[weightSize.indexOf(weight)]
                                        }
                                    </> :
                                    <>
                                        {
                                            -1 === weightSize.indexOf(weight) ?
                                                data.priceUser[0] :
                                                data.priceUser[weightSize.indexOf(weight)]
                                        }
                                    </>

                            }
                        </span> UZS</Typography>
                </div>
                <div className='flex mt-5 items-center justify-between'>
                    {
                        boolBasket ?
                            <Button variant='outlined' color='red' onClick={() => navigate('/basket')}> <span><img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" /></span>Перейти</Button> :
                            <Button
                                variant='outlined'
                                color='red'
                                onClick={addToBasketе}>В корзину</Button>
                    }

                </div>
            </Card>
        </div>
    );
};

export default CoffeeCard;