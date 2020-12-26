// TCP Server 
 

const net = require("net");
const colors = require("colors");


//crio o server usando a libreria net 
const server = net.createServer();

server.on("connection", function (socket) {
    let remoteAddress= socket.remoteAddress + " Porta: " + socket.remotePort;
    console.log("Viene stabilita una nuova connessione client nel indirizzo %s".green , remoteAddress);

    socket.on("data", function(contenuto) {
        console.log("Dati ricevuti dal client PacketSender IP %s: Con il seguente content:  %s".cyan, remoteAddress, contenuto + "\n");

        socket.write("Hello client!! thanks for the msg: ".yellow + contenuto);

    });

   

    socket.once("close", function() {
        console.log("Connessione Terminata".red);
    });

    socket.on("error", function() {
        console.log("Errore di Connesione".red);
    });

});


server.listen(9000, function (){
    console.log("server listening to 9000 port %j", server.address());
});
console.log('testando se imprime Hello world');