import React, { useState } from 'react';
import { Button, Card, Option, Select, Typography } from '@material-tailwind/react';
import url from '.././default.json'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cart from '../assets/icons/icons8-cart-64.png'
import { addTooBasket } from '../store/slices/basketSlice';
const TeaCard = ({ data }) => {
    const packages = ['Крафт-пакет', 'Картонная', 'Альюминиевая']
    const [packageColor, setPackageColor] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const [packageValue, setPackageValue] = useState(null)
    const [packageIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allProductsId = useSelector(state => state.basket.allProductsId)
    const [boolBasket, setBoolBasket] = useState(
        allProductsId !== null ?
            allProductsId.length > 0 ? allProductsId.includes(data._id) : false :
            false
    )


    const changePackage = (val) => {
        const index = packages.indexOf(val)
        setPackageValue(val)
        setIndex(prev => index)
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
            amount: 1,
            price: userInfo !== null && userInfo.role === 'superUser' ? data.priceWS[packages.indexOf(packageValue)] : data.priceUser[packages.indexOf(packageValue)],
            package: packageValue,
            name:data.name,
            img: data.img,
            type: data.type,
        }

        console.log(info)
        dispatch(addTooBasket(info))
        setBoolBasket(true)
    }

    const handlePackageColor = () => setPackageColor(false)
    return (
        <div className=''>
            <Card className='w-80 h-full border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
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
                                size="sm"
                                label="Выберите упа-ку"
                                onChange={(e) => changePackage(e)}
                                onClick={() => handlePackageColor()}
                                style={{ borderColor: packageColor ? "red" : '' }}
                            >
                                {
                                    packages.map((item, index) => {
                                        return (
                                            <Option value={item} disabled={!data.package[index]}>{item}</Option>
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
                                                data.priceWS[0] !== '0' ? data.priceWS[0] : data.priceWS[1] !== '0' ? data.priceWS[1] : data.priceWS[2]   :
                                                data.priceWS[packages.indexOf(packageValue)]
                                        }
                                    </> :
                                    <>
                                        {
                                            packageValue === null && packageIndex === 0 ?
                                                data.priceUser[0] !== '0' ? data.priceUser[0] : data.priceUser[1] !== '0' ? data.priceUser[1] : data.priceUser[2]  :
                                                data.priceUser[packages.indexOf(packageValue)]
                                        }
                                    </>
                            }
                        </span>UZS</Typography>
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

export default TeaCard;