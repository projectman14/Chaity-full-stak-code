import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { profileUrl } from '../appwrite/appwrite.js';

const MessagePage = () => {

  const params = useParams()
  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: '',
    emal: '',
    profile_pic: '',
    online: false,
    _id: ''
  })

  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false)
  const [uploadPhoto, setUploadPhoto] = useState('')
  const [uploadPhotoName, setUploadPhotoName] = useState('')
  const [videoUpload, setvideoUpload] = useState('')
  const [videoUploadName, setvideoUploadName] = useState('')
  const [imageUrl , setImageUrl] = useState('')
  const [videoUrl , setVideoUrl] = useState('')
  const [message , setMessage] = useState({
    text : "",
    imageUrl : "",
    videoUrl : ""
  })
  // console.log(params)

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
            setImageUrl(url);

            setMessage(prev => {
              return{
                ...prev,
                imageUrl : url
              }
            })
        }
    };

    updateProfilePic();
}, [uploadPhoto]);

const handleVideoSubmit = (e) => {
  const file = e.target.files[0];
  setvideoUpload(file);
  console.log(file)
  if (file) {
      setvideoUploadName(file.name);
  }
};

useEffect(() => {
  const updateVideo = async () => {
      if (videoUpload) {
          const url = await profileUrl(videoUpload);
          console.log(url);
          setVideoUrl(url);

          setMessage(prev => {
            return{
              ...prev,
              videoUrl : url
            }
          })
      }
  };

  updateVideo();
}, [videoUpload]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.on('message-user', (data) => {
        // console.log("USer Details", data)
        setDataUser(data)
      })
    }
  }, [socketConnection, params.userId, user])
  return (
    <div className='w-full bg-white h-full'>
      <header className='sticky top-0 h-16 bg-black flex'>
        <div className='flex pt-2.5 ml-4'>
          <Avatar
            width={45}
            height={45}
            imageUrl={dataUser?.profile_pic}
            name={dataUser?.name}
            userId={dataUser?._id}
          />
        </div>
        <div className='pt-3.5 ml-5'>
          <h3 className='text-white poppins font-semibold text-sm'>{dataUser?.name}</h3>
          <p className='text-white poppins italic text-xs'>
            {
              dataUser.online ? <span className='text-green-600'>online</span> : 'offline'
            }
          </p>
        </div>
      </header>

      {/**show all messages here */}
      <section className='h-[calc(100vh-8rem)] bg-red-500 overflow-x-hidden overflow-y-scroll'>
        show all messages
      </section>

      {/** send the message */}
      <section className='bg-black flex items-center px-4'>
        <div className='flex justify-center items-center w-16 h-16 rounded-full hover:opacity-80 cursor-pointer'>
          <button onClick={() => {setOpenImageVideoUpload(prev => !prev)}}>
            <FaPlus className='text-white' />
          </button>

          {openImageVideoUpload && (
            <div className='bg-black shadow rounded absolute bottom-14 w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-[#211919] cursor-pointer'>
                  <div className='text-white'>
                    <FaImage size={18} />
                  </div>
                  <p className='text-white'>Image</p>
                </label>
                <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-[#211919] cursor-pointer'>
                  <div className='text-purple-500'>
                    <FaVideo size={18} />
                  </div>
                  <p className='text-white'>Video</p>
                </label>

                <input
                  type='file'
                  id='uploadImage'
                  onChange={handleProfileSubmit}
                  className='hidden'
                />

                <input
                  type='file'
                  id='uploadVideo'
                  onChange={handleVideoSubmit}
                  className='hidden'
                />
              </form>
            </div>
          )}


        </div>
      </section>
    </div>
  )
}

export default MessagePage