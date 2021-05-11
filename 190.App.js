// 
// SOCKET SERVER - CHAT
//--------------------------------------------- 
// Entorno
require('dotenv').config();
// 


const CL_SERVER = require("./server/mod-Server");

const Server = new CL_SERVER();

Server.mtServ_Listen();