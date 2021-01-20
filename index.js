/* installo nodemon globalmente per evitare di riavviare il server ogni volta che cambiamo il file
npm start -- cosi inizia già con nodemon

librerie installate:
npm install --save ejs
npm install --save multer
npm install aws-sdk multer-s3
*/

const express= require("express");
const app= express(); //creo per iniziallizare la mia applicazione
app.use(express.static(__dirname + '/public')); // per accedere al css

/*
libreria usata per fare l'upload di files
multer è un middleware di upload, si trova in mezzo tra la request del client e la response del server 
quando l'utente invia un file alla route principale il multer prende questa richiesta e estrae il file per manipolarlo
*/
const multer = require("multer");

/*
libreria per la visualizazzione delle pagine html della cartella views
uso l'estensiome ejs del template
*/
app.set('view engine', 'ejs');

//funzione di multer per rinominare  i file
const storage = multer.diskStorage(
  { //permette di manipolare i file dopo upload
    destination: function (req, file, cb) 
    { //callback
      cb(null, 'uploads/')//cartella in cui si vuole salvare i file caricati
    },
    filename: function (req, file, cb) 
    {
      cb(null, file.originalname) //lascio il nome originale e l'estensione
    }
})
   
//configurazione del multer: crea l'oggetto e la destinazione in cui vanno i file caricati
const upload = multer({storage})
//const upload = multer({dest: "uploads/"})

//creo la rotta principale dell'applicazione
app.get("/", (req, res) =>
{
    //renderizzo alla view
    res.render("homepage.ejs");
})

/*
creo una route post chiamata upload per ricevere i file
accetta più di un file
*/
app.post("/upload", upload.array("fileToUpload"), (req, res) => 
{
  return res.json({status:'File Inviati!!', uploaded: req.files.length})
  //res.render("uploadView.ejs");
})

//Inizializzo il mio server nella porta 9000
const server = app.listen(9000, function ()
{
    console.log("Server listening on port: %j", server.address().port);
});