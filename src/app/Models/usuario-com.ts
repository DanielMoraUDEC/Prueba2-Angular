import { Ciudad } from './ciudad';
export class UsuarioCom {

    idUsuario: number;
    documento: string;
    nombre: string;
    apellido: string;
    nick: string;
    clave: string;
    direccion: string;
    celular: string;
    celularAux: string;
    correo: string;
    tipoDocumento:{
        idTipoDocumento: number;   
        nombre:string;
    }
    rol:{
        idRol:number;
        nombre:string;
    }
    ciudad:{
        nombre: Ciudad;
    }
}
