import React,{useState} from 'react';
import { EditorState, convertToRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Add() {
    const [userInfo, setuserInfo] = useState({
        title: '',
    });
    const onChangeValue = (e) => {
     setuserInfo({
        ...userInfo,
        [e.target.name]:e.target.value
        });
    } 
  
    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }
  
    const [isError, setError] = useState(null);
    const addDetails = async (event) => {

        event.preventDefault();
        event.persist();
        const response = await fetch(`http://localhost:5000/document/create`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: userInfo.title,
                description: userInfo.description.value
                })
        })
        .catch((error) => { throw error })

        if (response && response.status == 201) {
            const responseData = await response.json()
        }
  } 
   
return ( 
<>
    <div className="container">
      <div className="row"> 
        <form onSubmit={addDetails} className="update__forms">
          <h3 className="myaccount-content"> Add  </h3>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="font-weight-bold"> Title <span className="required"> * </span> </label>
              <input type="text" name="title" value={userInfo.title} onChange={onChangeValue}  className="form-control" placeholder="Title" required />
            </div>
            <div className="form-group col-md-12 editor">
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
                <Editor
                  editorState={description}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={onEditorStateChange}
                />
              <textarea style={{display:'none'}} disabled ref={(val) => userInfo.description = val} value={draftToHtml(convertToRaw(description.getCurrentContent())) } />
            </div>
            {isError !== null && <div className="errors"> {isError} </div>}
            <div className="form-group col-sm-12 text-right">
              <button type="submit" className="btn btn__theme"> Submit  </button>
            </div> 
          </div> 
        </form>
      </div>
  </div>
</>
)
}
export default Add