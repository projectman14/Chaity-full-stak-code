import purpleblack from '../../public/purpleblack.png'
import logo from '../../public/Logo.png'
import googlelogo from '../../public/google-icon.png'
import githublogo from '../../public/logogithub.png'
import { Link , useNavigate} from 'react-router-dom';

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { useState, useEffect } from 'react';

import { profileUrl } from '../appwrite/appwrite.js';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('#steps', {
      y: 400,
      duration: 1,
      ease: 'bounce'
    })

    tl.from('#user-sign-up-step', {
      opacity: 0,
      duration: 0.25
    })

  }, [])

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    profile_pic: ''
  })

  const [uploadPhoto, setUploadPhoto] = useState('')
  const [uploadPhotoName, setUploadPhotoName] = useState('')
  const navigate = useNavigate()


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  const handleProfileSubmit = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
    if (file) {
      setUploadPhotoName(file.name);
    }
  };

  useEffect(() => {
    const updateProfilePic = async () => {
      if (uploadPhoto) {
        const url = await profileUrl(uploadPhoto);
        console.log(url);
        setData((prevData) => ({
          ...prevData,
          profile_pic: url,
        }));
      }
    };

    updateProfilePic();
  }, [uploadPhoto]);



  const handleSubmit = async () => {

    console.log(data);

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/register`;
    console.log(URL)

    try {
      const response = await axios.post(URL, data)
      console.log("response", response)

      toast.success(response.data.message)

      if (response.data.sucess) {
        setData({
          name: '',
          email: '',
          password: '',
          profile_pic: ''
        })

        navigate('/email')
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
        <div className='-mt-[55%]' id='steps'>
          <div className='flex flex-col items-center'>
            <div className='flex mb-8'>
              <img src={logo} className='h-[1rem] w-[1rem] mt-[0.25rem]' />
              <p className='text-white poppins-regular ml-3'>Chatify</p>
            </div>

            <h3 className='poppins-bold text-4xl mb-3'>Get Started with Us</h3>

            <p className='poppins-thin text-sm text-center mb-6'>Complete these easy steps to register<br></br> your account</p>

            <div className='h-[3rem] w-[15rem] bg-white rounded-xl flex'>
              <div className='h-5 w-5 bg-black ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center'>
                <p className='text-white text-xs poppins-regular-new'>1</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4'>Sign up your account</p>
            </div>

            <div className='h-[3rem] w-[15rem] bg-[#222222] rounded-xl flex mt-5'>
              <div className='h-5 w-5 bg-[#454546] ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center'>
                <p className='text-white text-xs poppins-regular-new'>2</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4 text-white'>Set up your workspace</p>
            </div>

            <div className='h-[3rem] w-[15rem] bg-[#222222] rounded-xl flex mt-5'>
              <div className='h-5 w-5 bg-[#454546] ml-5 mt-[0.90rem] rounded-[100%] flex justify-center items-center'>
                <p className='text-white text-xs poppins-regular-new'>3</p>
              </div>

              <p className='poppins-thin-btn text-xs mt-[1rem] ml-4 text-white'>Set up your profile</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/2 flex flex-col items-center" id='user-sign-up-step'>
        <div className='flex flex-col items-center mx-10 mt-[6rem]'>
          <h3 className='poppins-bold text-2xl font-medium mb-3'>Sign Up Account</h3>
          <p className='text-xs poppins-thin opacity-100 text-[#e5e2e2]'>Enter your personal data to create your account.</p>

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

        <div className='flex flex-col -mt-[0.5rem]'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <label className='label-tag text-white text-sm mb-1 ml-[0.10rem]' htmlFor="first-name">First Name</label>
              <input type='text' id='name' name="name" value={data.name} className='bg-[#222222] w-[11rem] h-[3rem] rounded-lg focus:outline-none text-white pl-2 text-sm' placeholder='First Name' onChange={handleOnChange} />
            </div>

            <div className='flex flex-col ml-[5rem]'>
              <p className='label-tag text-white text-sm mb-1 ml-[0.10rem]'>Profile Pic</p>
              <label htmlFor='profile_pic' className='cursor-pointer'>
                <div className='bg-[#222222] w-[11rem] h-[3rem] rounded-lg focus:outline-none text-white pl-2 text-sm flex justify-center items-center'>
                  <p className=''>{uploadPhotoName ? uploadPhotoName : 'Uplaod Profile Photo'}</p>
                </div>
              </label>

              <input type='file' id='profile_pic' name='profile_pic' className='hidden' onChange={handleProfileSubmit} />
            </div>
          </div>

          <div className='flex flex-col mt-8'>
            <label className='label-tag text-white text-sm mb-1 ml-[0.10rem]' htmlFor='email'>Email</label>
            <input type='text' id='email' name='email' value={data.email} className='bg-[#222222] w-[27rem] h-[3rem] rounded-lg pl-2 text-sm focus:outline-none text-white' placeholder='xyz@example.com' onChange={handleOnChange} />
          </div>

          <div className='flex flex-col mt-8'>
            <label className='label-tag text-white text-sm mb-1 ml-[0.10rem]' htmlFor='password'>Password</label>
            <input type='password' id='password' name='password' value={data.password} className='bg-[#222222] w-[27rem] h-[3rem] rounded-lg pl-2 text-sm focus:outline-none text-white' placeholder='******' onChange={handleOnChange} />
          </div>

          <button className='w-[27rem] h-[3rem] bg-white rounded-lg mt-8 poppins-sign-up-btn text-lg' onClick={handleSubmit}>Sign Up</button>

          <div className='flex items-center justify-center mt-3'>
            <p className='poppins-thin text-xs'>Already have an account?</p>
            <p className='poppins-bold font-normal text-xs'><Link to={'/email'}>Login</Link></p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default RegisterPage
