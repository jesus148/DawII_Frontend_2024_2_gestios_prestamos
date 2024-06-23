import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoPrestamo } from '../models/monto-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/montoPrestamo';
const baseUrlCrudMonto = AppSettings.API_ENDPOINT + '/crudMontoPrestamo';

@Injectable({
  providedIn: 'root'
})
export class MontoPrestamoService {

  constructor(private http:HttpClient) { }




  public registraMontoPrestamo(MontoPrestamo:MontoPrestamo) :Observable<any>{
    return this.http.post(baseUrlPrueba, MontoPrestamo);
  }






  //PC2: CRUD de Ejemplo
  // registrar = al actualizar
  registrarCrud(data:MontoPrestamo):Observable<any>{
    return this.http.post(baseUrlCrudMonto+"/registraMonto", data);
  }
// metodo actualiza
  actualizarCrud(data:MontoPrestamo):Observable<any>{
    return this.http.put(baseUrlCrudMonto+"/actualizaMonto", data);
  }
  // eliminar por id
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudMonto+"/eliminaMonto/"+id);
  }
  // listar por parametro
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudMonto+"/listaMontoPorCapitalLike/"+ filtro);
  }




  // metodo validar descripcion al actulizar en el modal por descricion y id
  // parametros ?descripcion y "&idEjemplo = en back
validaCapitalActualiza(capital: string, idMontoPrestamo:number): Observable<any>{
  console.log('>>> Service >> validaDescripcionActualiza [inicio]' + capital);
  return this.http.get<any>(baseUrlCrudMonto+'/validaCapitalActualiza?capital='+capital + "&idMontoPrestamo="+idMontoPrestamo);
  }

  // actualizar = al registrar



}
