//Testando modulo promise-ftp
//promise-ftp is an FTP client module for node.js that provides an asynchronous interface for communicating with an FTP server.

let PromiseFtp = require('promise-ftp');
let fs = require('fs');

const ftp = new PromiseFtp();
ftp.connect({
  host: "192.168.178.117", 
  user: "gruppoits", 
  password: "@NodeJs2020"
})

//download di un file del server. salvataggio nella root del progetto
  .then(function (serverMessage) {
    return ftp.get('Nota.txt');
  }).then(function (stream) {
    return new Promise(function (resolve, reject) {
      stream.once('close', resolve);
      stream.once('error', reject);
      stream.pipe(fs.createWriteStream('Nota.local-copy.txt'));
    });
  }).then(function () {
    return ftp.end();
  });

//invio di file locale al server
// .then(function (serverMessage) {
//     return ftp.put('pattoFormativo.pdf', 'pattoFormativo.remote-copy.pdf');
//   }).then(function () {
//     return ftp.end();
//   });




//Test Modulo basic-ftp
/*This is an FTP client for Node.js. It supports FTPS over TLS, Passive Mode over IPv6, has a Promise-based API, 
and offers methods to operate on whole directories.*/

// const ftp = require("basic-ftp")
 
// example()
 
// async function example() {
//     const client = new ftp.Client()
//     client.ftp.verbose = true
//     try {
//         await client.access({
//                host: "192.168.178.117", 
//            // host: "myftpserver.com",
//             user: "gruppoits", 
//             password: "@NodeJs2020",
//             secure: true
//         })
//         console.log(await client.list())
//         //await client.uploadFrom("README.md", "README_FTP.md")
//         //await client.downloadTo("README_COPY.md", "README_FTP.md")
//     }
//     catch(err) {
//         console.log(err)
//     }
//     client.close()
// }