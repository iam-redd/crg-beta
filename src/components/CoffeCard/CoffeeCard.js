import React, { useEffect, useState } from 'react';
import { Card, Option, Progress, Select, Button, Typography, Carousel } from '@material-tailwind/react';
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
import LazyImage from '../Image'
import { motion } from 'framer-motion'


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
            setAmount(template2[0].amount)
            setBoolBasket(true)
        } else {
            setBoolBasket(false)
            setAmount(1)
        }
        setPomol(val)
    }


    const imgdata = data.img.map(img => {
        return (`${process.env.REACT_APP_SERVER}/${img}`)
    })
    const [active, setActive] = React.useState(
        `${process.env.REACT_APP_SERVER}/${data.img[0]}`
    );


    const changeWeight = (val) => {
        setWeightColor(false)
        const template = basket.filter(product => product.weight === val)
        const template2 = template.filter(product => product.pomol === pomol)
        const template3 = template2.filter(product => product.id === data._id)
        if (basket.length > 0 && template3.length > 0) {
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
            return

        }
        if (weight === null) {
            setWeightColor(true)
            notifyError('Выберите обьём упаковки')
            return
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
        if (data.type === 'coffe-beans') info.treatment = data.treatment
        dispatch(addTooBasket(info))
        setBoolBasket(true)
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
                setAmount(amount - 1)
                if (boolBasket) {
                    dispatch(decrementProduct(index))
                }
            }
        }
        catch (error) {

        }
    }


    function increment() {
        try {
            if (!boolBasket) {
                return notifyError('Сначала добавте товар в корзину')
            }
            if (index === null) {
                return notifyError('Товар не выбран')
            }
            if (boolBasket) {
                setAmount(amount + 1)
                dispatch(incrementProduct(index))
            }
        } catch (error) {
        }
    }


    const handleWeightColor = () => setWeightColor(false)
    const handlePomolColor = () => setPomoltColor(false)
    useEffect(() => {
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
    }, [pomol, basket, weight, data]);
    return (
        <>
            {
                !data.stopList &&
                <motion.div
                className={styles.container}>
                    <Card className='w-80 md:w-80 h-full border py-5 px-5 card-hover snap-center'>
                        <div className={styles.header}>
                            <span className='text-sm text-red-700'>{data.stopList && 'Нет в наличии'}</span>
                            <span className='text-xs'>{data.topList && 'Топ-недели'}</span>
                            {
                                data.topList || data.stopList !== undefined && <span className='pt-4'></span>
                            }
                        </div>
                        <h2 className='text-center font-bold text-xl line-clamp-2'>{data?.name ? data.name : ''}</h2>
                        <p className='text-xs flex text-red-200 justify-center rounded border border-red-200 mx-auto p-0.5 mb-1.5'>{data.roast}</p> {/*Вытаскиваем с базы для эспрессо или фильтра*/}
                        {/*<img src={`${process.env.REACT_APP_SERVER}/${data.img[0]}`} alt='card-img' className='object-cover w-full'/>*/}
                        <Carousel
                            className='h-auto'
                            prevArrow={({ handlePrev }) => (
                                <IconButton
                                    variant="text"
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
                            {imgdata.map((item, index) => {
                                const image = {
                                    src: item,
                                    alt: item,
                                    height: 'auto',
                                    width: "auto",
                                    caption: 'This is caption'
                                }
                                return (
                                    <div className="w-3/4 object-cover object-center mx-auto" key={index}><LazyImage image={image} /></div>
                                )
                                // <img className='w-3/4 object-cover object-center mx-auto'  alt='card' key={index} src={`${item}`}/>
                            })}
                        </Carousel>
                        {/*<div className="grid gap-4">
        <div>
            <img
                className="w-full  object-cover object-center"
                src={active}
                alt=""
            />
        </div>
        */}
                        {/* <div className="grid grid-cols-3 gap-4">
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
                        <div className='flex mt-3 justify-between py-2 text-xs'>
                            <p>
                                Обработка: <span>{data.treatment}</span>
                            </p>
                            <p className='flex font-medium'>CQI: <span
                                className='font-normal'>{data?.scores ? data.scores : 0} балла</span></p>
                        </div>
                        <div className='flex flex-row gap-4 mt-2 text-xs'>
                            <div className='flex-auto'>
                                <p className='mb-1'>Кислотность:</p>
                                <Progress color='red' size='sm' value={data?.acidity ? data.acidity : 0} />
                            </div>
                            <div className='flex-auto'>
                                <p className='mb-1'>Плотность:</p>
                                <Progress color='red' size='sm' value={data?.density ? data.density : 0} />
                            </div>
                        </div>
                        <div className='mt-3 text-sm'>
                            <ReactSpoiler
                                noOfLines={6}
                                lineHeight={7}
                                showMoreComponent={<p className='spoiler-size'>еще...</p>}
                                showLessComponent={<p className='spoiler-size'>Скрыть</p>}
                                toggleContainerStyle={{ color: '#ba181b' }}
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
                                                <IndeterminateCheckBox fontSize='inherit' sx={{ color: red[500] }} />
                                            </IconButton>
                                            <span>{basket[index]?.amount}</span>
                                            <IconButton onClick={increment}>
                                                <AddBox fontSize='inherit' sx={{ color: red[500] }} />
                                            </IconButton>
                                        </div>


                                        <Button variant='outlined' size='sm' color='blue-gray'
                                            onClick={() => navigate('/basket')}>
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

export default CoffeeCard;