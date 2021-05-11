// 
// Socket Cliente
// 

const _Socket = io();

// 
// Rescate de Params en la URL 
const wSearch_Params = new URLSearchParams(window.location.search);

// No viene nombre
if (!wSearch_Params.has('nombre') || !wSearch_Params.has('sala')) {
    // volver a Index
    window.location = 'index.html';
    // Err
    throw new Error('Nombre y Sala son requeridos');
};

// Captura Nombre
const wNombreUsuario = {
    nombre: wSearch_Params.get('nombre'),
    sala: wSearch_Params.get('sala')
};


// CNX: ENTRA A CHAT
_Socket.on('connect', () => {
    console.log('Usuario conectado...');

    _Socket.emit('entra-al-Chat', wNombreUsuario, (resp) => {
        console.log('Usuarios Conectados:', resp);
    });

});


// DESCONECTA
_Socket.on('disconnect', () => {
    console.log('Usuario Desconectado');
});


// Enviar Mensajes a todos
_Socket.on('crear-Mensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});


// Escuchar Cambio de Usuarios (in-out de Chat)
_Socket.on('listaPersonas-onChat', (mensaje) => {

    console.log('Lista personas:', mensaje);

});


// MSG PRIVADOS
// Ejemplo del MsgPrivado en consol
// _Socket.emit('crear-Mensaje', {
//     nombre: 'Melissa',
//     mensaje: 'HOLA A TODOS',
//     espara: 'juan'
// })

_Socket.on('mensaje-Privado', function(_Mensaje) {

    console.log('MsgPrivado;', _Mensaje);
})