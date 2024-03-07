import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

export default async function RequireAccess({children}) {

    const location = useLocation()
    const auth = true;

    if(auth){
        return <Navigate to="/user-profile" state={{from:location}}/>
    }
  return children
}
