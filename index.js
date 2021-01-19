/*installo nodemon globalmente per evitare de riavviare il server
ogni volta che cambiamo il file
npm start -- cosi inizia gia con nodemon

librerie installate:
npm install --save ejs
npm install --save multer
npm install aws-sdk multer-s3

nao precisou fazer require do ejs pq parece q ja vem dentro de express, se fosse hbs era necessario
 */
const express= require("express");
const app= express(); //crio instancio express per iniciar mia applicazione
app.use(express.static(__dirname + '/public'));

//libreria usata per fare upload di files
//multer è un middleware di upload, ossia sta in mezzo tra la request del client e la response del server??/la route
//quando lutente invia un file alla route principlae il multer prendi questa richiesta e estrarre il file per essere possiblire manipolare il file
const multer = require("multer");

//libreria per visualizazione delle pagine html della cartella views
//uso template ejs extensao ejs nao precisou fazer require
app.set('view engine', 'ejs');

//funzione di multer per rinominare  i file
const storage = multer.diskStorage({//permite manipolare i file dopo upload
    destination: function (req, file, cb) { //callback
      cb(null, 'uploads/')//coloca o diretorio q quer salvar
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //lascio nome originale + extension
    }
})
   
//configurazione del multer: crio objeto p ele e o destino p onde vao meus files
const upload = multer({storage})
//const upload = multer({dest: "uploads/"})


//crio la route principale della applicazione
app.get("/", (req, res) => {
    //res.send("Benvenuto!")
    //renderizzo mia view
    res.render("homepage.ejs");
})

//creo 1 route post chamada upload per riceve i file
app.post("/upload", upload.array("fileToUpload"), (req, res) => {  //aceitar mais de 1 file array
   // res.send("Arquivo recebido");
    return res.json({status:'File Inviati!!', uploaded: req.files.length})
})


//Inizio il mio server nella porta 9000
const server = app.listen(9000, function (){
    console.log("Server listening on port: %j", server.address().port);
});