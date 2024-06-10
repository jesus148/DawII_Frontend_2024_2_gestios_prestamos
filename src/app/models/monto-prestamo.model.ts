import { DecimalPipe } from "@angular/common";
import { DataCatalogo } from "./dataCatalogo.model";
import { Usuario } from "./usuario.model";

export class MontoPrestamo {


  idMontoPrestamo?:Number;

  capital?:number;
  dias?: DataCatalogo;
  monto?:DecimalPipe;
  estado?: number;
  fechaRegistro?:Date;
  fechaActualizacion?:Date;
  usuarioRegistro?:Usuario;
  usuarioActualiza?:Usuario;









}
