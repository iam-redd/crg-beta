import React, { useState } from 'react';
import styles from './Login.module.css'
import axios from '../../../store/axios'
import { addData, logout } from '../../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import {
    Input,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom';

const LogIn = () => {
    const [isVisible, setVisible] = useState(false)
    const userInfo = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const email = e.target.email.value
            const password = e.target.password.value

            const data = await axios.post(`/auth/login`, {
                email,
                password
            })
            if (data.status === 200) {
                console.log(data.data)
                window.localStorage.setItem('token', data.data.token)
                dispatch(addData(data.data))
                setVisible(false)
                navigate('/user')
            }
            return null

        } catch (error) {
            
                console.log('Не удалось авторизоватся')
        }
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
                        initial={{ top:'-200px' }}
                        animate={{ top:'-150px' }}
                        exit={{ top: '-200px' }}
                    >
                    
                        <form
                            onSubmit={handleSubmit}
                            className={`justify-center m-auto ${styles.form}`}>
                            <div>
                            <h2 className='text-center font-bold text-lg'>Авторизация</h2>
                            <p className='py-4 text-center'>Добро пожаловать, рады вас видеть. <br/> Чтобы войти в свой аккаунт, пожалуйста введите ваши данные.</p>

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

                                <div className='w-full flex justify-between'>
                                <p className='cursor-pointer'>Забыли пароль?</p>
                                <Link to='/user/registration'>
                                    <p className='cursor-pointer'>Регистрация</p>
                                </Link>
                                </div>
                            <button
                                className={styles.btn}
                            >{ isVisible ? 'Войти' : 'Загрузка...'}</button>
                        </form>
                        
                    </motion.div>}
            </AnimatePresence>
        </div>
    );
};

export default LogIn;