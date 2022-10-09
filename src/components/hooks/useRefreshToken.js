import Axios from '../../api/Axios'
import useAuth from './useAuth'

function useRefreshToken() {
    const { setAuth } = useAuth();
    const refresh = async () => {
        const res  = await Axios.get('api/user/refresh',{
            withCredentials: true
        })

        setAuth(prev => {
            return { ...prev, token: res.data.token, user: res.data.user}
        });
        return res.data.token;
    }
  return refresh
}

export default useRefreshToken