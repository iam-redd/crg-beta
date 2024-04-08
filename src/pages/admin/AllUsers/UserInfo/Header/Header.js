import React, { useEffect, useState } from 'react'
import styles from '../../../../UserProfile/UserHeader/UserHeader.module.css'
import axios from '../../../../../store/axios'
import url from '../../../../../default.json'
import { useParams } from 'react-router-dom';
export default function UserInfo() {
  const { id } = useParams()
  const [userInfo, setInfo] = useState(null)

  async function getUserInfo() {
    try {
      const response = await axios.get(`/user/${id}`)
      console.log(response)
      if(response.status === 200){
          setInfo(response.data)
      }
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    userInfo === null && getUserInfo()
  });
  return (
    <div>
      {
        userInfo !== null ? <div className='xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-2'>
          <div className='flex justify-between items-center p-2 xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full'>
            <div className='flex flex-col items-center'>
              <div className={styles.userImg}>
                {
                  userInfo.avatarUrl !== '' ? <img src={`${url.backendUrl}/${userInfo.avatarUrl}`} alt="" /> : <span></span>
                }
              </div>
              <div className={styles.userName}><span>{userInfo.name}</span></div>
            </div>
            <div className='sm:ml-2 md:ml-10 lg:ml-5 xl:ml-20'>
              <p className='text-gray-400'>Данные пользователья:</p>
              <div className={styles.userMail}>Имя: <span>{userInfo.name}</span></div>
              <div className={styles.userMail}>Почта: <span>{userInfo.email}</span></div>
              <div className={styles.userPhone}>Номер телефона: <span>{userInfo.phoneNumber}</span></div>
              { userInfo.address[0] && <div className={styles.userAddress}>Адрес доставки: <span>{userInfo.address[0]}</span></div>}
              <div className={styles.userAddress}>Статус: <span>{userInfo.role}</span></div>
                <div className={styles.userOrg}>Организация: <span>Don Coffee</span></div>
            </div>
          </div>
        </div>
          :
          <div className='items-center xs:px-2 sm:flex md:flex xl:flex justify-between max-w-screen-xl 2xl:max-w-screen-xl lg:px-4 lg:py-2'>
            <div className='flex justify-center items-center xl:flex lg:flex lg:justify-center lg:items-center sm:flex sm:w-full sm:items-start'>
              <div className='flex flex-col items-center mx-5'>
                <div className={styles.userImgD}></div>
                <div className={styles.userNameD}></div>
              </div>
              <div className='sm:ml-2 md:ml-10 lg:ml-5 xl:ml-20'>
                <p>Данные пользователья</p>
                <div className={styles.userMailD}>Почта: </div>
                <div className={styles.userPhoneD}>Номер телефона: </div>
                <div className={styles.userStatusD}>Статус: </div>
                <div className={styles.userOrgD}>Организация: </div>
                <div className={styles.userOrgD}>Организация: </div>
              </div>
            </div>
          </div>
      }
    </div>
  )
}
