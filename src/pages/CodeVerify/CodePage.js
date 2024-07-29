import {button, Button, Input} from '@material-tailwind/react';
import React, { useEffect, useRef, useState } from 'react';
import axios from '../../store/axios'
import { useDispatch, useSelector } from 'react-redux';
import { addData, setRegister } from '../../store/slices/userSlice';
import CryptoJS from 'crypto-js';
import secretKey from '../../default.json'
import { toast } from 'react-toastify';
const CodePage = ({setCodeFormVisible }) => {

    const [butloading, setButloading] = useState(false);

    const [value, setValue] = useState(null)
    const [ErrorText, setError] = useState('')
    const [time, setTime] = useState(300); // 5 минут = 300 секунд
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef(null);
    const userInfo = useSelector(state => state.user.register)
    const dispatch = useDispatch()
    const notify = (text) => toast.error(text)
    async function handleVerify(e) {
        try {
            e.preventDefault()
            setError('')

            let options = Object.assign({}, userInfo, { code: value.target.value.trim() })
            const response = await axios.post('/verify-code', options)
            if (response.status === 200) {
                const str = JSON.stringify(response.data)
                const ciphertext = CryptoJS.AES.encrypt(str, secretKey.secretKey).toString();
                window.localStorage.setItem('data', JSON.stringify(ciphertext))
                window.localStorage.setItem('token', JSON.stringify(response.data.token))
                dispatch(addData(response.data))
                dispatch(setRegister(null))
                setCodeFormVisible(false)
            }
        } catch (err) {
            if (err?.response) {
                if (err?.response?.data?.message) {
                    setError(err.response.data.message)
                }
            }
        }
    }

    const sendAgain = async () => {
        try {
            const response = await axios.post(`/send-code`, userInfo)
            if (response.status === 200) {
                resetHandler()
            }
        } catch (err) {
            if (err?.response?.data?.message) {
                notify(err.response.data.message)
            } else {
                notify(err)
            }
        }
    }

    const resetHandler = () => {
        setIsRunning(false);
        setTime(300);
        setTimeout(() => setIsRunning(true), 0); // Restart the timer immediately
    };

    const formatTime = (time) => {
        const getSeconds = `0${time % 60}`.slice(-2);
        const minutes = Math.floor(time / 60);
        const getMinutes = `0${minutes % 60}`.slice(-2);

        return `${getMinutes} : ${getSeconds}`;
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const fetchData = async () =>{
        setButloading(true);

        await delay(20000);
        setButloading(false);
    }

    useEffect(() => {
        if (isRunning && time > 0) {
            timerRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRunning, time]);
    return (

        <div>
            <form onSubmit={handleVerify} className='w-full m-auto h-full md:w-80 lg:h-2/6 border rounded-xl p-4 mt-10 md:mt-8' style={{backgroundColor:'#FFFFFF'}}>
                <h2 className='text-center my-4 font-bold '>Верификация</h2>

                <p className='text-sm my-2 text-center'>{formatTime(time)}</p>
                <Input className='' label='Введите код' name='code' onInput={(e) => setValue(e)} />
                <div className='mt-4' >
                    <p className='text-xs my-2'>{
                        userInfo?.phoneNumber ? `Введите код из 6 цифр отправленного на номер ${userInfo.phoneNumber.split('')[0] + userInfo.phoneNumber.split('')[1] + userInfo.phoneNumber.split('')[2] + userInfo.phoneNumber.split('')[3] + ('*****') + userInfo.phoneNumber.split('')[11] + userInfo.phoneNumber.split('')[12]}` : 'Введите код из 6 цифр отправленного на номер /Номер пользователя ****//'
                    }</p>
                    <p className='text-xs my-2 text-red-500'>{ErrorText}</p>
                    <div className='flex items-center gap-4' >
                        <Button
                            className='mt-4 mx-auto'
                            variant='outlined'
                            size='md'
                            color={ butloading ? 'blue-gray' : 'red'}
                            type='submit'
                            loading={butloading}
                        >{
                            butloading ? 'Проверка...' : 'Подтвердить'
                        }
                        </Button>
                        <p
                            color={time === 0 ? 'red' : 'blue-gray-100'}
                            className='text-xs mt-4 cursor-pointer'
                            onClick={() => time === 0 && sendAgain()}
                        >Отправить повторно</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CodePage;