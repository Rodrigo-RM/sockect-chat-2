//  BACK-END. SERVIDOR
// -------------------------------
// 
// EXPRESS
const Express = require('express');
const Cors = require('cors');


// IO
const { createServer } = require('http');

// Controlador Socket
const { fnSocket_Controller } = require('./sockets/skt-controller');

// 
class CL_SERVER {

    constructor() {

        // Init
        this.App = Express();
        this.wPort = process.env.PORT || 3000;

        // SocketIO
        this.sIO_Server = createServer(this.App);
        // IO es toda la info de los todos sockets conectados
        this.sIO = require('socket.io')(this.sIO_Server);

        // Define Rutas

        // 
        // METODOS:  
        // 
        this.mtServ_MiddleWares(); // Middlewares
        // DB-Conexión
        // Rutas
        this.mt_Sockets(); // Socket Events

    }

    // Métodos:
    // MIDDLEWARES - Varios
    mtServ_MiddleWares() {

        // Cors
        this.App.use(Cors());

        // Formato Data. Lectura y Parseo Body-request
        this.App.use(Express.json());

        // Directorio Publico: busca index.html
        this.App.use(Express.static('public'));

    };

    // SOCKET LISTENER
    // Escuchando todas las cnxs: this.sIO
    mt_Sockets() {
        this.sIO.on('connection', fnSocket_Controller);
    };

    // LISTEN  
    mtServ_Listen() {
        this.sIO_Server.listen(this.wPort, () => {
            console.log(`WEB-Server running and listening at http://localhost:${this.wPort}`);
        })
    };

}

module.exports = CL_SERVER