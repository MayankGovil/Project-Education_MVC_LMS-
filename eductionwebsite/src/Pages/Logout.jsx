import React, { useEffect } from 'react';
import Cookies from  "js-cookie";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const nav = useNavigate();

    const logoutuser = ()=>{
        Cookies.remove('user', { path: '' });

        nav('/')
    };

    useEffect(()=>{
        logoutuser();
    },[]);

  return (
    <div>Logout</div>
  )
}

export default Logout