// SERVER SIDE
// SOCKETS CONTROLLER
// CONTROLADOR DE LA COMUNICACION (REQUEST)
// 
// OBSERVABLES: Listener de Request del Socket
// Escuchando todas las cnxs:

// Toda comunicación por Socket, tiene 2 salas de chats por default y se pueden crear salas privadas
// 1. [default] Global - donde están todos los que se conectan
// 2. [default] Por socket.id (muy volatil, ya q puede cambiar de id en cualquier momento)
// 3. SALA PRIVADA: (crear) utilizando el user.id: que es más estable 
// 
// para conectarse a una sala "join"
// Joins a Room, You can join multiple rooms, and by default, on connection, 
// you join a room with the same name as your ID
// --------------------------------------------

const { CL_UsuariosChat } = require('../classes/cla_usuarios');
const { fn01Utl_CrearMensaje } = require('../utils/utl-utilidades');

// Instanciado Clase: se ejecutara sólo 1 vez / cuando el servidor se levanta
const clUsuariosChat = new CL_UsuariosChat();


// 
const fnSocket_Controller = (_Client) => {

    // EVENTOS 

    // ENTRAR-AL-CHAT
    _Client.on('entra-al-Chat', (_Data, _CallBack) => {
        // console.log(_Data);
        if (!_Data.nombre || !_Data.sala) {
            return _CallBack({
                ok: false,
                msg: 'El nombre/sala es necesario'
            })
        }

        // Salas

        _Client.join(_Data.sala);

        // Add-Cnx en Arreglo Personas
        clUsuariosChat.mt_Persona_AddCnx(_Client.id, _Data.nombre, _Data.sala)

        // 1 a n: Informa Personas Conectadas a todos los del Chat
        // _Client.broadcast.emit('listaPersonas-onChat', clUsuariosChat.mt_Persona_GetListAll());

        // 1 a n: Informa Personas Conectadas a la sala
        _Client.broadcast.to(_Data.sala).emit('listaPersonas-onChat',
            clUsuariosChat.mt_Persona_GetListenSala(_Data.sala));

        // Retorna Personas Conectadas en la Sala
        _CallBack(clUsuariosChat.mt_Persona_GetListenSala(_Data.sala));

    });


    // RE-TRANSMITIENDO un mensaje a todos: 1 a n
    _Client.on('crear-Mensaje', (_Data) => {
        // Data-Persona que envía el mensaje
        let wPersona = clUsuariosChat.mt_Persona_GetId(_Client.id);
        // Armo mensaje
        let wMensaje = fn01Utl_CrearMensaje(wPersona, _Data.mensaje);
        // Envío el msg a Todos
        _Client.broadcast.to(wPersona.sala).emit('crear-Mensaje', wMensaje)
    })

    // DISCONNECT
    _Client.on('disconnect', () => {

        // Borra Persona del Chat
        let wPersonaBorrada = clUsuariosChat.mt_Persona_BorrardeChat(_Client.id);

        // Avisa a todos: Abandono de Chat
        _Client.broadcast.to(wPersonaBorrada.sala).emit('crear-Mensaje',
            fn01Utl_CrearMensaje('Administrador', `${wPersonaBorrada.nombre}, Abandonó el Chat...`))

        // Informa de Personas Conectadas en la Sala
        _Client.broadcast.to(wPersonaBorrada.sala).emit('listaPersonas-onChat',
            clUsuariosChat.mt_Persona_GetListenSala(wPersonaBorrada.sala));

    })

    // MSG PRIVADOS: 1 a 1
    _Client.on('mensaje-Privado', _Payload => {
        // data persona que envía
        let wPersona = clUsuariosChat.mt_Persona_GetId(_Client.id);

        // 1 a n: envío a todos:
        // _Client.broadcast.emit('mensaje-Privado', fn01Utl_CrearMensaje(wPersona.nombre, _Payload.mensaje));

        // 1 a 1: privado ("espara": es un argumento más del mensaje)
        _Client.broadcast.to(_Payload.espara).emit('mensaje-Privado', fn01Utl_CrearMensaje(wPersona.nombre, _Payload.mensaje));
    })

};

module.exports = {
    fnSocket_Controller,
}