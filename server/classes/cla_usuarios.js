// 
//  CLASE USUARIOS
// 


class CL_UsuariosChat {

    constructor() {

        this.Arr_Personas = [];

    }

    // Persona: Add 
    mt_Persona_AddCnx(id, nombre, sala) {
        // 
        let wPersona = { id, nombre, sala };
        // 
        this.Arr_Personas.push(wPersona);

        return this.Arr_Personas;
    };

    // Persona: Get-Id
    mt_Persona_GetId(id) {
        // 
        //    let wPersonaId = this.Arr_Personas.filter(xPersona => {
        //        return xPersona.id = id
        //    })[0]; // [0] retorna solo la primera pos
        //    
        let wPersonaId = this.Arr_Personas.filter(xPersona => xPersona.id === id)[0];
        // 
        return wPersonaId;
    };

    // Todas las Personas Conectadas
    mt_Persona_GetListAll() {
        return this.Arr_Personas;
    };

    // Persona por Sala
    mt_Persona_GetListenSala(_Sala) {
        // 
        // let wArr_Personas_enSala = this.Arr_Personas.filter(xPersona => {
        //     return xPersona.sala === _Sala
        // });

        let wArr_Personas_enSala = this.Arr_Personas.filter(xPersona => xPersona.sala === _Sala);

        return wArr_Personas_enSala;
    };

    // Personas. Borrar de Chat
    mt_Persona_BorrardeChat(id) {
        // Rescata data Persona antes de Borrar
        let wPersonaBorrada = this.mt_Persona_GetId(id);
        // Borra Persona de Chat
        this.Arr_Personas = this.Arr_Personas.filter(xPersona => {
            return xPersona.id != id
        });

        //
        return wPersonaBorrada;

    };

}

module.exports = { CL_UsuariosChat };