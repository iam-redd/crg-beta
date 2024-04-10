import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css'
import ImageUpload from './UploadImage/UploadImage';
import axios from '../../../store/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addData } from '../../../store/slices/userSlice'
import { Input, Typography } from "@material-tailwind/react"
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

// import URL from '../../default.json'
const Registration = () => {
    const [uploadedImages, setUploadedImages] = useState(null)
    const userInfo = useSelector(state => state.user.userInfo)
    const [loginError, setLogin] = useState(false)
    const [errorMessage, setMessage] = useState('')
    console.log(uploadedImages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLogin(false)

            if (e.target.password.value !== e.target.password_try.value) {
                handleError('Пароли введенное вами не совпадает')
                return
            }
            const request = {
                name: e.target.name.value,
                phoneNumber: e.target.phoneNumber.value,
                email: e.target.email.value,
                password: e.target.password.value,
                avatarUrl: uploadedImages,
                address: [e.target.address.value]
            }
            console.log(request)


            const data = await axios.post('/auth/register', request)
            if (data.status === 200) {
                dispatch(addData(data.data))

                navigate('/user')
            }
            console.log(data)
        } catch (error) {
            const res = error.response
            if (res?.data[0]) {
                handleError(res?.data[0].msg)
            } else if (res.status === 400) {
                handleError('Ошибка при вводе данных')
            } else if (res.status === 500) {
                handleError('Не удалось авторизоватся')
            } else if (res?.status === 401) {
                handleError('Email уже зарегистрирован')
            }
            else if (res?.request?.status === 401) {
                handleError('Email уже зарегистрирован')
            } else {
                handleError(error.message)
            }
        }
    }

    const handleError = (message) => {
        setMessage(message)
        setLogin(true)
    }
    useEffect(() => {
        // userInfo !== null && dispatch(logout())
    });
    return (
        <div className='relative'>
            <div className={`absolute -top-72 sm:-top-36 md:-top-48 flex w-full`}>
                <div className={`items-center justify-center m-auto ${styles.bordered}`}>
                    <p
                        className="px-4 text-end text-red-500"
                        onClick={() => navigate('/user')}
                    >Назад</p>
                    <div className='flex items-center text-sm'>
                        Загрузите аватарку
                        <ImageUpload
                            list={uploadedImages}
                            setList={setUploadedImages} />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}>
                        <div className='gap-1 sm:flex'>
                            <Input
                                type="text"
                                name='name'
                                placeholder='Василий Пупкин'
                                // defaultValue={'kadyrzhan'}
                                label='Имя и фамилия'
                            />
                            <Input
                                type="text"
                                name='email'
                                placeholder='empty@empty.com'
                                //defaultValue={'test6@test.ru'}
                                label='Электронная почта'
                            />
                        </div>
                        <div className='gap-1 sm:flex'>
                            <Input
                                type="text"
                                name='phoneNumber'
                                placeholder='+998 99 999 99 99'
                                //defaultValue={'+998999994923'}
                                label='Номер телефона'
                            />
                            <Input
                                type="text"
                                name='address'
                                placeholder='город, район, улица, дом, квартира'
                                //defaultValue={'gulsanam 48'}
                                label='Адрес'
                            />
                        </div>
                        <div className='gap-1 sm:flex'>
                            <Input
                                type="text"
                                name='telegram'
                                placeholder='@username'
                                //defaultValue={'kadyrzhan_23'}
                                label='Телеграм @username'
                            />
                            <Input
                                type='text'
                                name='org'
                                placeholder='Название организации'
                                label='Организация'
                            />
                        </div>
                        <div className='gap-1 sm:flex'>
                            <Input
                                type="password"
                                name='password'
                                label='Пароль'
                                //defaultValue={'123466'}
                                placeholder='Придумайте пароль'
                            />
                            <Input
                                type='password'
                                name='password_try'
                                label='Повторите пароль'
                                placeholder='Повторите пароль'
                            />
                        </div>
                        {loginError &&
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
                        <div className='flex flex-col m-auto items-center'>
                            <button
                                className={` ${styles.btn}`}>Зарегистрироваться
                            </button>
                            <div className='flex w-full mt-2 text-sm'>
                                <p className='mr-1'>Уже есть аккаунт?</p>
                                <Link to='/user/login'>
                                    <p className='cursor-pointer'>Войти</p>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;