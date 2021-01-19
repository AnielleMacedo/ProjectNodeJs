require('dotenv').config()
const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');

const app= express();

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
});
//credencias per laccesso a aws
/*acess key id
AKIAVM476I3G5OPDFGNH


chave secreta:
RUh0QtVauIOfoGSUemPZxh3FKFq2DrPTfhDDoAbM*/


//const s3 = new aws.S3({ apiVersion: '2006-03-01' });
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY  SET per Windows e export per LINUX

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'node-js-uploads',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${uuid()}${ext}`);
        }
    })
});

app.use(express.static(__dirname + '/public'));//per trovare style

//app.use(express.static('public'))
app.get("/", (req, res) => {
    //res.send("Benvenuto!")
    //renderizzo mia view
    res.render("homepage.ejs");
})

app.post('/upload', upload.array('fileToUpload'), (req, res) => {
    return res.json({ status: 'OK', uploaded: req.files.length });
});

app.listen(9000);

