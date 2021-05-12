// 
// RUTINAS UTILES 
// accesadas de distintos puntos del proyecto


// ESRUCTURA DE TODOS LOS MENSAJES
const fn01Utl_CrearMensaje = (nombre, mensaje) => {

    return {
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }
};

module.exports = {
    fn01Utl_CrearMensaje,
}