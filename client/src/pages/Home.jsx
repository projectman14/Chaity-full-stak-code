import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from '../../public/Logo.png'
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

      if (response.data.logout) {
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

  return (
    <div className='flex bg-black'>
      <section>
        <Sidebar />
      </section>

      <section className={`${basePath && 'hidden'} w-[100%]`}>
        <Outlet />
      </section>

      <div className='flex flex-col justify-center items-center w-[100%]'>
        <div className='flex mb-8'>
          <img src={logo} className='h-[1.5rem] w-[1.5rem] ' />
          <p className='text-white poppins-regular ml-3 text'>Chatify</p>
        </div>
      </div>

    </div>
  )
}

export default Home