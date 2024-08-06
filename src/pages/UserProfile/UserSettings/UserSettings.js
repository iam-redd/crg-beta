import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import axios from '../../.././store/axios'
import url from '../../../default.json'
import styles from './UserSettings.module.css'
import { DefaultSpinner } from "../../../components/Spinner";
import { addData } from "../../../store/slices/userSlice";
import { Button, Input } from '@material-tailwind/react';
import { toast } from "react-toastify";

export default function MySettings() {
    const userInfo = useSelector(state => state.user.userInfo)
    const notifyError = (text) => toast.error(text);
    const notifySuccess = (text) => toast.success(text);
    const notifyWarning = (text) => toast.warning(text);

    const [, setMessage] = useState(null)
    const [paramsBool, setParams] = useState(false)
    const [image, setImage] = useState('')
    const addressDop = useRef(null)
    const nameOrganization = useRef(null)

    const dispatch = useDispatch()
    async function onSetting(e) {
        try {
            e.preventDefault()
            const address = []
            userInfo.address.map((item,index)=> {
                address.push({organization: item.organization,address:e.target[`address${index}`].value})
            })
            let options = {
                name: e.target.name.value,
                email: e.target.email.value,
                telegram: e.target.telegram.value,
                address: address,
                avatarUrl: image,
                phoneNumber: e.target.phoneNumber.value,
            }

            const response = await axios.patch(`/update-user-data`, options)
            if (response.status === 200) {
                dispatch(addData(response.data))
                setParams(false)
                window.location.reload();
            }
        } catch (e) {
            console.log(e)
            if (e?.response?.status === 500) {
                notifyError(e.response.data.message)
            } else {
                notifyError('Что-то пошло не так')
            }
        }
    }

    const input = useRef()
    const [isLoading, setLoading] = useState(false)
    const handleUpload = async () => {
        try {
            setParams(false)
            setLoading(true)
            setImage('')
            const image = input.current.files[0]
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post(`/upload `, formData);
            if (response.status === 200) {
                setImage(response.data.imagePath)
                notifySuccess('Данные успешно обновлены')
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
            setParams(true)
        } catch (error) {
            setMessage(error.message)
            console.error('Error uploading file:', error);
        }
        setLoading(false)
    };

    async function addAddress(e) {
        try {
            e.preventDefault()
            if (addressDop.current.children[0].value.trim() === '') {
                return notifyWarning('Заполните полю для организации')
            }
            if (nameOrganization.current.children[0].value.trim() === '') {
                return notifyWarning('Заполните полю для адреса')
            }
            const options = {
                address: addressDop.current.children[0].value.trim(),
                organization: nameOrganization.current.children[0].value.trim()
            }
            // console.log(options)
            const res = await axios.patch('/add-destination-point', { address: options })
            if (res?.message && res.status === 200) {
                notifySuccess(res.message)
                setTimeout(() => {
                    window.location.reload();
                }, 3000)
            }
            addressDop.current.children[0].value = ''
            nameOrganization.current.children[0].value = ''
        }
        catch (error) {
            error?.message ? notifyError(error.message) : notifyError(error)
        }

    }







    return (
        <>
            <div className="mx-auto border-t-2 mt-4">
                <h2 className="text-center my-4 font-bold text-lg">Настройки аккаунта</h2>
                {userInfo ?
                    <form onSubmit={onSetting}>
                        <div className="mx-auto md:flex justify-center gap-4">
                            <div className="flex flex-col gap-2 md:border rounded-md p-2 md:border-gray-400 content-center">
                                <div className={`mx-auto ${styles.userImg} justify-center items-center`}>
                                    {
                                        image !== '' ? <img src={`${process.env.REACT_APP_SERVER}/${image}`} alt="" /> :
                                            <>
                                                {
                                                    isLoading ? <DefaultSpinner /> : <>
                                                        {
                                                            userInfo.avatarUrl !== '' ? <img src={`${process.env.REACT_APP_SERVER}/${userInfo.avatarUrl}`} alt="" /> : <></>
                                                        }
                                                    </>
                                                }
                                            </>
                                    }
                                </div>
                                <div className="flex justify-center md:justify-end">
                                    <input type="file" hidden ref={input} onChange={handleUpload} />
                                    <div className='flex flex-col gap-2'>
                                        <p className='text-xs text-red-500 w-56 text-center'>*Рекомендуются фотографии с пропорцией 1:1
                                            (до 500px)</p>
                                        <Button
                                            size="md"
                                            variant="outlined"
                                            onClick={() => input.current.click()}
                                        >
                                            Изменить
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 md:p-0">
                                <div className="flex">
                                    <Input
                                        size="md"
                                        name="name"
                                        label="Имя:"
                                        defaultValue={userInfo?.name ? userInfo.name : ''}
                                        onInput={(e) => e.target.value.trim() !== userInfo.name ? setParams(true) : setParams(false)} />
                                </div>
                                <div>
                                    <Input
                                        label="Телефон:"
                                        defaultValue={userInfo?.phoneNumber ? userInfo.phoneNumber : ''}
                                        name="phoneNumber"
                                        disabled={true}
                                        onInput={(e) => e.target.value.trim() !== userInfo.email ? setParams(true) : setParams(false)} />
                                </div>
                                <div>
                                    <Input
                                        label="Email:"
                                        defaultValue={userInfo?.email ? userInfo.email : ''}
                                        name="email"
                                        onInput={(e) => e.target.value.trim() !== userInfo.email ? setParams(true) : setParams(false)} />
                                </div>

                                <div>
                                    <Input
                                        label="Telegram"
                                        defaultValue={userInfo?.telegram ? userInfo.telegram : ''}
                                        name="telegram"
                                        onInput={(e) => e.target.value.trim() !== userInfo.telegram ? setParams(true) : setParams(false)}
                                    />
                                </div>
                                <div >
                                    <span className="flex flex-col gap-2 p-4 md:p-0">{
                                        userInfo !== null && userInfo.role === 'superUser' ?
                                            <>
                                                {
                                                    userInfo.address.map((address, index) => {
                                                        return (
                                                            <Input
                                                                key={index}
                                                                label={`${address?.organization ? address.organization : `Адрес ${index + 1}`}`}
                                                                defaultValue={address?.address ? address.address : ''}
                                                                name={`address${index}`}
                                                                onInput={(e) => e.target.value.trim() !== userInfo.address[index].address ? setParams(true) : setParams(false)}
                                                            />
                                                        )
                                                    })
                                                }
                                                <span>Здесь можно добавить ещё один адресс</span>
                                            </> :
                                            <Input
                                                label={`Адрес`}
                                                defaultValue={userInfo?.address[0]?.address}
                                                name="address"
                                                onInput={(e) => e.target.value.trim() !== userInfo.address[0] ? setParams(true) : setParams(false)} />
                                    }</span>
                                </div>
                                {userInfo.role === 'superUser' ?
                                    <form className="flex flex-col gap-2" onSubmit={addAddress}>
                                        <div>
                                            <Input label="Организация:" ref={nameOrganization} defaultValue={''} name="nameOrganization" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <Input label="Адрес организации:" ref={addressDop} name="addressDop" />
                                            </div>
                                            <Button size="sm" onClick={addAddress} variant="outlined" className="flex-none">+</Button>
                                        </div>
                                    </form>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 p-4 md:p-0">
                            <Button size="md" variant="filled" color="green" type="submit" disabled={!paramsBool}>Сохранить</Button>
                            <Button size="md" variant="outlined" color="blue-gray" onClick={() => {
                                setParams(false)
                                setImage('')
                            }}>Отменить</Button>
                        </div>
                    </form>

                    : <div></div>
                }
            </div>
            <Outlet />
        </>


    )
}
