import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const ProtectedRoute = ({children}) => {
  const user = useSelector((data)=> data.user.userData)
  const navigate = useNavigate()  

  useEffect(()=>{
    if(!user){
      toast.error("Please login to get dashboard")
      navigate('/login')
    }
  },[])

  return (
    <>
      {children}
    </>
  )
}

export default ProtectedRoute