import React  from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom';

import url from '../../../default.json'

import styles from './UserSettings.module.css'
import { Button, IconButton, Input } from '@material-tailwind/react';

export default function MySettings(){
    const userInfo = useSelector(state => state.user.userInfo)



    return(
        <>
            <div className="mx-auto border-t-2 mt-4">
                <h2 className="text-center my-4 font-bold text-lg">Настройки аккаунта</h2>
                {userInfo ? 
                    <div >
                    <div className="mx-auto md:flex justify-center gap-4">
                    <div className="flex flex-col gap-2 md:border rounded-md p-2 md:border-gray-400">
                    <div className={` mx-auto ${styles.userImg}`}>
                    {
                        userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <span></span>
                    }
                    </div>
                    <div className="flex justify-center md:justify-end">
                    <Button size="sm" variant="outlined">
                    Изменить
                    </Button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 p-4 md:p-0">
                  <div className="flex">
                      <Input size="sm" label="Имя:" defaultValue= {userInfo.name} />
                  </div>
                  <div>
                      <Input label="Email:" defaultValue={userInfo.email} />
                  </div>
                  <div>
                      <Input label="Номер телефона" defaultValue={userInfo.phoneNumber} />
                  </div>
                  <div>
                      <Input label="Telegram" defaultValue={userInfo.telegram} />
                  </div>
                  <div>
                      <Input label="Адрес" defaultValue={userInfo.address} />
                  </div>
                  
                  {userInfo.role === 'superUser' ? 
                    <div>
                        <div>
                            Организация: {userInfo.organization}
                        </div>
                        <div>
                            Менеджер: 
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
                </div>
                
                  :<div></div>
                }
            </div>
            <Outlet />
        </>
        

        )
}
