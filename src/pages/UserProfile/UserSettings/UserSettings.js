import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import axios from '../../.././store/axios'
import url from '../../../default.json'
import styles from './UserSettings.module.css'
import { DefaultSpinner } from "../../../components/Spinner";
import { addData } from "../../../store/slices/userSlice";
import { Button, Input, Select, Option } from '@material-tailwind/react';
import { toast } from "react-toastify";

export default function MySettings() {
    const userInfo = useSelector(state => state.user.userInfo)
    const notifyError = (text) => toast.error(text);
    const [, setMessage] = useState(null)
    const [paramsBool, setParams] = useState(false)
    const [image, setImage] = useState('')
    const dispatch = useDispatch()
    async function onSetting(e) {
        try {
            e.preventDefault()
            let options = {
                name: e.target.name.value,
                email: e.target.email.value,
                phoneNumber: e.target.phoneNumber.value,
                telegram: e.target.telegram.value,
                address: e.target.address.value,
                avatarUrl: image
            }

            const response = await axios.patch(`/update-user-data`, options)
            if (response.status === 200) {
                dispatch(addData(response.data))
                setParams(false)
                window.location.reload();
            }
        } catch (e) {
            notifyError('Что-то пошло не так')
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
            console.log(image)
            const formData = new FormData();
            formData.append('image', image);
            const response = await axios.post(`/upload `, formData);
            if (response.status === 200) {
                setImage(response.data.imagePath)
            }
            setParams(true)
        } catch (error) {
            setMessage(error.message)
            console.error('Error uploading file:', error);
        }
        setLoading(false)
    };





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
                                        image !== '' ? <img src={`${url.backendUrl}/${image}`} alt="" /> :
                                            <>
                                                {
                                                    isLoading ? <DefaultSpinner /> : <>
                                                        {
                                                            userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <></>
                                                        }
                                                    </>
                                                }
                                            </>
                                    }
                                </div>
                                <div className="flex justify-center md:justify-end">
                                    <input type="file" hidden ref={input} onChange={handleUpload} />
                                    <Button
                                        size="md"
                                        variant="outlined"
                                        onClick={() => input.current.click()} >
                                        Изменить
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 md:p-0">
                                <div className="flex">
                                    <Input
                                        size="md"
                                        label="Имя:"
                                        defaultValue={userInfo.name}
                                        onInput={(e) => e.target.value.trim() !== userInfo.name ? setParams(true) : setParams(false)} />
                                </div>
                                <div>
                                    <Input
                                        label="Email:"
                                        defaultValue={userInfo.email}
                                        name="email"
                                        onInput={(e) => e.target.value.trim() !== userInfo.email ? setParams(true) : setParams(false)} />
                                </div>

                                <div>
                                    <Input
                                        label="Telegram"
                                        defaultValue={userInfo.telegram}
                                        name="telegram"
                                        onInput={(e) => e.target.value.trim() !== userInfo.telegram ? setParams(true) : setParams(false)}
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="Адрес"
                                        defaultValue={userInfo.address[0]}
                                        name="address"
                                        onInput={(e) => e.target.value.trim() !== userInfo.address[0] ? setParams(true) : setParams(false)}
                                    />
                                </div>
                                {userInfo.role === 'superUser' ?
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <Input label="Организация:" defaultValue={userInfo.userOrganizatsion} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1">
                                                <Input label="Адрес организации:" />
                                            </div>
                                            <Button size="sm" variant="outlined" className="flex-none">+</Button>
                                        </div>
                                        <div className="w-72 text-sm mt-2">
                                            Выберите вашего менеджера
                                            <Select size="md" >
                                                <Option >
                                                    <img
                                                        src=""
                                                        alt="manager"
                                                    />
                                                    Manager 1
                                                </Option>
                                                <Option >
                                                    <img
                                                        src=""
                                                        alt="manager"
                                                    />
                                                    Manager 2
                                                </Option>

                                            </Select>

                                        </div>
                                    </div>
                                    :
                                    <div></div>
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
