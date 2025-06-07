import userContext from './userContext.js'
import React, { useState , useEffect } from 'react'
import API from '../../Api.axios.js'


const Userstate = ({ children }) => {
    const [auth, setAuth] = useState(false)
    const [loginMode, setLoginMode] = useState(false)
    const [img, setImg] = useState(null)
    const [user, setUser] = useState(null); 

    useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuth(true);
  }
}, []);

     const login = async (email, password) => {
        try {
            const res = await API.post("user/login", { email, password }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });

            if (res.status === 200 && res.data && res.data.data && res.data.data.token) {
                localStorage.setItem("token", res.data.data.token);
                setAuth(true); 
            } else {
                setAuth(false);
               
            }
        } catch (error) {
            setAuth(false);
            
        }
    }


    const signup = async (email, phone, name, username, password) => {

        const res = await API.post("user/register", { email, phone, name, username, password }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        setTimeout(() => {
            setLoginMode(true);
        }, 3000);
        // console.log(res.data);

    }

    const logout = async () => {
        const res = await API.post("user/logout", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        if (res.status === 200) {
            // console.log("Logout successful:", res.data);
            localStorage.removeItem("token");
            setAuth(false);
            setLoginMode(true);
            setUser(null);
            
        } else {
            console.error("Logout failed:", res.data);
        }
    }

    const GetUser = async () => {
        const res = await API.post("user/getuser",{}, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        if (res.status === 200) {
            // console.log("User data fetched successfully:", res.data);
             setUser(res.data.data)
            return res.data;
        } else {
            console.error("Failed to fetch user data:", res.data);
            return null;
        }
    }

    const Profilepic = async(formData)=>{
        const res = await  API.post("user/uploadImage", formData, {
            headers:{
                "Content-type" : "multipart/form-data"
            },
            withCredentials: true
        })
        if (res.status === 200) {
            // console.log("Profile picture uploaded successfully:", res.data);
            return res.data;
        } else {
            console.error("Failed to upload profile picture:", res.data);
            return null;
        }
    }


    return (
        <userContext.Provider value={{ login, signup, auth, setAuth, setLoginMode, loginMode, logout, GetUser, Profilepic , img, setImg,user,setUser }}>
            {children}
        </userContext.Provider>
    )
}

export default Userstate
