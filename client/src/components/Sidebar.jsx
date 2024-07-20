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


const Sidebar = () => {

    const user = useSelector(state => state?.user)
    const [updateUserOpen, setUpdateUserOpen] = useState(false)

    return (
        <div className="bg-[#000000] flex h-[100vh] w-[25vw] overflow-y-hidden" >
            <div className=' w-[4rem] bg-black flex flex-col items-center justify-between'>
                <img src={avatar} className='size-[3rem] mt-5' />
                <div className='flex flex-col items-center justify-center'>
                    <img src={search_2} className='size-[1.75rem]  hover:opacity-70 cursor-pointer' />
                    <img src={Home} className='size-[3rem] mt-1 hover:opacity-70 cursor-pointer' />
                    <img src={more} className='size-[3rem] -mt-0.5 hover:opacity-70 cursor-pointer' />
                </div>
                <div className='flex justify-center items-center flex-col '>
                    <div className='ml-2 cursor-pointer' title={user?.name} onClick={()=>setUpdateUserOpen(true)}><Avatar width={35} height={35} name={user?.name} imageUrl={user?.profile_pic}/></div>
                    <img src={logout} className='size-[1.75rem] mt-4 mb-5 hover:opacity-70 cursor-pointer' />
                </div>
            </div>


            {updateUserOpen && (
                // <h1 className='text-red-700'>Hello</h1>
                <UpdateUserDetails onClose={()=>setUpdateUserOpen(false)} prevUSerdata={user}/>
            )}
        </div>
    )
}

export default Sidebar