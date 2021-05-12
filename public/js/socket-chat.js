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
        // console.log('Usuarios Conectados:', resp);
        f01_Rederizar_Usuarios(resp);
    });

});


// DESCONECTA
_Socket.on('disconnect', () => {
    console.log('Usuario Desconectado');
});


// Recepción Mensajes:
// 1. Desde otro usuario  
// 2. mis mensajes se enviaron desde Navegador (submit form)
// 1 o 2: van al server 

_Socket.on('crear-Mensaje', function(wMensaje) {
    // console.log('Servidor:', wMensaje);
    // Renderiza Mensaje: no mio
    f03_Renderiza_Mensajes(wMensaje, false);
    // Acomoda Scroll
    f20_ScrollBottom();
});


// Escuchar Cambios de Usuarios (in-out de Chat)
_Socket.on('listaPersonas-onChat', (mensaje) => {
    // console.log('Lista personas:', mensaje);
    f01_Rederizar_Usuarios(mensaje);
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