import React, { useEffect, useState } from 'react';
import { Card, Option, Progress, Select, Button, Typography } from '@material-tailwind/react';
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import styles from './CoffeCard.module.css'
import { addTooBasket, decrementProduct, incrementProduct } from '../../store/slices/basketSlice'
import { ReactSpoiler } from 'react-simple-spoiler'
import url from '../../default.json'
import { toast } from 'react-toastify';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { red } from '@mui/material/colors';


function CoffeeCard({ data = {} }) {
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const weightSize = ['250гр', '500гр', '1000гр']
    const basket = useSelector(state => state.basket.basket)
    const [weightColor, setWeightColor] = useState(false)
    const [pomolColor, setPomoltColor] = useState(false)
    const [boolBasket, setBoolBasket] = useState(false)
    const [index, setIndex] = useState(null)
    const [amount, setAmount] = useState(1);
    const [pomol, setPomol] = useState('В зёрнах')
    const [weight, setWeight] = useState(null)
    const notifyError = (text) => toast.error(text);
    const navigate = useNavigate()
    const changePomol = (val) => {
        setPomoltColor(false)
        const template = basket.filter(product => product.pomol === val)
        const template2 = template.filter(product => product.weight === weight)
        if (basket.length > 0 && template2.length > 0 && data._id === template2[0].id) {
            console.log(template2)
            setAmount(template2[0].amount)
            setBoolBasket(true)
        } else {
            setBoolBasket(false)
            setAmount(1)
        }
        setPomol(val)
    }
    const changeWeight = (val) => {
        setWeightColor(false)
        const template = basket.filter(product => product.weight === val)
        const template2 = template.filter(product => product.pomol === pomol)
        const template3 = template2.filter(product => product.id === data._id)
        if (basket.length > 0 && template3.length > 0 ) {
            setIndex(template3[0].index)
            setAmount(template3[0].amount)
            setBoolBasket(true)

        } else {
            setBoolBasket(false)
            setAmount(1)
        }
        setWeight(val)
    }


    function addToBasketе() {
        setPomoltColor(false)
        setWeightColor(false)
        if (pomol === null) {
            setPomoltColor(true)
            notifyError('Выберите помол')
            return console.log('Помол не выбран')

        }
        if (weight === null) {
            setWeightColor(true)
            notifyError('Выберите обьём упаковки')
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
            roast: data.roast,
            stopList: data.stopList
        }
        dispatch(addTooBasket(info))
        setBoolBasket(true)
    }
    function decrement() {
        try {
            if(!boolBasket){
                return notifyError('Сначала добавте товар в корзину')
            }
            if(index === null){
                return notifyError('Товар не выбран')
            }
            if (amount === 1) {
                return
            } else {
                setAmount(amount - 1)
                if (boolBasket) {
                    dispatch(decrementProduct(index))
                }
            }
        }
        catch (error) {
            console.log('first error')
        }
    }

    function increment() {
        try {
            if(!boolBasket){
                return notifyError('Сначала добавте товар в корзину')
            }
            if(index === null){
                return notifyError('Товар не выбран')}
            if (boolBasket) {
                setAmount(amount + 1)
                dispatch(incrementProduct(index))
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleWeightColor = () => setWeightColor(false)
    const handlePomolColor = () => setPomoltColor(false)
    useEffect(() => {
        // if(boolBasket) {
        //     setAmount(basket[index].amount)
        // }
        // boolBasket && setAmount(basket[index].amount)
        const template = basket.filter(product => product.pomol === pomol)
        let template2 = template.filter(product => product.weight === weight)
        const template3 = template2.filter(product => product.id === data._id)
        if (basket.length > 0 && template3.length > 0) {
            setBoolBasket(true)
            setIndex(template3[0].index)
        } else {
            setBoolBasket(false)
            setAmount(1)
        }
    }, [pomol, basket , weight ,data]);

    return (
        <div className={styles.container}>
            <Card className='w-80 md:w-80 h-full border py-5 px-5 card-hover snap-center'>
                <div className={styles.header}>
                    <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                    <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                </div>
                <h2 className='text-center font-bold text-xl line-clamp-2'>{data?.name ? data.name : ''}</h2>
                <p className='text-xs flex text-red-200 justify-center rounded border border-red-200 mx-auto p-1 my-2'>{data.roast}</p> {/*Вытаскиваем с базы для эспрессо или фильтра*/}
                <div className='flex mt-5 h-32'>
                    <img src={`${url.backendUrl}/${data.img[0]}`} alt='card-img' className='object-cover w-1/3' />
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
                    <ReactSpoiler
                        noOfLines={2}
                        lineHeight={7}
                        showMoreComponent={<p className='spoiler-size'>еще...</p>}
                        showLessComponent={<p className='spoiler-size'>Скрыть</p>}
                        toggleContainerStyle={{ color: '#ba181b' }}
                        collapsedSize={60}
                    >
                        <p className='text-justify text-sm sm:text-md md:text-md lg:text-md xl:text-md 2xl:text-md'>
                            Описание: <span>
                                {data?.description ? data.description : ''}
                            </span>
                        </p>
                    </ReactSpoiler>
                </div>
                <div className='flex justify-between items-center mt-4 text-sm'>
                    <div className='grid grid-cols-5 items-center'>
                        Помол:
                        <div className='col-span-3 w-auto'>
                            <Select size="md"
                                label="Выберите помол"
                                onChange={(e) => changePomol(e)}
                                style={{ borderColor: pomolColor ? "red" : '' }}
                                onClick={handlePomolColor}
                                value='В зёрнах'
                            // value={userInfo.role === 'superUser' ? {"1"} : {''}}
                            >
                                <Option value='В зёрнах'>В зёрнах</Option>
                                <Option value='Под турку'>Под турку</Option>
                                <Option value='Под гейзер/Мокка'>Под гейзер/Мокка</Option>
                                <Option value='Под Эспрессо'>Под Эспрессо</Option>
                                <Option value='Под Фильтр'>Под Фильтр</Option>
                                <Option value='Под Френч-пресс'>Под Френч-пресс</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='flex mt-2 text-sm'>
                    <div className='grid grid-cols-5 items-center'>
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
                {/* <div className='flex mt-5 items-center justify-between'>
                    {
                        boolBasket ?
                            <Button variant='outlined' color='red' onClick={() => navigate('/basket')}> <span><img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" /></span>Перейти</Button> :
                            <Button
                                
                                variant='outlined'
                                color='red'
                                onClick={addToBasketе}>В корзину</Button>
                    }

                </div> */}
                <div className='flex mt-5 items-center justify-between'>
                    {

                        boolBasket ?
                            <>
                                <div className='flex items-center justify-between'>
                                <IconButton onClick={decrement}>
                                    <IndeterminateCheckBox fontSize='inherit' sx={{ color: red[500] }}/>
                                </IconButton>
                                <span>{basket[index]?.amount}</span>
                                <IconButton onClick={increment}>
                                    <AddBox fontSize='inherit' sx={{ color: red[500] }}/>
                                </IconButton>
                                </div>
                                
                                
                                <Button variant='outlined' size='sm' color='blue-gray' onClick={() => navigate('/basket')}>
                                <h3>Перейти</h3>
                                </Button>
                                
                            </> :
                            <>
                              
                                <Button
                                    className='font-medium'
                                    color="red"
                                    variant='gradient'
                                    size='sm'
                                    onClick={addToBasketе}>
                                        <h3>В корзину</h3>
                                </Button>
                            </>
                    }

                </div>
            </Card>
        </div>
    );
};

export default CoffeeCard;