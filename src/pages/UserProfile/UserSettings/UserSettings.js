import React from "react";
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';

import url from '../../../default.json'

import styles from './UserSettings.module.css'
import { Button, Input, Select, Option } from '@material-tailwind/react';

export default function MySettings() {
    const userInfo = useSelector(state => state.user.userInfo)
    async function onSetting(e) {
        e.preventDefault()

    }


    return (
        <>
            <div className="mx-auto border-t-2 mt-4">
                <h2 className="text-center my-4 font-bold text-lg">Настройки аккаунта</h2>
                {userInfo ?
                    <form onSubmit={onSetting}>
                        <div className="mx-auto md:flex justify-center gap-4">
                            <div className="flex flex-col gap-2 md:border rounded-md p-2 md:border-gray-400">
                                <div className={` mx-auto ${styles.userImg}`}>
                                    {
                                        userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <span></span>
                                    }
                                </div>
                                <div className="flex justify-center md:justify-end">
                                    <Button size="sm" variant="outlined" type="submit">
                                        Изменить
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 p-4 md:p-0">
                                <div className="flex">
                                    <Input size="sm" label="Имя:" defaultValue={userInfo.name} name="name" />
                                </div>
                                <div>
                                    <Input label="Email:" defaultValue={userInfo.email} name="email" />
                                </div>
                                <div>
                                    <Input label="Номер телефона" defaultValue={userInfo.phoneNumber} name="phoneNumber" />
                                </div>
                                <div>
                                    <Input label="Telegram" defaultValue={userInfo.telegram} name="telegram" />
                                </div>
                                <div>
                                    <Input label="Адрес" defaultValue={userInfo.address} name="address" />
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
                            <Button size="sm" variant="filled" color="green">Сохранить</Button>
                            <Button size="sm" variant="outlined" color="blue-gray">Отменить</Button>
                        </div>
                    </form>

                    : <div></div>
                }
            </div>
            <Outlet />
        </>


    )
}
