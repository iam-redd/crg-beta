import React, { useEffect, useState } from 'react';
import styles from './Registration.module.css'
import ImageUpload from './UploadImage/UploadImage';
import axios from '../../../store/axios'
import { useDispatch, useSelector } from 'react-redux'
import { addData, logout } from '../../../store/slices/userSlice'
import { useNavigate } from 'react-router-dom';
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
        <div>
            <ImageUpload
            list={uploadedImages}
            setList={setUploadedImages} />
            <form
                onSubmit={handleSubmit}
                className={styles.form}>
                <input
                    type="text"
                    name='name'
                    className={styles.input}
                    defaultValue={'kadyrzhan'}
                    placeholder='name' />
                <input
                    type="text"
                    name='email'
                    defaultValue={'test6@test.ru'}
                    className={styles.input}
                    placeholder='email' />
                <input
                    type="text"
                    name='phoneNumber'
                    className={styles.input}
                    defaultValue={'+998999994923'}
                    placeholder='phone' />
                <input
                    type="text"
                    name='address'
                    className={styles.input}
                    defaultValue={'gulsanam 48'}
                    placeholder='adres' />
                <input
                    type="text"
                    name='telegram'
                    className={styles.input}
                    defaultValue={'kadyrzhan_23'}
                    placeholder='telegram' />
                <input
                    type="text"
                    name='password'
                    className={styles.input}
                    defaultValue={'123466'}
                    placeholder='password' />
                <button
                    className={styles.input}>SUBMIT</button>
            </form>
        </div>
    );
};

export default Registration;