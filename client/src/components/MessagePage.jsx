import React, { useState } from 'react'
import { useEffect , useRef} from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { FaPlus } from "react-icons/fa";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { profileUrl } from '../appwrite/appwrite.js';
import { IoClose } from "react-icons/io5";
import Loader from './Loader.jsx'
import { IoMdSend } from "react-icons/io";
import moment from 'moment'

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
  const [imageUrl, setImageUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const [loading, setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef(null)

  useEffect(()=>{
    if(currentMessage.current){
        currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
},[allMessage])
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
        setLoading(true)
        const url = await profileUrl(uploadPhoto);
        console.log(url);
        setLoading(false)
        setImageUrl(url);
        setOpenImageVideoUpload(false)

        setMessage(prev => {
          return {
            ...prev,
            imageUrl: url
          }
        })
      }
    };

    updateProfilePic();
  }, [uploadPhoto]);

  const handleClearUploadImage = () => {
    setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }

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
        setLoading(true)
        const url = await profileUrl(videoUpload);
        console.log(url);
        setLoading(false)
        setVideoUrl(url);
        setOpenImageVideoUpload(false)

        setMessage(prev => {
          return {
            ...prev,
            videoUrl: url
          }
        })
      }
    };

    updateVideo();
  }, [videoUpload]);

  const handleClearUploadVideo = () => {
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId)

      socketConnection.on('message-user', (data) => {
        // console.log("USer Details", data)
        setDataUser(data)
      })

      socketConnection.on('message', (data) => {
        console.log(data)
        setAllMessage(data)
      })
    }
  }, [socketConnection, params.userId, user])


  const handleOnChange = (e) => {
    const { name, value } = e.target

    setMessage(preve => {
      return {
        ...preve,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId: user?._id
        })
        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: ""
        })
      }
    }
  }

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
      <section className='h-[calc(100vh-8rem)] bg-black overflow-x-hidden overflow-y-scroll'>

        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
                  <div className='w-full relative'>
                    {
                      msg?.imageUrl && (
                        <img
                          src={msg?.imageUrl}
                          className='w-full h-full object-scale-down'
                        />
                      )
                    }
                    {
                      msg?.videoUrl && (
                        <video
                          src={msg.videoUrl}
                          className='w-full h-full object-scale-down'
                          controls
                        />
                      )
                    }
                  </div>
                  <p className='px-2'>{msg.text}</p>
                  <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>

        {/**upload Image display */}
        {
          message.imageUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadImage}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <img
                  src={message.imageUrl}
                  alt='uploadImage'
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {/**upload video display */}
        {
          message.videoUrl && (
            <div className='w-full h-full sticky bottom-0 bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-0 right-0 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <video
                  src={message.videoUrl}
                  className='aspect-square w-full h-full max-w-sm m-2 object-scale-down'
                  controls
                  muted
                  autoPlay
                />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
              <Loader />
            </div>
          )
        }
      </section>

      {/** send the message */}
      <section className='bg-black flex items-center px-4'>
        <div className='flex justify-center items-center w-16 h-16 rounded-full hover:opacity-80 cursor-pointer'>
          <button onClick={() => { setOpenImageVideoUpload(prev => !prev) }}>
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

        <form className='h-full w-full flex' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type here message...'
            className='py-1 px-4 outline-none w-full h-full bg-black text-white'
            value={message.text}
            onChange={handleOnChange}
          />
          <button className='text-white mr-4 hover:opacity-80'>
            <IoMdSend size={24} />
          </button>
        </form>
      </section>
    </div>
  )
}

export default MessagePage