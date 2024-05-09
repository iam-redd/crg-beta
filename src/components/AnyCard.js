import React, { useEffect, useState } from 'react';
import { Button, Card, IconButton, Typography } from '@material-tailwind/react';
import url from '../default.json'
import styles from './CoffeCard/CoffeCard.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import cart from '../assets/icons/icons8-cart-64.png'
import { addTooBasket, decrementProduct, incrementProduct } from '../store/slices/basketSlice';
const AnyCard = ({ data }) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const basket = useSelector(state => state.basket.basket)
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(1)
    const [boolBasket, setBoolBasket] = useState(allProductsId.includes(data._id) ? true : false)
    const [index, setIndex] = useState(null)
    const notifyError = (text) => toast.error(text);

    function increment() {
        try {
            console.log(amount)
            console.log(boolBasket)
            if(!boolBasket){
                notifyError('Добавте товар в корзину')
            }
            else if (boolBasket && index !== null) {
                dispatch(incrementProduct(index))
                setAmount((prev) => prev = prev + 1)
            }else{
                notifyError('Товар не найден')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function decrement() {
        try {
            console.log(index)
            console.log(boolBasket)
            if(amount === 1){
                return
            }
            if(amount < 1){
                return setAmount(1)
            }
            if (boolBasket && index !== null) {
                setAmount(amount - 1)
                dispatch(decrementProduct(index))

            }else{
                notifyError('Товар не найден')
            }
        } catch (error) {
            console.log(error)

        }

    }

    function addToBasketе() {
        const info = {
            id: data._id,
            amount: 1,
            price: userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[0] : data.priceUser[0],
            name: data.name,
            img: data.img,
            type: data.type,
        }

        dispatch(addTooBasket(info))
        setIndex(basket.length)
        setBoolBasket(true)
    }

    useEffect(() => {
        const template = basket.filter(product => product.id === data._id)
        if (template.length > 0) {
            setAmount(template[0].amount)
            setIndex(template[0].index)
        } else {
            setBoolBasket(false)
        }
    }, [data._id,basket]);

    return (
        <div className=''>
            <Card className='w-80 md:w-72 h-full border py-5 px-5 card-hover'>
                <div className={styles.header}>
                    <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                    <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                </div>
                <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                <p className='text-center text-xs'>Сироп или химия</p>
                <div className='flex mt-5'>
                    <img src={`${url.backendUrl}/${data.img}`} alt='card-img' className='object-cover w-full' />
                </div>
                <div className='mt-5 text-sm'>
                    <p>
                        Описание:
                        <span>
                            {data.description}
                        </span>
                    </p>
                </div>
                <div className='mt-5'>
                    <Typography variant='h6'>Цена:
                        <span> {userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[0] : data.priceUser[0]}
                        </span> UZS</Typography>
                </div>
                {/* <div className='flex mt-5 items-center justify-between'>
                    {
                        boolBasket ?
                            <Button
                                variant='outlined'
                                color='red'
                                onClick={() => navigate('/basket')}>
                                <span>
                                    <img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" />
                                </span>
                                Перейти
                            </Button> :
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
                                    <IconButton
                                        color='red'
                                        className=' w-8 h-8'
                                        onClick={decrement}>
                                        -
                                    </IconButton>
                                    <span className='mx-2'>{amount}</span>
                                    <IconButton
                                        color='red'
                                        className=' w-8 h-8'
                                        onClick={increment}>
                                        +
                                    </IconButton>
                                </div>
                                <Button variant='outlined' color='red' onClick={() => navigate('/basket')}>
                                    <span><img style={{ display: 'inline-block', marginRight: '5px' }} width={24} height={24} src={cart} alt="" />
                                    </span>Перейти</Button>
                            </> :
                            <>
                                <div className='flex items-center justify-between'>
                                    <IconButton
                                        color='red'
                                        className=' w-8 h-8'
                                        onClick={decrement}>
                                        -
                                    </IconButton>
                                    <span className='mx-2'>{amount}</span>
                                    <IconButton
                                        color='red'
                                        className=' w-8 h-8'
                                        onClick={increment}>
                                        +
                                    </IconButton>
                                </div>
                                <Button
                                    variant='outlined'
                                    color='red'
                                    onClick={addToBasketе}>В корзину</Button>
                            </>
                    }
                </div>
            </Card>
        </div>
    );
};

export default AnyCard;