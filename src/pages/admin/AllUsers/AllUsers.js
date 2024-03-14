import React, { useState } from 'react'
import axios from '../../../store/axios'
import { useEffect } from 'react'
import { DefaultSpinner } from '../../../components/Spinner'
import styles from './AllUsers.module.css'
export default function AllUsers() {
  const [users, setUsers] = useState(null)
  async function getAllUsersFunc() {
    try {
      const data = await axios.post('/get/all-users')
      if (data.status === 200) {
        console.log(data.data)
        setUsers(data.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    users === null && getAllUsersFunc()
  });
  return (
    <div>
      {
        users !== null ? <div className="">
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>№</th>
                <th className={styles.th}>Имя</th>
                <th className={styles.th}>Статус</th>
                <th className={styles.th}>Телефон</th>
                <th className={styles.th}>Email</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={user.name}>
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>{user.name}</td>
                      <td className={styles.td}>{user.role}</td>
                      <td className={styles.td}>{user.phoneNumber}</td>
                      <td className={styles.td}>{user.email}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div> : <DefaultSpinner />
      }
    </div>
  )
}
