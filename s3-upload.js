require('dotenv').config();
const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');

// const s3 = new aws.S3({ apiVersion: '2006-03-01' });
// AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY SET per Windows e export per LINUX


aws.config.update({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
    region: 'us-east-2'
});

const app = express();
app.use(express.static(__dirname + '/public'));
const s3 = new aws.S3();

app.use(bodyParser.json());

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'node-js-uploads',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //
        }
    })
});


app.get('/', function (req, res) {
    res.render('homepage.ejs');
});


app.post('/upload', upload.array('fileToUpload'), function (req, res, next) {
    return res.json({status:'File Inviati!!', uploaded: req.files.length})
});


const server = app.listen(9000, function ()
{
    console.log("Server listening on port: %j", server.address().port);
});



























// const upload = multer(
//     {
//     storage: multerS3(
//         {
//         s3,
//         bucket: 'node-js-uploads',
//         metadata: (req, file, cb) => 
//         {
//             cb(null, { fieldName: 'node-js-uploads'});
//         },
//         filename: (req, file, cb) => 
//         {
//             cb(null, file.originalname)
//             // const ext = path.extname(file.originalname);
//             // cb(null, `${uuid()}${ext}`);
//         }
//     })
// });

// app.use(express.static(__dirname + '/public')); //per trovare style
// //app.use(express.static('public'))

// app.get("/", (req, res) => 
// {
//     res.render("homepage.ejs");
// })

// app.post('/upload', upload.array('fileToUpload'), (req, res) => 
// {
//     return res.json({ status: 'OK', uploaded: req.files.length });
// });

// //Inizializzo il mio server nella porta 9000
// const server = app.listen(9000, function ()
// {
//     console.log("Server listening on port: %j", server.address().port);
// });
