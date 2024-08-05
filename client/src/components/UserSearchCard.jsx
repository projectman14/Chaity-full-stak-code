import React from 'react'
import Avatar from './Avatar'
import { Link } from 'react-router-dom'

const UserSearchCard = ({ user , onClose }) => {
    return (
        <Link to={'/'+user?._id} onClick={onClose} className='mt-4 flex rounded-xl pt-2 pl-2 hover:bg-[#070707] hover:bg-opacity-40 pb-2 cursor-pointer'>
            <div className='flex justify-center items-center'>
                <Avatar
                    width={30}
                    height={30}
                    name={user?.name}
                    imageUrl={user?.profile_pic}
                    userId={user?._id}
                />
            </div>
            <div className='flex flex-col'>
                <div className='poppins-regular text-xs text-white font-semibold mt-0 ml-4'>
                    {user?.name}
                </div>
                <div className='poppins-regular text-xs text-white font-semibold mt-2 ml-4'>
                    {user?.email}
                </div>
            </div>

        </Link>
    )
}

export default UserSearchCard