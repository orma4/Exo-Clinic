require('dotenv/config')
const express = require('express');
const multer = require('multer')
const AWS = require('aws-sdk')
const uuid = require('uuid/v4')
const router = express.Router();
const auth = require('../../middleware/auth');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
      callback(null, '')
  }
})


// Upload Endpoint
router.post('/', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  let myFile = req.files.file.name.split(".")
  const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.files.file.data
    }

    s3.upload(params, (error, data) => {
        if(error){
            res.status(500).send(error)
        }

        res.status(200).send(data)
    })


});


router.get('/', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
});


module.exports = router;