import purpleblack from '../../public/purpleblack.png'
import logo from '../../public/Logo.png'
import googlelogo from '../../public/google-icon.png'
import githublogo from '../../public/logogithub.png'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';

const CheckPasswordPage = () => {

  useGSAP(() => {

    var tl = gsap.timeline();

    gsap.to('#step-1', {
      backgroundColor: '#222222',
      duration: 1
    })

    gsap.to('#step-1-div', {
      backgroundColor: '#454546',
      duration: 1
    })

    gsap.to('#step-1-para', {
      color: '#ffffff',
      duration: 1
    })

    gsap.to('#step-2', {
      backgroundColor: '#ffffff',
      duration: 1.5
    })

    gsap.to('#step-2-div', {
      backgroundColor: '#000000',
      duration: 1.5
    })

    gsap.to('#step-2-para', {
      color: '#000000',
      duration: 1.5
    })

    tl.from('#login-btn', {
      y: -80,
      duration: 1,
      ease: 'bounce'
    })

    tl.from('#password-div', {
      opacity: 0,
      duration: 1
    })
  }, [])

  const [data, setData] = useState({
    password: ''
  })



  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  console.log("location : ", location)

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleLogin = async () => {
    console.log(data)

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/password`;

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId: location?.state?.data?._id,
          password: data.password
        },
        withCredentials: true
      })
      console.log("response", response)

      toast.success(response.data.message)

      if (response.data.success) {
        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)

        setData({
          password: ''
        })

        navigate('/')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message)
      console.log(err)
    }
  }


  return (
    <div className="bg-black flex h-[100vh]">
      <div className="w-1/2 overflow-y-hidden mt-2 ml-2">
        <img src={purpleblack} className='h-full w-full rounded-2xl overflow-y-hidden' />
        <div className='-mt-[55%]'>
          <div className='flex flex-col items-center'>
            <div className='flex mb-8'>
              <img src={logo} className='h-[1rem] w-[1rem] mt-[0.25rem]' />
              <p className='text-white poppins-regular ml-3'>Chatify</p>
            </div>

            <h3 className='poppins-bold text-4xl mb-3'>Get Started with Us</h3>

            <p className='poppins-thin text-sm text-center mb-6'>Complete these easy steps to register<br></br> your account</p>

            <div className='h-[3rem] w-[15rem] bg-white rounded-xl flex' id='step-1'>
              <div className='h-5 w-5 bg-black ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center' id='step-1-div'>
                <p className='text-white text-xs poppins-regular-new'>1</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4' id='step-1-para'>Login your account</p>
            </div>

            <div className='h-[3rem] w-[15rem] bg-[#222222] rounded-xl flex mt-5' id='step-2'>
              <div className='h-5 w-5 bg-[#454546] ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center' id='step-2-div'>
                <p className='text-white text-xs poppins-regular-new'>2</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4 text-white' id='step-2-para'>Enter the password</p>
            </div>

            <div className='h-[3rem] w-[15rem] bg-[#222222] rounded-xl flex mt-5'>
              <div className='h-5 w-5 bg-[#454546] ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center'>
                <p className='text-white text-xs poppins-regular-new'>3</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4 text-white'>Enjoy Chatting</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 flex flex-col items-center">
        <div className='flex flex-col items-center mx-10 mt-[6rem]'>
          <h3 className='poppins-bold text-2xl font-medium mb-3'>Login Account</h3>
          <p className='text-xs poppins-thin opacity-100 text-[#e5e2e2]'>Enter your Email to login your account.</p>

          <div className='flex justify-between mt-5 mb-6'>
            <div className='h-[2.75rem] w-[10rem] border-[1px] border-[#474646] rounded-xl flex items-center justify-center'>
              <img src={googlelogo} className='w-[0.9rem] h-[0.9rem]' />
              <p className='text-white ml-2 sign-btn'>Google</p>
            </div>

            <div className='h-[2.75rem] w-[10rem] border-[1px] border-[#474646] rounded-xl flex items-center justify-center ml-10'>
              <img src={githublogo} className='w-[0.9rem] h-[0.9rem]' />
              <p className='text-white ml-2 sign-btn'>GitHub</p>
            </div>

          </div>

          <div className='flex mt-5 mb-8 mx-16'>
            <hr className='border-[1px] border-[#252525] w-[12rem]'></hr>
            <p className='mx-5 text-white -mt-3 text-sm poppins-thin'>Or</p>
            <hr className='border-[1px] border-[#252525] w-[12rem]'></hr>
          </div>
        </div>

        <div className='flex flex-col items-center'>
          <Avatar width={70} height={70} name={location?.state?.data?.name} imageUrl={location?.state?.data?.profile_pic} />
          <h3 className='poppins-regular-new text-white text-sm mt-2'>{location?.state?.data?.name}</h3>
        </div>

        <div className='flex flex-col -mt-[0.5rem]'>

          <div className='flex flex-col mt-2'>
            <label className='label-tag text-white text-sm mb-1 ml-[0.10rem]' htmlFor='email' >Email</label>
            <input type='text' id='email' disabled value={location?.state.data?.email} name='email' className='bg-[#222222] w-[27rem] h-[3rem] rounded-lg pl-2 text-sm focus:outline-none text-white' placeholder='xyz@example.com' />
          </div>

          <div className='flex flex-col mt-8' id='password-div'>
            <label className='label-tag text-white text-sm mb-1 ml-[0.10rem]' htmlFor='password'>Password</label>
            <input type='password' onChange={handleOnChange} id='password' name='password' value={data.password} className='bg-[#222222] w-[27rem] h-[3rem] rounded-lg pl-2 text-sm focus:outline-none text-white' placeholder='******' />
          </div>

          <button id='login-btn' className='w-[27rem] h-[3rem] bg-white rounded-lg mt-8 poppins-sign-up-btn text-lg' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>

  )
}

export default CheckPasswordPage