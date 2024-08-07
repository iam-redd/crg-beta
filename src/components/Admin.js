import React, { useEffect } from 'react'
import { DefaultSpinner } from './Spinner'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const userInfo = useSelector(state => state.user.userInfo)
    const navigate = useNavigate()
    useEffect(() => {
        if (userInfo !== null && userInfo.role === 'admin' || userInfo.role === 'operator' || userInfo.role === 'developer' || userInfo.role === 'master' || userInfo.role === 'heaver' || userInfo.role === 'manager') {
            navigate('/staff/monitoring')
        }
        else navigate('/')
    }, [userInfo]);
    return (
        <div><DefaultSpinner /></div>
    )
}
