// 
// Encargado de todas las funciones 
// que permiten Renderizar y modificar 
// los archivos HTML del proyecto
//

// Rescate de Params en la URL 
const wUrlParams = new URLSearchParams(window.location.search);

const wNombre = wUrlParams.get('nombre');
const wSala = wUrlParams.get('sala');


// Referencias JQuery

const wHTML_ListaUsuarios = $('#divListaUsuarios');
const wHTML_FromEnviar = $('#formEnviar');
const wHTML_IdTxtMensaje = $('#idTxtMensaje');
const wHTML_ChatBox = $('#divChatbox');


// Render Usuarios: _Personas = [ {}, {}, {} ... ]
function f01_Rederizar_Usuarios(_ArrPersonas) {
    console.log(_ArrPersonas);

    let wHTML = '';

    // Cabecera
    wHTML += '<li>';
    wHTML += '<a href="javascript:void(0)" class="active"> Chat de <span>' + wUrlParams.get('sala') + '</span></a>';
    wHTML += '</li>';

    // Detalle
    // data-idper es un atributo creado, su referencia es "idper"
    for (let i = 0; i < _ArrPersonas.length; i++) {
        wHTML += '<li>';
        wHTML += '<a data-idper="' + _ArrPersonas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + _ArrPersonas[i].nombre + ' <small class="text-success">online</small></span></a>';
        wHTML += '</li>';
    }

    // Carga Html
    wHTML_ListaUsuarios.html(wHTML);
};

function f03_Renderiza_Mensajes(_Mensaje, _esMio) {

    let wHTML = '';
    let wFecha = new Date(_Mensaje.fecha);
    let wHora = wFecha.getHours() + ':' + wFecha.getMinutes();
    // 
    let wAdminClass = 'info';
    if (_Mensaje.nombre === 'Administrador') {
        wAdminClass = 'danger'
    };

    // 
    if (_esMio) {
        wHTML += '<li class="reverse animated fadeIn">';
        wHTML += '     <div class="chat-content">';
        wHTML += '          <h5>' + _Mensaje.nombre + '</h5>';
        wHTML += '          <div class="box bg-light-inverse">' + _Mensaje.mensaje + '</div>';
        wHTML += '     </div>';
        wHTML += '     <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        wHTML += '     <div class="chat-time">' + wHora + '</div>';
        wHTML += '</li> ';

    } else {
        wHTML += '<li class="animated fadeIn">';
        // Sin foto cuando es Admin
        if (_Mensaje.nombre !== 'Administrador') {
            wHTML += '     <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        };
        // 
        wHTML += '     <div class="chat-content">';
        wHTML += '     <h5>' + _Mensaje.nombre + '</h5>';
        wHTML += '     <div class="box bg-light-' + wAdminClass + '">' + _Mensaje.mensaje + '</div>';
        wHTML += '     </div>';
        wHTML += '     <div class="chat-time">' + wHora + '</div>';
        wHTML += '</li>';
    }

    //     
    wHTML_ChatBox.append(wHTML);
};


// Control de Scroll
function f20_ScrollBottom() {

    // selectors
    var newMessage = wHTML_ChatBox.children('li:last-child');

    // heights
    var clientHeight = wHTML_ChatBox.prop('clientHeight');
    var scrollTop = wHTML_ChatBox.prop('scrollTop');
    var scrollHeight = wHTML_ChatBox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        wHTML_ChatBox.scrollTop(scrollHeight);
    }
};


// LISTENER HTML

// Box Chat
// Recupera ID-PERSONA desde anchor/ancla <a>
wHTML_ListaUsuarios.on('click', 'a', function() {
    // this referencia 'a'
    let wIdPersona = $(this).data('idper');

    if (wIdPersona) {
        console.log(wIdPersona);
    }
});

// FORM-SUBMIT: INPUT MENSAJES -> SERVER
// cuando envío con el Form: soy yo enviando el mensaje
wHTML_FromEnviar.on('submit', function(_Event) {
    _Event.preventDefault();
    // 
    //console.log(wHTML_IdTxtMensaje.val());     

    if (wHTML_IdTxtMensaje.val().trim().length === 0) {
        return
    };

    // Enviar Mensaje al Server
    _Socket.emit('crear-Mensaje', {
        nombre: wNombre,
        mensaje: wHTML_IdTxtMensaje.val()
    }, function(mensaje) {
        // console.log('Respuesta server:', mensaje);
        // limpia TxtMensaje y focus
        wHTML_IdTxtMensaje.val('').focus();
        // Renderiza Mensaje: mio
        f03_Renderiza_Mensajes(mensaje, true);
        // Acomoda Scroll
        f20_ScrollBottom();
    });
});