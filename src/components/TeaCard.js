import React, { useState } from 'react';
import { Button, Card, Option, Progress, Select, Typography } from '@material-tailwind/react';
import url from '.././default.json'
import { useDispatch, useSelector } from 'react-redux';
const TeaCard = ({ data }) => {
    const packages = ['Крафт-пакет', 'Картонная', 'Альюминиевая']
    const userInfo = useSelector(state => state.user.userInfo)
    const [packageValue, setPackageValue] = useState(null)
    const [packageIndex, setIndex] = useState(0)
    const dispatch = useDispatch()
    const changePackage = (val) => {
        const index = packages.indexOf(val)
        setPackageValue(val)
        setIndex(prev => index)
        if (packageValue === null) {
            return console.log('Упаковка не выбран')
        }

        const info = {
            id: data._id,
            amount: 1,
        }
    }


    function addToBasketе() {
        setPackageValue(null)
        setIndex(0)
    }
    return (
        <div className=''>
            <Card className='w-80 h-full border py-5 px-5 card-hover'>
                <div className='flex justify-end py-2 px-4 text-xs'>
                    Топ-недели
                </div>
                <h2 className='text-center font-bold text-xl'>{data.name}</h2>
                <p className='text-center text-xs'>Черный чай или зеленый</p>
                <div className='flex mt-5'>
                    <img src={`${url.backendUrl}/${data.img}`} alt='card-img' className='object-cover w-full' />
                </div>
                <div className='mt-5 text-sm'>
                    <p>
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
                                        {/* {
                                            packageValue === null && packageIndex === 0 ?
                                                data.priceSW[0] :
                                                data.priceWS[packages.indexOf(packageValue)]
                                        } */}
                                    </> :
                                    <>
                                    {/* {
                                        packageValue === null && packageIndex === 0 ?
                                            data.priceUser[0] :
                                            data.priceUser[packages.indexOf(packageValue)]
                                    } */}
                                </>
                            }
                        </span>UZS</Typography>
                </div>
                <div className='flex mt-5 items-center justify-between'>
                    <Button
                        variant='outlined'
                        color='red'
                    >В корзину</Button>

                    <Button
                        variant='outlined'
                        color='red'
                    >
                        Подробно</Button>

                </div>
            </Card>
        </div>
    );
};

export default TeaCard;