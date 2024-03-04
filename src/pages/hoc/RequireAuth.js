import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default function RequireAuth({children}) {

    const location = useLocation()
    const auth = false;

    if(auth){
        return <Navigate to="/user-profile" state={{from:location}}/>
    }
  return children
}
