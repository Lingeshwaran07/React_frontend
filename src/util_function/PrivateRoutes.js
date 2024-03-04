import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutes = () => {
   // const user = useSelector((store) => store?.users?.userInfo)
    const { username, email } = useSelector((state) => state.users);
    console.log(username)
    return(
        email ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes