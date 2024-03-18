import { useCookies } from 'react-cookie';
import { Outlet, Navigate } from 'react-router-dom'
import useStore from "../store/UserStore";

const PrivateRoutes = () => {
    const [cookies] = useCookies(['accessToken']);
    const { accessToken } = useStore();

    return (
        cookies.accessToken ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes