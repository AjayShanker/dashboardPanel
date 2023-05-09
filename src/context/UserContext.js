import {createContext, useState, useEffect} from 'react'
import axios from 'axios'

export const UserContext = createContext();

export const Axios = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

export const UserContextProvider = ({children}) => {

    const [theUser, setUser] = useState(null);
    const [wait, setWait] = useState(false);

    const registerUser = async ({name,email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('register.php',{
                name,
                email,
                password 
            });
            setWait(false);
            return data;
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }
    }

    const loginUser = async ({email,password}) => {
        setWait(true);
        try{
            const {data} = await Axios.post('login.php',{
                email,
                password 
            });
            if(data.success && data.token){
                sessionStorage.setItem('loginToken', data.token);
                setWait(false);
                return {success:1};
            }
            setWait(false);
            return {success:0, message:data.message};
        }
        catch(err){
            setWait(false);
            return {success:0, message:'Server Error!'};
        }

    }

    const loggedInCheck = async () => {
        const loginToken = sessionStorage.getItem('loginToken');
        Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
        if(loginToken){
            const {data} = await Axios.get('getUser.php');
            if(data.success && data.user){
                setUser(data.user);
                return;
            }
            setUser(null);
        }
    }

    useEffect(() => {
        async function asyncCall(){
            await loggedInCheck();
        }
        asyncCall();
    },[]);

    const logout = () => {
        sessionStorage.removeItem('loginToken');
        setUser(null);
    }

    return (
        <UserContext.Provider value={{registerUser,loginUser,wait, user:theUser,loggedInCheck,logout}}>
            {children}
        </UserContext.Provider>
    );

}

export default UserContextProvider;