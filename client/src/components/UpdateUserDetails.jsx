import purpleblack from '../../public/purpleblack.png'
import logo from '../../public/Logo.png'
import googlelogo from '../../public/google-icon.png'
import githublogo from '../../public/logogithub.png'
import { Link, useNavigate } from 'react-router-dom';

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { useState, useEffect } from 'react';

import { profileUrl } from '../appwrite/appwrite.js';
import axios from 'axios'
import toast from 'react-hot-toast';
import Avatar from './Avatar.jsx';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice.js';

const UpdateUserDetails = ({ onClose, prevUSerdata }) => {

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from('#updateBox' , {
            opacity : 0,
            y : -800,
            duration : 1
        })

        tl.from('#steps', {
            y: 800,
            duration: 0,
            ease: 'bounce'
        })

    }, [])

    const [data, setData] = useState({
        name : prevUSerdata?.name,
        profile_pic: prevUSerdata?.profile_pic
    })

    const [uploadPhoto, setUploadPhoto] = useState('')
    const [uploadPhotoName, setUploadPhotoName] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()


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

        try {
            const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/update-user`;
            const reponse = await axios({
                method : 'post',
                url : URL,
                data : data,
                withCredentials : true
            })

            console.log(reponse)

            toast.success(reponse?.data?.message)

            if(reponse.data.success){
                dispatch(setUser(reponse.data.data))
                onClose();
            }
        } catch (err) {
            toast.error(err?.reponse?.data?.message)
        }
    }



    return (
        <div className="bg-black flex h-[60vh] w-[22vw] fixed top-[20%] left-[40%] rounded-2xl flex-col" id='updateBox'>
            <div id='steps' className='mt-5'>
                <div className='flex flex-col items-center'>
                    <div className='flex mb-8'>
                        <img src={logo} className='h-[1rem] w-[1rem] mt-[0.25rem]' />
                        <p className='text-white poppins-regular ml-3'>Chatify</p>
                    </div>
                </div>
                <div className='flex justify-center flex-col items-center'>
                    <Avatar width={70} height={70} name={prevUSerdata?.name} imageUrl={data.profile_pic} />
                    <h3 className='poppins-regular-new text-white text-sm mt-2'>{prevUSerdata?.name}</h3>
                </div>

                <div className='flex flex-col items-center justify-around mt-5'>

                    <div className='flex flex-col mt-5'>
                        <p className='label-tag text-white text-sm mb-1 ml-[2.5rem]'>Change Photo</p>
                        <label htmlFor='profile_pic' className='cursor-pointer'>
                            <div className='bg-[#222222] w-[11rem] h-[3rem] rounded-lg focus:outline-none text-white pl-2 text-sm flex justify-center items-center'>
                                <p className=''>{'Uplaod Profile Photo'}</p>
                            </div>
                        </label>

                        <input type='file' id='profile_pic' name='profile_pic' className='hidden' onChange={handleProfileSubmit} />
                    </div>

                    <button className='w-[10rem] h-[2rem] bg-white rounded-lg mt-16 poppins-sign-up-btn text-lg' onClick={handleSubmit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateUserDetails