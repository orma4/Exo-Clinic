import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { uploadFiles } from '../../actions/uploadActions';
import fileUpload from 'express-fileupload';
import { connect } from 'react-redux';
import { update } from '../../actions/authActions';


const FileUpload = ({uploadFiles, user, update}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const [userState,setUserState]=useState({...user})


  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onUploadProgress = progressEvent => {
    setUploadPercentage(
              parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total))
            );
            
          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
  }


  const onSubmit = async e => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append('file', file);
    const res = await uploadFiles(onUploadProgress,file);
    const { fileName, filePath } = res.data;

    setUploadedFile({ fileName, filePath });
    setMessage('File Uploaded');
    const {Location} = res.data
 
   // setUserState();
   // console.log(userState)
    update({...userState, image: Location});

    // try {
    //   const res = await axios.post('/api/uploads', formData, {
    //     onUploadProgress: progressEvent => {
    //       setUploadPercentage(
    //         parseInt(
    //           Math.round((progressEvent.loaded * 100) / progressEvent.total)
    //         )
    //       );

    //       // Clear percentage
    //       setTimeout(() => setUploadPercentage(0), 10000);
    //     }
    //   });

    // } catch (err) {
    //   if (err.response.status === 500) {
    //     setMessage('There was a problem with the server');
    //   } else {
    //     setMessage(err.response.data.msg);
    //   }
    // }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});


export default connect(mapStateToProps, {uploadFiles, update})(FileUpload);