import React, { useState } from 'react';
import styles from './Login.module.css'
import axios from '../../../store/axios'
import { addData, logout } from '../../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Input, Typography } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

const LogIn = () => {
    const width = window.innerWidth
    const [isVisible, setVisible] = useState(false)
    const [loginError, setLogin] = useState(false)
    // const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errorMessage,setMessage] = useState('')
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            setLogin(false)
            const email = e.target.email.value
            const password = e.target.password.value

            const data = await axios.post(`/auth/login`, {
                email,
                password
            })
            console.log(data)
            if (data.status === 200) {
                console.log(data.data)
                window.localStorage.setItem('token', data.data.token)
                dispatch(addData(data.data))
                setVisible(false)
                navigate('/user')
            }
            if(data.status === 403 || data.status === 404) {
                setLogin(true)
            }
            return null

        } catch (error) {
            const status = error.response.status
            if(status === 403 || status === 404) {
                handleError('Неверный логин или пароль')
            }else if (status === 500){
                handleError('Не удалось авторизоватся')
            }else{
                handleError(error.message)
            }
        }
    }


    const handleError = (message) => {
        setMessage(message)
        console.log(errorMessage)
        setLogin(true)
    }
    useEffect(() => {
        setVisible(true)
        // userInfo !== null && dispatch(logout())
    })
    return (
        <div className={` m-auto ${styles.container}`}>
            <AnimatePresence>
                {
                    isVisible && <motion.div
                        className={`w-full m-auto ${styles.wrapper}`}
                        // animate={isVisible ? "open" : "closed"}
                        // variants={variants}
                        // style={{ transitionDuration: 2000 }}
                        initial={{ top: '-500px' }}
                        animate={{ top: width < 400 ? '-400px':  '-250px' }}
                        exit={{ top: '-200px' }}
                    >

                        <form
                            onSubmit={handleSubmit}
                            className={`justify-center m-auto ${styles.form}`}>
                                <p 
                                className="px-4 text-end text-red-500"
                                onClick={()=> navigate('/user')}
                                >Назад</p>
                            <div>
                                <h2 className='text-center font-bold text-lg'>Авторизация</h2>
                                <p className='py-4 text-center'>Добро пожаловать, рады вас видеть. <br /> Чтобы войти в свой аккаунт, пожалуйста введите ваши данные.</p>

                            </div>

                            <Input
                                type="text"
                                label='Ваш логин'
                                name='email'
                                className={styles.input}
                                defaultValue={'test6@test.ru'} />

                            <Input
                                label='Ваш пароль'
                                name='password'
                                type='password'
                                defaultValue={'123456'}
                                className={styles.input} />
                            {   loginError &&
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
                            <div className='flex w-full justify-around'>
                                <button
                                    className={styles.btn}
                                >{isVisible ? 'Войти' : 'Загрузка...'}</button>
                                <Link to='/user/registration'>
                                    <p className='cursor-pointer '>Регистрация</p>
                                </Link>
                            </div>
                        </form>

                    </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default LogIn;