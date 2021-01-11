// APPLICAZIONE TCP Server USANDO NodeJs
 /*express è un framework backend feito em Node p criar applicacoes web.Vc baixa express--save (salvar local)
 atraves do npm. Primeiro rodar :
 npm init (cria file json)
 npm install express --save  (cria cartella node_modules p salvar os arquivos no seu proprio projeto)*/ 

//const http = require('http');//cria o server
//const express = require('express');//utiliza o mmodelo MVC
//const debug = require('debug');

const net = require("net");//serve p load un file js externo LIBRERIA STANDARD NODEJS
const colors = require("colors");
const { inherits } = require("util");

//crio o server usando a libreria net 
const server = net.createServer();

//socket é uma connessione(single o persistent) entre server e client
//tenho q criar um evento de conexao desse server, e enqto a conexao acontece eu chamo essa outra funcao
//anonima q executara. O socket trabalha c  m esma conexao ate vc pedir p fechar esta.
/*uma volta stabalita a conexao aki todas as operacaoes a seguir abaixo trabalham p ela. Os evento data() close() e error()*/
server.on("connection", function (socket) {
    let remoteAddress= socket.remoteAddress + " Porta: " + socket.remotePort;
    console.log("Viene stabilita una nuova connessione client nel Indirizzo %s".green , remoteAddress);

    //evento"data" captura os dados da minha conexao
    /*.Em cada click no packet sender se cria auma nova conexao client*/
    socket.on("data", function(contenuto) {
        console.log("Dati ricevuti dal client Anielle. IP %s: Com o seguinte conteudo:  %s".cyan, remoteAddress, contenuto + "\n");

        /*agora quero enviar de volta para o client alguns dados/info.Esse evento write nvia dados no soquete. O segundo parâmetro especifica 
        a codificação no caso de uma string. O padrão é a codificação UTF8.Retorna true se todos os dados foram 
        liberados com sucesso para o buffer do kernel. Retorna false se todos ou parte dos dados foram
        enfileirados na memória do usuário. 'drain'será emitido quando o buffer estiver novamente livre.*/
        socket.write("Ciao client!! Grazie per il messaggio: ".yellow + contenuto);

    });

   

    socket.once("close", function() {
        console.log("Connessione Terminata".red);
    });

    socket.on("error", function() {
        console.log("Errore di Connesione".red);
    });

});

//d criado automat por nodejs e lancando p todas as funcoes.o parametro d èe a msg q vc envia ao server


//esse server vai escutar na porta 9000
server.listen(9000, function (){
    console.log("server listening to 9000 port %j", server.address());
});
