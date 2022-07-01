import React, { useState } from 'react'
import { FcLink } from "react-icons/fc";
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import UserProfile from './UserProfile';
import Link from 'next/link';

interface user {
  name: string
}

const Header = () => {

  const me = {
    name: 'John'
  }

  const [user, setUser] = useState<user | null>(null);
  const [isClicked, setIsClicked] = useState({
    userProfile: true
  })


  return (
    <div className='flex justify-between align-middle bg-white px-10 py-3 sticky top-0 z-50 mt-1'>
      <Link href='/app'>
        <div className="items-center gap-1.5 flex text-xl font-extrabold cursor-pointer">
          <FcLink /><span>Urrl</span>
        </div>
      </Link>
      <div className="flex">
        {user ?
        <>
          <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
          >
            <img
              className="rounded-full w-8 h-8"
              alt="user-profile"
              src="/avatar.png"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {user?.name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>
        {isClicked.userProfile && (<UserProfile/>)}
        </>
        :
          <div className='flex'>
            <Link href='/app/login'>
              <button
                type="button"
                className="py-2 px-4 mr-4 text-cyan-900 hover:text-cyan-700 rounded-lg"
              >
                Log In
              </button>
            </Link>
            <Link href='/app/register'>
              <button
                type="button"
                className="py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                Register
              </button>
            </Link>
          </div>
        }
        
      </div>
    </div>
  )
}

export default Header