import React, { useEffect, useState } from 'react';
import { Card, Option, Select, Button, Typography, Carousel } from '@material-tailwind/react';
import url from '.././default.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTooBasket, decrementProduct, incrementProduct } from '../store/slices/basketSlice';
import styles from './CoffeCard/CoffeCard.module.css'
import { toast } from 'react-toastify';
import { AddBox, IndeterminateCheckBox } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import { ReactSpoiler } from "react-simple-spoiler";
import { motion } from 'framer-motion';




const TeaCard = ({ data ,count}) => {

    //Tea Card select options//
    const packages = [
        'Крафт-пакет 40гр',
        'Крафт-пакет 3кг',
        'Крафт-пакет 5кг',
        'Картонная 100гр',
        'Альюминиевая 100гр'
    ]
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
    const imgdata = data.img.map(img => {
        return (`${process.env.REACT_APP_SERVER}/${img}`)
    })
    const [active, setActive] = React.useState(
        `${process.env.REACT_APP_SERVER}/${data.img[0]}`
    );
    
    const notifyError = (text) => toast.error(text);
    const changePackage = (val) => {
        const template = basket.filter(product => product.package === val)
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


    function addToBasket() {
        setPackageIndex(0)
        setPackageColor(false)
        if (packageValue === null) {
            setPackageColor(true)
            notifyError('Выберите упаковку')
            return
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
        }
    }

    const handlePackageColor = () => setPackageColor(false)
    useEffect(() => {

        const template = basket.filter(product => product.id === data._id)
        const template2 = template.filter(product => product.package === packageValue)
        if (basket.length > 0 && template2.length > 0) {
            setIndex(template2[0].index)
        }
        // boolBasket && setAmount(basket[index].amount)
    }, [basket, data._id, packageValue]);
    return (
        <>
            {
                !data.stopList &&
                <motion.div
                className='' >
                    <Card className='w-80 md:w-80 h-full border py-5 px-5 card-hover snap-center'>
                        <div className={styles.header}>
                            <span className='text-xs text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                            <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                            {
                                data.topList || data.stopList !== undefined && <span className='pt-4'></span>
                            }
                        </div>
                        <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                        <p className='text-center text-xs mx-auto border-none p-0.5 mb-1.5'>{data.color}</p>
                        {/* <div className='flex'>
                    <img src={`${process.env.REACT_APP_SERVER}/${data.img}`} alt='card-img' className='object-cover object-center w-full' />
                </div> */}
                        <Carousel
                            className='h-auto'
                            prevArrow={({ handlePrev }) => (
                                <IconButton
                                    variant="text"
                                    color="red"
                                    size="md"
                                    onClick={handlePrev}
                                    className="!absolute top-2/4 left-4 -translate-y-2/4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="size-5">
                                        <path fill-rule="evenodd"
                                            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </IconButton>
                            )}
                            nextArrow={({ handleNext }) => (
                                <IconButton
                                    variant="text"
                                    color="red"
                                    size="md"
                                    onClick={handleNext}
                                    className="!absolute top-2/4 !right-4 -translate-y-2/4"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="size-5">
                                        <path fill-rule="evenodd"
                                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                            clip-rule="evenodd" />
                                    </svg>

                                </IconButton>
                            )}
                        >
                            {imgdata.map((item, index) => (
                                <img className='w-full object-cover object-center' key={index} src={`${item}`} />
                            ))}
                        </Carousel>
                        {/*<div className="grid gap-4">
                    <div>
                        <img
                            className="w-full  object-cover object-center"
                            src={`${active}`}
                            alt=""
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {imgdata.map((imgelink, index) => (
                            <div key={index}>
                                <img
                                    onClick={() => setActive(imgelink)}
                                    src={`${imgelink}`}
                                    className=" max-w-full cursor-pointer rounded object-cover object-center"
                                    alt="product img"
                                />
                            </div>
                        ))}
                    </div>
                </div>*/}
                        <div className='mt-5 text-sm'>
                            <ReactSpoiler
                                noOfLines={6}
                                lineHeight={7}
                                showMoreComponent={<p className='spoiler-size'>еще...</p>}
                                showLessComponent={<p className='spoiler-size'>Скрыть</p>}
                                toggleContainerStyle={{ color: '#ba181b' }}
                            >
                                <p className='text-justify text-sm sm:text-md md:text-md lg:text-md xl:text-md 2xl:text-md'>
                                    Описание: <span>
                                        {data.description}
                                    </span>
                                </p>
                            </ReactSpoiler>
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
                                                        data.priceWS[0] !== '0' ? data.priceWS[0] : data.priceWS[1] !== '0' ? data.priceWS[1] : data.priceWS[2] !== '0' ? data.priceWS[2] : data.priceWS[3] !== '0' ? data.priceWS[3] : data.priceWS[4] :
                                                        data.priceWS[packages.indexOf(packageValue)]
                                                }
                                            </> :
                                            <>
                                                {
                                                    packageValue === null && packageIndex === 0 ?
                                                        data.priceUser[0] !== '0' ? data.priceUser[0] : data.priceUser[1] !== '0' ? data.priceUser[1] : data.priceUser[2] !== '0' ? data.priceUser[2] : data.priceUser[3] !== '0' ? data.priceUser[3] : data.priceUser[4] :
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
                                            onClick={addToBasket}>
                                            <h3>В корзину</h3>
                                        </Button>
                                    </>
                            }

                        </div>
                    </Card>
                </motion.div >

            }
        </>

    );
};

export default TeaCard;