import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css'
import ImageUpload from './UploadImage/UploadImage';
import axios from '../../../store/axios'
import { useDispatch } from 'react-redux'
import { setRegister } from '../../../store/slices/userSlice'
import { Button, Input, Option, Select, Typography } from "@material-tailwind/react"
import { useNavigate } from 'react-router-dom';

const Registration = ({ setLoginVisible, setRegisterVisible, setCodeFormVisible }) => {
    const [uploadedImages, setUploadedImages] = useState(null)
    // const userInfo = useSelector(state => state.user.userInfo)
    const [loginError, setLogin] = useState(false)
    const [btnBool, setBtnBool] = useState(true)
    const [errorMessage, setMessage] = useState('')
    const [selectValue, setValue] = useState(null)
    const regex = /^\+998[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(e.target.city.value)
            setLogin(false)
            if (e.target.name.value.trim() === '') {
                handleError('Имя обязательная поля')
                return
            }
            if (!regex.test(e.target.phoneNumber.value.trim())) {
                handleError('Неправильный формат номера телефона')
                return
            }
            if (e.target.phoneNumber.value.trim() === '') {
                handleError('Номер телефона обязательная поля')
                return
            }
            if (selectValue.trim() === '') {
                handleError('Город обязательная поля')
                return
            }
            if (e.target.address.value.trim() === '') {
                handleError('Адрес обязательная поля')
                return
            }
            // if (e.target.password.value !== e.target.password_try.value) {
            //     handleError('Пароли введенное вами не совпадает')
            //     return
            // }
            const request = {
                name: e.target.name.value,
                phoneNumber: e.target.phoneNumber.value.trim(),
                city: selectValue,
                avatarUrl: uploadedImages,
                address: [e.target.address.value],
                telegram: e.target.telegram.value,
            }
            if (e.target.email.value !== '') request.email = e.target.email.value
            console.log(request)

            const data = await axios.post('/register-verify', request)
            if (data.status === 200) {
                dispatch(setRegister(request))
                const res = await axios.post('/send-code', { phoneNumber: request.phoneNumber })
                if (res.status === 200) {
                    // navigate('/verify-code', { state: { path: 'register' } })
                    setRegisterVisible(false)
                    setTimeout(() => {
                        setCodeFormVisible(true)
                    }, 200)
                }
            } else {
                handleError('Номер телефона обязательная поля')
                return
            }
        } catch (error) {
            const res = error?.response || null
            console.log(error)
            if (error?.response?.status === 400) {
                handleError('Ошибка при вводе данных')
            } else if (error?.response?.status === 500) {
                handleError('Не удалось зарегистрироватся')
            } else if (error?.response?.status === 401) {
                handleError(res.data.message)
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
        <div className=''>
            <div className={`mx-auto my-5 flex w-full`}>
                <div className={`items-center justify-center m-auto ${styles.bordered}`}>
                    {/* <p
                        className="px-4 text-xs text-end text-red-500 cursor-pointer"
                        onClick={() => navigate('/user')}
                    >Закрыть</p> */}
                    <h2 className='text-center font-bold text-lg my-4'>Регистрация</h2>
                    <div className='flex justify-center mb-4 p-2 items-center text-sm border border-blue-gray-200 rounded-xl'>
                        <ImageUpload
                            list={uploadedImages}
                            setList={setUploadedImages} />
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className={styles.form}>
                        <div className='grid gap-2 sm:flex'>
                            <Input
                                type="text"
                                name='name'
                                placeholder='Василий Пупкин'
                                label='Имя'
                                // defaultValue={'kadyrzhan'}
                            />
                            <Input
                                type="email"
                                name='email'
                                placeholder='empty@empty.com'
                                // defaultValue={'test@test.ru'}
                                label='Электронная почта'
                            />
                        </div>
                        <div className='grid gap-2 sm:flex'>
                            <Input
                                type="text"
                                name='phoneNumber'
                                placeholder='+998 99 999 99 99'
                                label='Номер телефона'
                            />

                            <Input
                                type="text"
                                name='telegram'
                                placeholder='@username'
                                // defaultValue={'kadyrzhan_23'}
                                label='Телеграм @username'
                            />
                        </div>
                        <div className='grid gap-2 sm:flex'>
                            <Select
                                size="md"
                                label="Ваш город"
                                name='city'
                                onChange={(e) => setValue(e)}>
                                <Option value='город Ташкент'>город Ташкент</Option>
                                <Option value='Ташкентская область'>Ташкентская область</Option>
                                <Option value='Самаркандская область'>Самаркандская область</Option>
                                <Option value='Ферганская область'>Ферганская область</Option>
                                <Option value='Хорезмская область'>Хорезмская область</Option>
                                <Option value='Сырдарьинская область'>Сырдарьинская область</Option>
                                <Option value='Сурхандарьинская область'>Сурхандарьинская область</Option>
                                <Option value='Наманганская область'>Наманганская область</Option>
                                <Option value='Навоийская область'>Навоийская область</Option>
                                <Option value='Кашкадарьинская область'>Кашкадарьинская область</Option>
                                <Option value='Джизакская область'>Джизакская область</Option>
                                <Option value='Бухарская область'>Бухарская область</Option>
                                <Option value='Андижанская область'>Андижанская область</Option>
                                <Option value='Республика Каракалпакстан'>Республика Каракалпакстан</Option>
                            </Select>
                        </div>
                        <div className='grid gap-2 sm:flex'>
                            <Input
                                type="text"
                                name='address'
                                placeholder='улица, дом, квартира'
                                label='Адрес'
                            />

                        </div>
                        {/* <div className='grid gap-2 sm:flex'>
                            <Input
                                type="password"
                                name='password'
                                label='Пароль'
                                defaultValue={'123456'}
                                placeholder='Придумайте пароль'
                            />
                            <Input
                                type='password'
                                name='password_try'
                                label='Повторите пароль'
                                placeholder='Повторите пароль'
                                defaultValue={'123456'}
                            />
                        </div> */}
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
                            <Button
                                variant='outlined'
                                color='red'
                                size='md'
                                className='mt-4'
                                disabled={!btnBool}
                                type='submit'>{ btnBool ? 'Зарегистрироваться' : 'Обработка'}
                            </Button>
                            <div className='flex w-full mt-4 text-xs'>
                                <p className='mr-1'>Уже есть аккаунт?</p>
                                {/* <Link to='/login'> */}
                                <p
                                    className='cursor-pointer text-xs text-red-500 border-b border-b-red-500'
                                    onClick={() => {
                                        setRegisterVisible(false)
                                        setInterval(() => {
                                            setLoginVisible(true)
                                        }, 200)
                                    }}>Войти</p>
                                {/* </Link> */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;