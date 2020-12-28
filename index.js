//input del utente 
const readlineSync = require("readline-sync");
//colors console
const colors = require("colors");
//network module to have a TCP based comunication
//NodeJs Docs: net module is used to create both servers and clients. This module provides an asynchronous network wrapper and it can be imported using the following syntax.
const net = require("net")


//port e host per fare la connessione al server
const HOST = "192.168.178.134"; //test di conessione a un altro pc sulla stessa rete locale
const PORT = "9000";
//const username= "gruppoits";
//const password= "*******";

//instance TCP client 
let client = null;


//menu utente
function menu(){ 
    let lineRead= readlineSync.question("\nScegliere tra le seguenti opzioni: \n1-Connettere \n2-Invia Dati \n3-Disconettere \n4-Esci\n\n->");
    
    switch(lineRead){
        case "1":
            Connettere();
            break;
        case "2":
            let data= readlineSync.question("Type msg per invio: ");
            InviaDati(data);
            break;
        case "3":
            Disconettere();
            break;
        case "4":
            return;//esci dal menu
            break;
        default:
            setTimeout(function(){
                console.log("Opzione Invalida!")
                menu();
            },0);
            break;
    }
    
}

setTimeout(function(){//torna novamente ao menu em caso de input inexist
    menu();
},0);


//funzioni


//conessione socket client
function Connettere(){
    if(client){
        console.log("Viene stabilita una connessione!".green);
        setTimeout(function(){
            menu();
        },0);
        return;
    }

    client = new net.Socket();

   
    client.on("error", function(err){
        client.destroy();
        client= null;
        console.log("ERROR: Conessione non riuscita. Msg: %s".gray, err.message);
        setTimeout(function(){
            menu();
        },0);
    });

  
    client.on("data", function(data){
        console.log("Ricevuto il messaggio: %s".gren, data);
        setTimeout(function(){
            menu();
        },0);

    });


    //conessione con il server usando lo stesso socket
    client.connect(PORT, HOST, function(){
        console.log("Connessione riuscita con successo!".green);
        setTimeout(function(){
            menu();
        },0);
    });        
}

function InviaDati(data){
    //confere se non esiste con
    if (!client) {
        console.log("Non existe connessione attiva..Prova a connetterti".red);
        setTimeout(function(){
            menu();
        },0);
        return;
    }
    //altrimente uso socket per inviare info al server
    client.write(data);
}

function Disconettere(){
    if (!client) {
    console.log("Non existe conessione attiva..Prova a conetterti!".red);
    setTimeout(function(){
        menu();
    },0);
    return;  
   }

   client.destroy();
   client= null;
   console.log("Connessione Terminata".yellow);
   setTimeout(function(){
       menu();
   },0);


}