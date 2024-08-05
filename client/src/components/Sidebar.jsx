import React, { useState } from 'react'
import avatar from '../../public/avatar.png'
import search from '../../public/Seach.png'
import Home from '../../public/Home.png'
import more from '../../public/more.png'
import logout from '../../public/logot.png'
import search_2 from '../../public/search-2.png'
import Avatar from './Avatar.jsx'
import { useSelector } from 'react-redux'
import UpdateUserDetails from './UpdateUserDetails.jsx'
import SearchUser from './SearchUser.jsx'
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {

    const navigate = useNavigate()

    const user = useSelector(state => state?.user)
    const [updateUserOpen, setUpdateUserOpen] = useState(false)
    const [allUserData, setAllUserData] = useState([])
    const [openSearchUser, setOpenSearchUser] = useState(false)

    const placeholders = [
        "Whom you are searching ?",
        "Search by email",
        "Search by name"
    ];

    return (
        <div className="bg-[#000000] flex h-[100vh] w-[25vw] overflow-y-hidden" >
            <div className=' w-[4rem] bg-black flex flex-col items-center justify-between '>
                <img src={avatar} className='size-[3rem] mt-5' />
                <div className='flex flex-col items-center justify-center'>
                    <img src={search_2} className='size-[1.75rem]  hover:opacity-70 cursor-pointer' onClick={() => setOpenSearchUser(true)} />
                    <img src={Home} className='size-[3rem] mt-1 hover:opacity-70 cursor-pointer' onClick={() => navigate('/') }/>
                    <img src={more} className='size-[3rem] -mt-0.5 hover:opacity-70 cursor-pointer' />
                </div>
                <div className='flex justify-center items-center flex-col '>
                    <div className='ml-2 cursor-pointer' title={user?.name} onClick={() => setUpdateUserOpen(true)}><Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic}/></div>
                    <img src={logout} className='size-[1.75rem] mt-4 mb-5 hover:opacity-70 cursor-pointer' />
                </div>
            </div>

            <div className='bg-black w-full flex flex-col'>
                <div className='w-full bg-black'>
                    <h3 className='poppins-regular text-[#fff] font-bold text-xl italic p-5'>Messages</h3>
                </div>

                {/* <div className='h-[0.01rem] w-full bg-[#c8bcf6ad]'/> */}

                <div className='bg-black w-full overflow-y-auto h-full scrollbar'>
                    {
                        allUserData.length === 0 && (
                            <div className='flex flex-col items-center justify-center h-full -mt-[10%]'>
                                <div className='flex w-full justify-center items-center'>
                                    <img src={search_2} className='size-[1.75rem] ' />
                                </div>
                                <p className='poppins-regular mt-1 text-[#C8BCF6] text-sm italic font-semibold'>Explore users to start conversation</p>
                            </div>
                        )
                    }
                </div>
            </div>


            {updateUserOpen && (
                // <h1 className='text-red-700'>Hello</h1>
                <UpdateUserDetails onClose={() => setUpdateUserOpen(false)} prevUSerdata={user} />
            )}

            {
                openSearchUser && (
                    <div className="top-0 left-0 right-0 bottom-0 fixed mx-auto  w-full bg-slate-700 bg-opacity-20">
                        <SearchUser
                            placeholders={placeholders}
                            onClose={() => setOpenSearchUser(false)}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default Sidebar