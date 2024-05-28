import React, { useEffect, useState } from 'react';
import { Card, Option, Select, Button, Typography } from '@material-tailwind/react';
import url from '.././default.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTooBasket, decrementProduct, incrementProduct } from '../store/slices/basketSlice';
import styles from './CoffeCard/CoffeCard.module.css'
import { toast } from 'react-toastify';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { red } from '@mui/material/colors';

import { IconButton } from '@mui/material';




const TeaCard = ({ data }) => {
    const packages = ['Крафт-пакет', 'Картонная', 'Альюминиевая']
    const [packageColor, setPackageColor] = useState(false)
    const basket = useSelector(state => state.basket.basket)
    const [boolBasket, setBoolBasket] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const [index, setIndex] = useState(null)
    const [packageValue, setPackageValue] = useState(null)
    const [packageIndex, setPackageIndex] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [amount, setAmount] = useState(1)
    const notifyError = (text) => toast.error(text);
    const changePackage = (val) => {
        console.log(val)
        const template = basket.filter(product => product.package === val)
        console.log(template)
        const index = packages.indexOf(val)
        setPackageValue(val)
        setPackageIndex(prev => index)
        if (template.length > 0) {
            setAmount(template[0].amount)
            setIndex(template[0].index)
            setBoolBasket(true)
        } else {
            setBoolBasket(false)
            setAmount(1)
        }
    }


    function addToBasketе() {
        setPackageIndex(0)
        setPackageColor(false)
        if (packageValue === null) {
            setPackageColor(true)
            notifyError('Выберите упаковку')
            return console.log('Упаковка не выбран')
        }

        const info = {
            id: data._id,
            amount: amount,
            price: userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[packages.indexOf(packageValue)] : data.priceUser[packages.indexOf(packageValue)],
            package: packageValue,
            name: data.name,
            img: data.img,
            type: data.type,
        }

        dispatch(addTooBasket(info))
        setIndex(basket.length)
        setBoolBasket(true)
    }
    function increment() {
        try {
            if (index === null) {
                return notifyError('Товар не выбран')
            }
            if (boolBasket) {
                setAmount((prev) => prev = prev + 1)
                dispatch(incrementProduct(index))
            }
        } catch (error) {
            notifyError(error)
        }
    }
    function decrement() {
        try {
            if (!boolBasket) {
                return notifyError('Сначала добавте товар в корзину')
            }
            if (index === null) {
                return notifyError('Товар не выбран')
            }
            if (amount === 1) {
                return
            } else {
                setAmount((prev) => prev = prev - 1)
                if (boolBasket) {
                    dispatch(decrementProduct(index))
                }
            }
        }
        catch (error) {
            console.log('first error')
        }
    }

    const handlePackageColor = () => setPackageColor(false)
    useEffect(() => {
        
        const template = basket.filter(product => product.id === data._id)
        const template2 = template.filter(product => product.package === packageValue)
        console.log(template2)
        if (basket.length > 0 && template2.length > 0) {
            setIndex(template2[0].index)
        }
        // boolBasket && setAmount(basket[index].amount)
    }, [basket,data._id,packageValue]);
    return (
        <div className=''>
            <Card className='w-80 md:w-80 h-full border py-5 px-5 card-hover snap-center'>
                <div className={styles.header}>
                    <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                    <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                </div>
                <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                <p className='text-center text-xs mx-auto border-none p-0.5 mb-1.5'>{data.color}</p>
                <div className='flex'>
                    <img src={`${url.backendUrl}/${data.img}`} alt='card-img' className='object-cover object-center w-full' />
                </div>
                <div className='mt-5 text-sm'>
                    <p className='line-clamp-3'>
                        Описание: <span>
                            {data.description}
                        </span>
                    </p>
                </div>
                <div className='flex justify-between mt-2 text-sm'>
                    <div className='grid grid-cols-4 items-center'>
                        <p>Упа-ка: </p>
                        <div className='col-span-3'>
                            <Select
                                size="md"
                                label="Выберите упа-ку"
                                onChange={(e) => changePackage(e)}
                                onClick={() => handlePackageColor()}
                                style={{ borderColor: packageColor ? "red" : '' }}
                            >
                                {
                                    packages.map((item, index) => {
                                        return (
                                            <Option key={index} value={item} disabled={!data.package[index]}>{item}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Typography variant='h6'>Цена:
                        <span>{
                            !packages.includes(packageValue) && 'от '
                        }
                            {
                                userInfo !== null && userInfo.role === 'superUser' ?
                                    <>
                                        {
                                            packageValue === null && packageIndex === 0 ?
                                                data.priceWS[0] !== '0' ? data.priceWS[0] : data.priceWS[1] !== '0' ? data.priceWS[1] : data.priceWS[2] :
                                                data.priceWS[packages.indexOf(packageValue)]
                                        }
                                    </> :
                                    <>
                                        {
                                            packageValue === null && packageIndex === 0 ?
                                                data.priceUser[0] !== '0' ? data.priceUser[0] : data.priceUser[1] !== '0' ? data.priceUser[1] : data.priceUser[2] :
                                                data.priceUser[packages.indexOf(packageValue)]
                                        }
                                    </>
                            }
                        </span>UZS</Typography>
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

export default TeaCard;