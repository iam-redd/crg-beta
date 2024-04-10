import React, { useState } from 'react';
import { Button, Card, Typography } from '@material-tailwind/react';
import url from '../default.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/icons/icons8-cart-64.png'
import { addTooBasket } from '../store/slices/basketSlice';
const AnyCard = ({ data }) => {
    const allProductsId = useSelector(state => state.basket.allProductsId)
    const userInfo = useSelector(state => state.user.userInfo)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [boolBasket, setBoolBasket] = useState(
        allProductsId !== null ?
            allProductsId.length > 0 ? allProductsId.includes(data._id) : false :
            false
    )

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
        setBoolBasket(true)
    }

    return (
        <div className=''>
            <Card className='w-80 md:w-72 h-full border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
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
                        <span> { userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[0] : data.priceUser[0]}
                        </span> UZS</Typography>
                </div>
                <div className='flex mt-5 items-center justify-between'>
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
                </div>
            </Card>
        </div>
    );
};

export default AnyCard;