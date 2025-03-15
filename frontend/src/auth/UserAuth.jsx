import React from 'react'
import { useState,useEffect,useContext } from 'react';
import { UserContext } from '../context/user.context'
import { useNavigate } from 'react-router-dom';


const UserAuth = ({ children }) => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (loading) {
        <div>loading...</div>
    }

   

    useEffect(() => {

 if (user) {
   setLoading(false);
 }

        if (!token) {
          navigate("/login");
        }

        if (!user) {
          navigate("/login");
        }
     },[])
    
  return (
      <>
            {children}
      </>
  )
}

export default UserAuth