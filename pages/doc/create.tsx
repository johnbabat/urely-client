import React, { useState } from 'react';
import { convertToRaw, EditorState, convertFromHTML, ContentState } from 'draft-js';
import dynamic from 'next/dynamic';
import draftToHtml from 'draftjs-to-html';
import { EditorProps } from 'react-draft-wysiwyg';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Header from '../../components/Header';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Editor = dynamic<EditorProps>(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  );


const Create = () => {

    const apiURI = process.env.NEXT_PUBLIC_API_URL

    const [documentInfo, setDocumentInfo] = useState({
        title: '',
    });

    const [saveStatus, setSaveStatus] = useState('');

    const [requestError, setRequestError] = useState('');

    const [docPrivate, setPrivate] = useState(false);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement> ) => {
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
        console.log('editor - ', editorState)
        // console.log('prev - ', editorState.getCurrentContent())
        console.log('up - ', draftToHtml(convertToRaw(editorState.getCurrentContent())));
        console.log('down - ', convertFromHTML(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
        let pasd = EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(draftToHtml(convertToRaw(editorState.getCurrentContent())))))
        console.log('exp - ', pasd)
        console.log('final - ', draftToHtml(convertToRaw(pasd.getCurrentContent())))
    }
    
    const addDetails = async (event: React.FormEvent<HTMLFormElement>) => {
        setSaveStatus('Saving...')
        setRequestError('')
        event.preventDefault();
        event.persist();
        
        const response = await fetch(`${apiURI}/document/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: documentInfo.title,
                html_text: draftToHtml(convertToRaw(description.getCurrentContent())),
                plain_text: description.getCurrentContent().getPlainText()
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
    

  return (
    <>
        <Header />
        <div className="p-4 sm:p-10 md:p-14 max-w-6xl m-auto">
            <div className="border-2 border-gray-200 rounded-md p-4 sm:p-8">
                <form onSubmit={addDetails}>
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
                            <div className='mb-2'><label> Body <span className="text-red-500"> * </span> </label></div>
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
            </div>
        </div>
    </>
  )
}

export default Create