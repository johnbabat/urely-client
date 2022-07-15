import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useDataLayerValue } from '../../context/userContext'

const profile = () => {

    const apiURI = process.env.NEXT_PUBLIC_API_URL

    const [{ user }, dispatch] = useDataLayerValue()

    const [userDetails, setUser] = useState({
        firstName: user?.first_name,
        lastName: user?.last_name,
        email: user?.email,
        avatar: user?.avatar
    })

    useEffect(() => {
        setUser(prevState => ({
            ...prevState,
            firstName: user?.first_name,
            lastName: user?.last_name,
            email: user?.email,
            avatar: user?.avatar
        }))
    }, [user])
    

    const [passwords, setPasswords] = useState({
        password: '',
        confirm: ''
    })

    const [file, setFile] = useState<string | File>('')

    const [fileName, setFileName] = useState('')
    
    const [requestError, setRequestError] = useState('')
    
    const [passwordError, setPasswordError] = useState('')

    const [saveStatus, setStatus] = useState('')
    

    const onProfileEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRequestError('')
        if (e.target.files) {
            setFile(e.target.files[0])
            setFileName(e.target.files[0].name)
        } else {
            setUser({
                ...userDetails,
                [e.target.name]: e.target.value
            });
        }
    }

    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordError('')
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setRequestError('')

        const formData = new FormData();
        if (file) formData.append('file', file);
        if (userDetails.firstName && userDetails.lastName && userDetails.email) {
            formData.append('first_name', userDetails.firstName)
            formData.append('last_name', userDetails.lastName)
            formData.append('email', userDetails.email)
        } else {
            setRequestError('Missing field(s)')
            return
        }

        const response = await fetch(`${apiURI}/user/edit`, {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        .catch(() => {
            setRequestError('An error occured')
            return
        })
        if (response && response.status == 201) {
            const responseData = await response.json();
            console.log(responseData)
            let newAvatar = ''
            if (responseData.avatar) {
                newAvatar = responseData.avatar
            } else {
                if (user) newAvatar = user.avatar
            }
            const newUserData = {
                first_name: responseData.first_name,
                last_name: responseData.last_name,
                email: responseData.email,
                avatar: newAvatar
            }
            dispatch({
                type: 'LOGIN',
                payload: newUserData
            })
            localStorage.setItem('urrlUser', JSON.stringify(newUserData))
            return
        }
        if (response && response.status == 400) {
            const responseData = await response.json();
            setRequestError(responseData.error);
            return
        }
        setRequestError('An error occured!');
    }

    const onSubmitPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setPasswordError('')
        setStatus('')

        if (passwords.password != passwords.confirm) {
            setPasswordError('Passwords must match')
            return
        }

        const response = await fetch(`${apiURI}/user/change-password`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: passwords.password
                })
        })
        .catch(() => {
            setRequestError('An error occured')
            return
        })
        if (response && response.status == 201) {
            setStatus('Saved!')
            return
        }
        if (response && response.status == 400) {
            const responseData = await response.json();
            setPasswordError(responseData.error);
            return
        }
        setPasswordError('An error occured!');
    }

  return (
    <>
        <Header/>
        <div className="">
            <div className="flex flex-col gap-4 items-center text-center mt-12 pb-6">
                <img
                className="rounded-full h-64 w-64 border-4 border-slate-500"
                src={user?.avatar ? `data:image/jpeg;base64,${user?.avatar}` : '/default-avatar.jpg'}
                alt="user-profile"
                />
                <div>
                    <p className="font-semibold text-2xl text-gray-600 font-mono">{user?.first_name && user?.first_name.length > 15 ? user?.first_name[0] + '.':user?.first_name} {user?.last_name && user.last_name.length > 15 ? user?.last_name[0] + '.':user?.last_name} </p>
                    <p className="text-sm font-semibold text-gray-400"> {user?.email} </p>
                </div>
            </div>
            <div className="m-auto max-w-6xl p-3">
                <hr/>
            </div>
            <div className="flex flex-col items-center text-center mt-4 pb-6">
                <div className='col-span-12 text-center text-gray-500'>
                    <p className='font-mono font-semibold'>Account Settings</p>
                    <p className='font-mono text-sm'>Edit Details</p>
                </div>
            </div>
            <form onSubmit={onSubmitProfile} className='m-auto max-w-lg mb-9 p-3'>
                <div className='mb-5'>
                    <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 w-full md:max-w-xs rounded-md cursor-pointer inline-flex items-center">
                        <svg className='ml-4' fill="#FFF" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0h24v24H0z" fill="none"/>
                            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z"/>
                        </svg>
                        <span className='ml-2'>Change Profile Image</span>
                        <input onChange={onProfileEdit} name="avatar" type='file' className='cursor-pointer bg-black opacity-0  absolute w-full md:max-w-xs' id='avatar' />
                    </div>
                    <span className='ml-2'>{fileName}</span>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" onChange={onProfileEdit} value={userDetails.email} name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={onProfileEdit} value={userDetails.firstName} type="text" name="firstName" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input onChange={onProfileEdit} value={userDetails.lastName} type="text" name="lastName" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Changes</button>
                {
                    requestError && (
                    <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll mt-2 text-red-400'>
                        {requestError}
                    </p>
                    )
                }
            </form>
            

            <form onSubmit={onSubmitPassword} className='m-auto max-w-lg mb-9 p-3'>
                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={onChangePassword} type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input onChange={onChangePassword} type="password" name="confirm" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New password</label>
                </div>
                
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Password</button>
                <span className='pl-2 text-sm text-gray-500'>{saveStatus}</span>
                {
                    passwordError && (
                    <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll mt-2 text-red-400'>
                        {passwordError}
                    </p>
                    )
                }
            </form>
        </div>
    </>
  )
}

export default profile