import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginHideForAuthUser = () => {
    const { username, email } = useSelector((state) => state.users);
    console.log(username)
    return(
        email ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default LoginHideForAuthUser