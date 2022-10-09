import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try{
                await refresh()
            }catch(error){
                console.error(error)
            }finally{
                setIsLoading(false)
            }
        }

        !auth?.token ? verifyRefreshToken() : setIsLoading(false);
        
    }, []);

    useEffect(()=>{
    },[isLoading]);

    return (
        <>
            {isLoading
            ? <p>Loading ...</p>
            : <Outlet />}
        </>
    );
}

export default PersistLogin;