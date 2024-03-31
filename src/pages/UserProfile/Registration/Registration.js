import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css'
import ImageUpload from './UploadImage/UploadImage';
import axios from '../../../store/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addData, logout } from '../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { Input } from '@material-tailwind/react';

// import URL from '../../default.json'
const Registration = () => {
    const [uploadedImages, setUploadedImages] = useState(null)
    const userInfo = useSelector(state => state.user.userInfo)
    console.log(uploadedImages)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
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
                
                navigate(-1)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
            const res = error.response
            if (res.status === 400) {
                console.log(res.data[0].msg)
            }else if(res.status === 500){
                console.log(res.data.message)
            }
        }
    }

    useEffect(() => {
        // userInfo !== null && dispatch(logout())
    });
    return (
        <div className='relative'>
            <div className={`absolute -top-72 sm:-top-36 md:-top-48 flex w-full`}>
                <div className={`items-center justify-center m-auto ${styles.bordered}`}>
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
                            name='password try'
                            label='Повторите пароль'
                            placeholder='Повторите пароль' 
                        />
                    </div>
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