import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const isAuthenticated = localStorage.getItem("user")
  const location = useLocation()
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <div className='min-h-[calc(100vh-100px)] flex items-center justify-center text-black'>
      <img className="animate-bounce mx-auto w-[10%]" src={'/LAMS_Logo.png'} alt="Logo" />
    </div>
  }
  if (isAuthenticated) {
    return <>{children}</>
  }

  return <Navigate state={{ from: location }} to="/login" />;
}

export default PrivateRoute;