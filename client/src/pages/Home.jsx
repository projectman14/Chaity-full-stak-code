import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../../public/Logo.png'
import io from 'socket.io-client'

const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  console.log("redux user ", user)

  const fetchUserDetails = async () => {
    try {
      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`;
      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate('/email')
      }

      console.log("Current user details : ", response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  const basePath = location.pathname === '/'

  useEffect(() => {
    const socketConnection = io(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}`,
      {
        auth: {
          token: localStorage.getItem('token')
        }
      })

    socketConnection.on('onlineUser', (data) => {
      console.log(data)
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))


    return () => {
      socketConnection.disconnect()
    }
  }, [])

  return (
    <div className='flex bg-black'>
      <section>
        <Sidebar />
      </section>

      <section className={`${basePath && 'hidden'} w-[100%]`}>
        <Outlet />
      </section>

      <div className={` flex-col justify-center items-center w-[100%] hidden ${!basePath ? 'hidden' : 'lg:flex'}`}>
        <div className='flex mb-8'>
          <img src={logo} className='h-[1.5rem] w-[1.5rem] ' />
          <p className='text-[#C8BCF6] poppins-regular ml-3 text-xl font-bold italic'>Chatify</p>
        </div>
        <h3 className='poppins-regular-new text-base text-[#C8BCF6] -mt-5 font-semibold'>Select a user to send message</h3>
      </div>

    </div>
  )
}

export default Home