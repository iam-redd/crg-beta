import React, { useState } from 'react'
import styles from './OrderForm.module.css'
import axios from '../../../store/axios'
import { Button, Checkbox, Option, Select } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux'
import { cancelBasket } from '../../../store/slices/basketSlice'
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function OrderForm({ totalPrice }) {

    const [btnBool, setBtnBool] = useState(false)
    const [checkBool, setCheckBool] = useState(false)
    const [isError, setError] = useState(false)
    const [errorMessage, setMessage] = useState('')
    const userInfo = useSelector(state => state.user.userInfo)
    const [address, setAddress] = useState(userInfo !== null ? userInfo.role === 'superUser' ? null : userInfo.address[0].address : null)
    const dispatch = useDispatch()
    const basket = useSelector(state => state.basket.basket)
    const [paymentMethod, changePay] = useState(null)
    const [pomolColor, setPomoltColor] = useState(false)
    const [butloading, setButloading] = useState(false);
    async function newOrder(e) {
        try {
            e.preventDefault()
            setError(false)
            setMessage('')
            console.log(address)
            if(userInfo.role === 'superUser' && address === null){
                setMessage('Адрес доставки не выбран')
                setError(true)
                setBtnBool(false)
                return
            }
            if (paymentMethod === null) {
                // setPomoltColor(true)
                setMessage('Способ оплаты не выбран')
                setError(true)
                setBtnBool(false)
                return
            }
            if (!userInfo.isActive) {
                setMessage('Вы заблокированы обратитесь к администрацию')
                setError(true)
                setBtnBool(false)

                return
            }
            const comment = e.target.comment.value

            const productBool = basket.filter(product => product.stopList)
            if (productBool.length > 0) {
                setMessage(`${productBool[0].name} нет в наличии`)
                setError(true)
                setBtnBool(false)

                return
            }
            setButloading(true)
            const options = { basket, comment, totalPrice, paymentMethod ,address }
            const data = await axios.post('/new-order', options)
            if (data.status === 200) {
                dispatch(cancelBasket())
            } else {
                throw new Error('Order not created successfully')
            }
            setButloading(false)
        } catch (error) {
            setButloading(false)
        }
        setBtnBool(false)
    }


    // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    // async function fetchData() {
    //     setButloading(true);

    //     await delay(20000);
    //     setButloading(false);
    // }


    const handlePomolColor = () => setPomoltColor(false)
    return (
        <>
            {
                basket.length > 0 && userInfo !== null ?
                    <form className={`py-2  ${styles.form}`} onSubmit={newOrder}>
                        {
                            userInfo.role === 'superUser' && userInfo.address.length > 1 &&
                            <div className='p-2 rounded bg-gray-100'>
                                <Select size="md"
                                onChange={(e)=> setAddress(e)}
                                    label="Выберите адрес доставки">
                                    {
                                        userInfo.address.map((item, index) => {
                                            return (
                                                <Option key={index} value={item.address}>{item.organization}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </div>
                        }
                        <div className='p-2 rounded bg-gray-100'>
                            <div className='col-span-3 w-auto'>
                                <Select size="md"
                                    label="Выберите способ оплаты"
                                    onChange={(e) => changePay(e)}
                                    style={{ borderColor: pomolColor ? "red" : '' }}
                                    onClick={handlePomolColor}>
                                    <>{
                                        userInfo.role === 'superUser' && <Option value='Перечислением'>Перечислением</Option>
                                    }</>
                                    <Option value='PayMe'>PayMe</Option>
                                    <Option value='Другое'>Другое</Option>
                                </Select>
                            </div>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Checkbox
                                onChange={() => {
                                    setCheckBool(!checkBool)
                                    setBtnBool(!checkBool)
                                }}
                            />
                            <span className={styles.texttip}> Согласен с условиями
                                <Link to='/others/privacypolicy'>обработки персональных данных</Link>,
                                <Link to='/others/payndelivery'>Доставки</Link> и
                                <Link to='/others/publicoffer'>Публичной оферты</Link>
                            </span>
                        </div>
                        <textarea className={styles.textarea} name='comment' placeholder='Комментария для заказа'></textarea>
                        {
                            isError &&
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="text-red-500">{errorMessage}</p>
                            </Typography>
                        }


                        <>
                            {
                                butloading ?
                                    <Button
                                        loading={butloading}
                                    >
                                        ЗАКАЗЫВАЮ...
                                    </Button> :
                                    <Button
                                        type='submit'
                                        className='text-center items-center'
                                        color={butloading ? 'blue-gray' : 'red'}
                                        variant='outlined'
                                        disabled={!btnBool && butloading}

                                    >ЗАКАЗАТЬ
                                    </Button>
                            }

                        </>
                    </form> : <p className='text-center' >Для того чтобы оформить свой заказ, пожалуйста войдите в свой аккаунт или зарегистрируйтесь</p>
            }
        </>
    )
}



