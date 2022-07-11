import React, { useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsLink } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { useDataLayerValue } from '../context/userContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const UserProfile = ({setProfile} : { setProfile: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const apiURI = process.env.NEXT_PUBLIC_API_URL
    const router = useRouter()

    const [{user}, dispatch] = useDataLayerValue()

    const [userProfileData, setUserProfileData] = useState([
        {
          icon: <CgProfile />,
          title: 'My Profile',
          desc: 'Account Settings',
          iconColor: '#03C9D7',
          iconBg: '#E5FAFB',
          link: '/app/profile/'
        },
        {
          icon: <BsLink />,
          title: 'My Urls',
          desc: 'Personal Links',
          iconColor: '#3f3d42',
          iconBg: '#a6c1ef',
          link: '/app/urls/'
        },
        {
          icon: <HiOutlineDocumentText />,
          title: 'My Documents',
          desc: 'Create and Edit Docs',
          iconColor: 'rgb(255, 244, 229)',
          iconBg: 'rgb(254, 201, 15)',
          link: '/app/documents/'
        },
      ]);

    const logOut = async () => {
      const response = await fetch(`${apiURI}/auth/logout`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      .catch(() => {})
    
      if (response && response.status == 200) {
        localStorage.removeItem('urrlUser')
        dispatch({type:'LOGOUT'})
        router.push('/app/')
      }
    }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-7 rounded-lg w-88 z-50">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
            onClick={() => setProfile(false)}
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
          className="rounded-full w-8 h-8 border-2 border-slate-500"
          alt="user-profile"
          src={user?.avatar ? `data:image/jpeg;base64,${user.avatar}` : '/default-avatar.jpg'}
        />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{user?.first_name && user?.first_name.length > 15 ? user?.first_name[0] + '.':user?.first_name} {user?.last_name && user.last_name.length > 15 ? user?.last_name[0] + '.':user?.last_name} </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400"> {user?.email} </p>
        </div>
      </div>
      <div>
        {userProfileData.map((item, index) => (
          <Link key={index} href={item.link}>
            <div className="flex gap-3 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
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
          </Link>
        ))}
      </div>
      <div className="mt-3">
        <button onClick={logOut} className="p-3 w-full hover:drop-shadow-xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Logout
        </button>
      </div>
    </div>

  );
};

export default UserProfile;
