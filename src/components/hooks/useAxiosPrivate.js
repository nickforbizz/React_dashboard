import { useEffect } from "react";
import { axiosPrivate } from "../../api/Axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${auth?.token}`
                }
                return config;
            }, error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAuthToken = await refresh();
                    console.log(newAuthToken);
                    prevRequest.headers['Authorization'] = `Bearer ${newAuthToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.request.eject(requestIntercept);
        };
    }, [auth, refresh]);


    return axiosPrivate;
}


export default useAxiosPrivate;