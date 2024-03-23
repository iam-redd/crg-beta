import React, { useState } from 'react';
import styles from './Login.module.css'
import axios from '../../../store/axios'
import { addData } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';

const LogIn = () => {
    const [isVisible, setVisible] = useState(false)
    const variants = {
        open: { top: '0px' },
        closed: { top: '-2000px' },

    }
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
                navigate(-1)
            }
            return null

        } catch (error) {
            if (error.response.status === 400 && error.response.status === 404) {
                console.log('Неверный логин или пароль')
            } else if (error.response.status === 500) {
                console.log('Не удалось авторизоватся')
            }
        }
    }
    useEffect(() => {
        setVisible(true)
    })
    return (
        <div className={styles.container}>
            <AnimatePresence>
                {
                    isVisible && <motion.div
                        className={`w-full ${styles.wrapper}`}
                        // animate={isVisible ? "open" : "closed"}
                        // variants={variants}
                        style={{ transitionDuration: 1000 }}
                        initial={{ top: '-200px' }}
                        animate={{ top: '0px' }}
                        exit={{ top: '-200px' }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className={styles.form}>
                            <p>Логин</p>
                            <input
                                type="text"
                                name='email'
                                className={styles.input}
                                defaultValue={'test6@test.ru'} />
                            <p>Пароль</p>
                            <input
                                type="text"
                                name='password'
                                defaultValue={'123456'}
                                className={styles.input} />
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