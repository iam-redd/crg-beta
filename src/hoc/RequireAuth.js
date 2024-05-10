import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'

export default async function RequireAccess({children}) {

    const location = useLocation()
    const userInfo = useSelector(state => state.user.userInfo)
    console.log(userInfo)
    const auth = true;

    if(auth){
        return <Navigate to="/user-profile" state={{from:location}}/>
    }
  return children
}
