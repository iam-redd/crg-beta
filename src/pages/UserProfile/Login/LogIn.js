import React, { useState, useEffect } from 'react';
import styles from './Login.module.css'
import axios from '../../../store/axios'
import { setRegister } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux'
//import { useNavigate } from 'react-router-dom'
import {Button, Input, Typography} from "@material-tailwind/react";
const LogIn = ({ setLoginVisible, setRegisterVisible, setCodeFormVisible }) => {
    const [isVisible, setVisible] = useState(false)

    const [butloading, setButloading] = useState(false);
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const [loginError, setLogin] = useState(false)
    const dispatch = useDispatch()
    //const navigate = useNavigate()
    const [errorMessage, setMessage] = useState('')
    const regex = /^\+998[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]$/
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLogin(false)
            const options = {
                phoneNumber: e.target.email.value.trim(),
            }
            if (options.phoneNumber === '') {
                handleError('Имя обязательная поля')
                return
            }
            if (!regex.test(options.phoneNumber)) {
                handleError('Неправильный формат номера телефона')
                return
            }
            setButloading(true)
            // await delay(5000);

            const data = await axios.post(`/login`, options)
            if (data.status === 200) {
                dispatch(setRegister(options))
                const response = await axios.post(`/send-code`, options)
                if (response.status === 200) {
                    setLoginVisible(false)
                    setButloading(false);
                    setTimeout(()=>{
                        setCodeFormVisible(true)
                    },200)
                }
            }


        } catch (error) {
            const status = error?.response?.status || null
            if (error?.response?.data?.message) {
                handleError(error?.response?.data?.message)
            } else if (status === 500) {
                handleError('Не удалось авторизоватся')
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
        setVisible(true)
    }, [setVisible])
    return (
        <form
            onSubmit={handleSubmit}
            className={`w-full md:w-max ${styles.form}`}>
            <div>
                <h2 className='text-center font-bold text-lg'>Авторизация</h2>
                <p className='py-4 text-center'>Добро пожаловать, рады вас видеть. <br /> Чтобы войти в свой аккаунт, пожалуйста введите ваши данные.</p>
            </div>
            <Input
                type="text"
                label='Ваш номер телефона'
                name='email'
                className={styles.input}
                defaultValue={'+998'} />
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
            <div className='w-full flex justify-between'>
                <p className='cursor-pointer'>Забыли пароль?</p>
            </div>
            <div className='flex w-full justify-around items-center'>
                <Button
                    variant='outlined'
                    color='red'
                    size='md'
                    loading={butloading}
                    disabled={butloading}
                    type='submit'
                >{butloading ?  'Загрузка...'  :  'Войти'}
                </Button>
                {/* <Link to='/registration'> */}
                <p className='cursor-pointer '
                    onClick={() => {
                        setLoginVisible(false)
                        setTimeout(() => {
                            setRegisterVisible(true)
                        }, 200)
                    }}>Регистрация</p>
                {/* </Link> */}
            </div>
        </form>

        //             }
        //         </AnimatePresence>
        //     </div>
    );
};

export default LogIn;