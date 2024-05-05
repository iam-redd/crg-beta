import React, { useEffect, useState } from 'react';
import { Button, Card, Option, Select, Typography, IconButton } from '@material-tailwind/react';
import url from '.././default.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/icons/icons8-cart-64.png'
import { addTooBasket, decrementProduct, incrementProduct } from '../store/slices/basketSlice';
import styles from './CoffeCard/CoffeCard.module.css'
const TeaCard = ({ data }) => {
    const packages = ['Крафт-пакет', 'Картонная', 'Альюминиевая']
    const [packageColor, setPackageColor] = useState(false)
    const basket = useSelector(state => state.basket.basket)
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const [boolBasket, setBoolBasket] = useState(
        allProductsId !== null ?
            allProductsId.length > 0 ? allProductsId.includes(data._id) : false :
            false
    )
    console.log(boolBasket)
    const index = boolBasket ? allProductsId.indexOf(data._id) : 0
    const userInfo = useSelector(state => state.user.userInfo)
    const [packageValue, setPackageValue] = useState(null)
    const [packageIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [amount, setAmount] = useState(1)

    const changePackage = (val) => {
        console.log(val)
        const template = basket.filter(product => product.package === val)
        console.log(template)
        const index = packages.indexOf(val)
        setPackageValue(val)
        setIndex(prev => index)
        if(template.length > 0) {
            setAmount(template[0].amount)
            setBoolBasket(true)
        }else{
            setBoolBasket(false)
            setAmount(1)
        }
    }


    function addToBasketе() {
        setIndex(0)
        setPackageColor(false)
        if (packageValue === null) {
            setPackageColor(true)
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

        console.log(info)
        dispatch(addTooBasket(info))
        setBoolBasket(true)
    }
    function increment() {
        setAmount((prev) => prev = prev + 1)
        if (boolBasket) {
            dispatch(incrementProduct(index))
        }
    }

    function decrement() {
        try {
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
        if (boolBasket) {
            setAmount(basket[index].amount)
        }
        // boolBasket && setAmount(basket[index].amount)
    }, []);
    return (
        <div className=''>
            <Card className='w-80 md:w-72 h-full border py-5 px-5 card-hover sna'>
                <div className={styles.header}>
                    <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                    <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                </div>
                <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                <p className='text-center text-xs'>Черный чай или зеленый</p>
                <div className='flex mt-5 bg-cover'>
                    <img src={`${url.backendUrl}/${data.img}`} alt='card-img' className='object-cover w-full' />
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

export default TeaCard;