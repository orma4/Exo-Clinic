import React, { Fragment, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import { uploadFiles } from '../../../actions/uploadActions';
import { connect } from 'react-redux';
import { update } from '../../../actions/authActions';


const FileUpload = ({type,patientId,uploadFiles, user, update,closeChat}) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
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
    const extension = fileName.split(".")[1]
    const imgTypes=["png","jpg","jpeg"]
    const docTypes=["png","jpg","pdf","docx","doc","txt"]
    
    if ((type==="image"&&(imgTypes.includes(extension)))||(type==="document"&&(docTypes.includes(extension)))) {
          
    if(file){
    const res = await uploadFiles(onUploadProgress,file,fileName,closeChat,patientId);
    const {Location } = res.data;
    setUploadedFile({ filename: fileName, Location });
    setMessage('File Uploaded');
    }
    else
    alert("You did not add file!")
}
else if (type==="file"&&(imgTypes.includes(extension))) {
  
}
else{
  alert("Please upload a legal file!")

}
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
            {fileName}
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
            <img style={{ width: '100%' }} src={uploadedFile.Location} alt='' />
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