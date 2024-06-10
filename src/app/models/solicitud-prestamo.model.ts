import { DatePipe, DecimalPipe } from "@angular/common";
import { DataCatalogo } from "./dataCatalogo.model";
import { Usuario } from "./usuario.model";

export class SolicitudPrestamo {


  idSolicitud?:number;
  capital?:number;
  dias?: DataCatalogo;
  montoPagar?:number;
  idEstadoSolcitud?: DataCatalogo;
  fechaInicioPrestamo?:Date;
  estado?: number;
  usuarioPrestatario?:Usuario;
  usuarioRegistro?:Usuario;
  usuarioActualiza?:Usuario;







}
