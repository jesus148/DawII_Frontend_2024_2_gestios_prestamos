
export class Usuario {

    idUsuario?: number;
    nombres?:string;
    apellidos?: string;
    dni?: string ;
    login?: string;
    correo?: string;
    fechaNacimiento?: Date;
    direccion?: string;
    nombreCompleto?: string;
    usuarioSuperior?:Usuario;
    usuarioRegistro?: Usuario;
    usuarioActualiza?:Usuario;
}
