import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { BsLink } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg'
import { HiOutlineDocumentText } from 'react-icons/hi'

const UserProfile = () => {

    const [userProfileData, setUserProfileData] = useState([
        {
          icon: <CgProfile />,
          title: 'My Profile',
          desc: 'Account Settings',
          iconColor: '#03C9D7',
          iconBg: '#E5FAFB',
        },
        {
          icon: <BsLink />,
          title: 'My Urls',
          desc: 'Personal Links',
          iconColor: '#3f3d42',
          iconBg: '#a6c1ef',
        },
        {
          icon: <HiOutlineDocumentText />,
          title: 'My Notes',
          desc: 'Notes and Documents',
          iconColor: 'rgb(255, 244, 229)',
          iconBg: 'rgb(254, 201, 15)',
        },
      ]);

    const [user, setUser] = useState({
        firsName: 'John',
        lastName: 'Babatola',
        email: 'johnbabatola@gmail.com'
    })

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-7 rounded-lg w-88 z-50">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
            type='button'
            style={{color:"rgb(153, 171, 180)"}}
            className={` text-2xl p-3 hover:drop-shadow-xl hover:bg-$light-gray`}
            color="rgb(153, 171, 180)"
        >
            {<MdOutlineCancel />}
        </button>
      </div>
      <div className="flex gap-4 items-center mt-3 pb-6">
        <img
          className="rounded-full h-24 w-24"
          src='/avatar.png'
          alt="user-profile"
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{user.firsName.length > 15 ? user.firsName[0] + '.':user.firsName} {user.lastName.length > 15 ? user.lastName[0] + '.':user.lastName} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <div key={index} className="flex gap-3 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className=" text-xl rounded-lg p-3 hover:bg-light-gray"
            >
              {item.icon}
            </button>

            <div>
              <p className="font-semibold dark:text-gray-200 ">{item.title}</p>
              <p className="text-gray-500 text-sm dark:text-gray-400"> {item.desc} </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="p-3 w-full hover:drop-shadow-xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
