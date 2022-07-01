import React, { useEffect, useState } from 'react';
import { convertToRaw, EditorState, convertFromHTML, ContentState } from 'draft-js';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { EditorProps } from 'react-draft-wysiwyg';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Header from '../../../components/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaRegCopy } from 'react-icons/fa';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  );

export async function getServerSideProps({ params }: { params: { id: string } }) {
const apiURI = process.env.API_URL

const response = await fetch(
    `${apiURI}/document/id/${params.id}`, {
    headers: {
        'Content-Type': 'application/json'
        }
    }
)
.catch(() => {})

return {
    props: {
        id: "3",
        title: "my title",
        htmlText: "<p>This is text</p>",
        sharing: ["johnbabatola@gmail.com"],
        isPrivate: true,
        apiURI: apiURI
    }
}

// if (response && response.status == 200) {
//     const responseData = await response.json()
//     return {
//         props: {
//             id: responseData.id,
//             title: responseData.title,
//             htmlText: responseData.html_text,
//             sharing: responseData.users_sharing,
//             private: responseData.private
//             apiURI: apiURI
//         }
//     }
// } else {
//     return {
//         notFound: true
//         }
//     }
}

const document = ({ id, title, htmlText, sharing, isPrivate, apiURI }: {id: string, title: string, htmlText: string, sharing: string[], isPrivate: boolean, apiURI: string}) => {

    const [documentInfo, setDocumentInfo] = useState({
        id: id,
        title: title,
        htmlText: htmlText
    });

    const [saveStatus, setSaveStatus] = useState('')

    const [usersSharing, setUsersSharing] = useState(sharing);

    const [requestError, setRequestError] = useState('');

    const [sharingError, setSharingError] = useState('');

    const [newUser, setNewUser] = useState('');

    const [sharelink, setShareLink] = useState('');

    const [copied, setCopied] = useState('opacity-0');

    const [docPrivate, setPrivate] = useState(isPrivate);

    useEffect(() => {
      setShareLink(window.location.href);
    }, [])
    

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSaveStatus('')
        setRequestError('')
        setDocumentInfo({
            ...documentInfo,
            [e.target.name]: e.target.value
            });
    }

    const [description, setDescription] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState: EditorState) => {
        setSaveStatus('')
        setRequestError('')
        setDescription(editorState);
    }

    const saveDocument = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.persist();

        let plainText = description.getCurrentContent().getPlainText();
        if (!plainText) {
            setRequestError('Document body required!');
            return
        }
        const response = await fetch(`${apiURI}/document/edit`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: documentInfo.title,
                html_text: draftToHtml(convertToRaw(description.getCurrentContent())),
                plain_text: plainText,
                is_private: docPrivate
                })
        })
        .catch(() => {
            setRequestError('An Error occured!');
            setSaveStatus('Save failed!');
            return
        })

        if (response && response.status == 201) {
            setSaveStatus('Saved!');
            const responseData = await response.json();
            window.location.href = `id/${responseData.id}`;
            return
        }
        if (response && response.status == 400) {
            const responseData = await response.json();
            setSaveStatus('Save failed!');
            setRequestError(responseData.error);
            return
        }
        setSaveStatus('Save failed!');
        setRequestError('An error occured!');
    }

    const handleNewUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(event.target.value)
        setSharingError('')
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(sharelink);
        setCopied('opacity-100')
        setTimeout(() => {
            setCopied('opacity-0')
        }, 1000);
    }

    const addUser = async () => {
        if (!newUser) return

        const response = await fetch(`${apiURI}/document/edit/sharing`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                user_email: newUser,
                add_user: true
                })
        })
        .catch(() => {
            setSharingError("Could not add user!");
            return
        })

        if (response && response.status == 201) {
            setUsersSharing([...usersSharing, newUser])
            return
        }
        if (response && response.status == 400) {
            const responseData = await response.json();
            setSharingError(responseData.error);
            return
        }
        setSharingError("could not add user!")
    }


    const removeUser = async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
        event.preventDefault();

        const response = await fetch(`${apiURI}/document/edit/sharing`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                user_email: event.target.name,
                add_user: false
                })
        })
        .catch(() => {
            setSharingError("Could not remove user!");
            return
        })

        if (response && response.status == 201) {
            setUsersSharing(prevState => (prevState.filter(email => email != event.target.name)))
            return
        }
        if (response && response.status == 400) {
            const responseData = await response.json();
            setSharingError(responseData.error);
            return
        }
        setSharingError("could not remove user!")
    }
    

  return (
    <>
        <Header />
        <div className="p-4 sm:p-10 md:p-14 max-w-6xl m-auto">
            <div className="border-2 border-gray-200 rounded-md p-4 sm:p-8">
                <form onSubmit={saveDocument}>
                    <h3 className="font-bold text-xl mb-1">Create Document</h3>
                    <label htmlFor="default-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" id="default-toggle" onChange={() => setPrivate(!docPrivate)} value="" className="sr-only peer" checked={docPrivate}/>
                        <div className="w-7 h-4 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-blue-300 after:content-[''] after:absolute after:top-[3px] after:left-[1px] after:bg-white after:border-black after:border after:rounded-full after:h-3.5 after:w-3.5 after:transition-all border-black peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">Private</span>
                    </label>
                    <div className='mt-2'>
                        <div>
                            <label> Title <span className="text-red-500"> * </span> </label>
                            <input className="block bg-gray-100 rounded-md w-full my-2 p-2" type="text" name="title" value={documentInfo.title} onChange={onChangeValue} placeholder="Title" required />
                        </div>
                        <div>
                            <div className='mb-2'><label>Body<span className="text-red-500"> * </span> </label></div>
                            <Editor
                                editorState={description}
                                toolbarClassName=""
                                wrapperClassName=""
                                editorClassName="bg-gray-100 rounded-md min-h-102 max-h-102 px-3 focus-within:border-blue-500 focus-within:border-2"
                                onEditorStateChange={onEditorStateChange}
                            />
                        </div>
                        <div className="mt-3">
                            <button className="px-6 py-2 w-auto hover:drop-shadow-xl bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Save
                            </button>
                            <span className='pl-2 text-sm text-gray-500'>{saveStatus}</span>
                        </div>
                        {
                            requestError && (
                            <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll mt-2 text-red-400'>
                                {requestError}
                            </p>
                            )
                        }
                    </div> 
                </form>
                <div className='font-mono text-sm mt-4'>
                    <div className='bg-gray-200 border-2 border-gray-300 max-h-28 p-2 max-w-xxs rounded-md mb-1 overflow-scroll flex items-center'>
                        <button onClick={handleCopy} className='mr-2'><FaRegCopy /></button>
                        {sharelink}
                    </div>
                    <div className={`flex text-xs cursor-default items-center mb-1 ${copied} transition ease-in duration-500`}><AiOutlineCheckCircle className='mr-2' fill='green' /> Copied to clipboard.</div>
                    Shared With:
                    <div className='max-w-xxs w-full'>
                        <input onChange={e => handleNewUser(e)} value={newUser} className="bg-gray-100 rounded-md my-2 p-2 pr-8" type="text" name="share" placeholder="Enter user email" required />
                        <button onClick={addUser} className='border-2 border-gray-300 bg-gray-100 rounded-md px-2 mb-2 ml-2'>+</button>
                    </div>
                    {
                        sharingError && (
                            <p className='p-2 bg-red-200 rounded-md mb-4 overflow-scroll mt-2 max-w-xxs text-red-400'>
                                {sharingError}
                            </p>
                        )
                    }
                    {
                        usersSharing.length > 0 && (
                            <div className='bg-gray-200 border-2 border-gray-300 max-h-28 p-2 max-w-xxs rounded-md overflow-scroll'>
                                {
                                    usersSharing.map(userEmail => (
                                        <p key={userEmail}><RiDeleteBin6Line name={userEmail} onClick={(e) => removeUser(e)} className='inline cursor-pointer' /> {userEmail}</p>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default document