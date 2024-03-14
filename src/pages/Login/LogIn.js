import React from 'react';
import styles from './Login.module.css'
import axios from '../../store/axios'
import { addData } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LogIn = () => {
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
                window.localStorage.setItem('token',data.data.token)
                dispatch(addData(data.data))
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
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className={styles.form}>
                <input
                    type="text"
                    name='email'
                    className={styles.input}
                    defaultValue={'test6@test.ru'} />
                <input
                    type="text"
                    name='password'
                    defaultValue={'123456'}
                    className={styles.input} />
                <button
                    className={styles.input}>SUBMIT</button>
            </form>
        </div>
    );
};

export default LogIn;