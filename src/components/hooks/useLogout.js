import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
    const axiosPrivate = useAxiosPrivate()
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const res = await axiosPrivate.post('api/auth/logout', {
                withCredentials:true
              });
              return res;
        } catch (error) {
            console.error(error)
        }
    }
    return logout;
}


export default useLogout;