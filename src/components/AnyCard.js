import React, { useEffect, useState } from 'react';
import { Card, Button, Typography } from '@material-tailwind/react';
import styles from './CoffeCard/CoffeCard.module.css'
import style from './Style.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addTooBasket, decrementProduct, incrementProduct } from '../store/slices/basketSlice';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { ReactSpoiler } from "react-simple-spoiler";
import { motion } from 'framer-motion';

const AnyCard = ({ data }) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const basket = useSelector(state => state.basket.basket)
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(1)
    const [boolBasket, setBoolBasket] = useState(allProductsId.includes(data._id) ? true : false)
    const [index, setIndex] = useState(null)
    const [description, setDescription] = useState(data !== null ? data.description : null)
    const notifyError = (text) => toast.error(text);
    let type = ''
    if (data.type === 'coffe-beans') type = 'Кофе'
    else if (data.type === 'tea') type = 'Чай'
    else if (data.type === 'syrup') type = 'Сироп'
    else if (data.type === 'accessory') type = 'Аксессуар'
    else if (data.type === 'chemistry') type = 'Химия'
    else if (data.type === 'coffee-capsule') type = 'Кофе в капсулах'
    else if (data.type === 'drip') type = 'Дрип-кофе'
    const boxAnimation = {
        hidden: {
            y: 100,
            opacity: 0
        },
        visible: custom => ({
            y: 0,
            opacity: 1,
            transition: { delay: custom * 0.2 }
        })
    }
    function increment() {
        try {
            if (!boolBasket) {
                notifyError('Добавте товар в корзину')
            }
            else if (boolBasket && index !== null) {
                dispatch(incrementProduct(index))
                setAmount((prev) => prev = prev + 1)
            } else {
                notifyError('Товар не найден')
            }
        } catch (error) {
        }
    }

    function decrement() {
        try {
            if (amount === 1) {
                return
            }
            if (amount < 1) {
                return setAmount(1)
            }
            if (boolBasket && index !== null) {
                setAmount(amount - 1)
                dispatch(decrementProduct(index))

            } else {
                notifyError('Товар не найден')
            }
        } catch (error) {

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
    if(description.split(' ').includes('/n')){
        const temp = `
        ${data.name}/n
        =========/n
        ${description}
        `
        console.log(temp)

    }

    useEffect(() => {
        const template = basket.filter(product => product.id === data._id)
        if (data !== null && description === null) {
            setDescription(data.description)
        }
        if (template.length > 0) {
            setAmount(template[0].amount)
            setIndex(template[0].index)
        } else {
            setBoolBasket(false)
        }
    }, [data._id, basket]);


    // data.description.split('\n').forEach((el) => {
    //     document.querySelector("span.description").innerText += el + '\n';
    // })

    return (
        <>
            {
                !data.stopList && <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={boxAnimation} className=''>
                    <Card className='w-80 md:w-80 h-full border py-5 px-5 card-hover snap-center'>
                        <div className={styles.header}>
                            <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                            <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                            {
                                data.topList || data.stopList !== undefined && <span className='pt-4'></span>
                            }
                        </div>
                        <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                        <p className='text-center text-xs mx-auto border-none p-0.5 mb-1.5'>{type}</p>
                        <div className=''>
                            <img src={`${process.env.REACT_APP_SERVER}/${data.img}`} alt='card-img' className={`${style.imgH}object-cover object-center mx-auto`} />
                        </div>
                        <div className='mt-5 text-sm'>
                            <ReactSpoiler
                                noOfLines={6}
                                lineHeight={7}
                                showMoreComponent={<p className='spoiler-size'>еще...</p>}
                                showLessComponent={<p className='spoiler-size'>Скрыть</p>}
                                toggleContainerStyle={{ color: '#ba181b' }}
                            >
                                <p className='text-justify text-sm sm:text-md md:text-md lg:text-md xl:text-md 2xl:text-md'>
                                    Описание: &nbsp;
                                    <span className='description'>
                                        {
                                            data.description
                                        }
                                       {/* <Text>{"Привет, первая строка\nПривет, вторая строка"}</Text> */}
                                    </span>
                                </p>
                            </ReactSpoiler>
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
                                            <IconButton onClick={decrement}>
                                                <IndeterminateCheckBox fontSize='inherit' sx={{ color: red[500] }} />
                                            </IconButton>
                                            <span>{basket[index]?.amount}</span>
                                            <IconButton onClick={increment}>
                                                <AddBox fontSize='inherit' sx={{ color: red[500] }} />
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
                </motion.div>
            }
        </>
    );
};

export default AnyCard;