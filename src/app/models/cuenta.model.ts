import { UtilService } from "../services/util.service";
import { Usuario } from "./usuario.model";

export class Cuenta {

idCuenta?:number ;
numero?:string; 
idEntidadFinanciera? : UtilService;
idTipoMoneda?:UtilService;
estado?:number;
idUsuarioRegistro?:Usuario;
idUsuarioActualizacion?:Usuario;
cuentae?:number;

}
