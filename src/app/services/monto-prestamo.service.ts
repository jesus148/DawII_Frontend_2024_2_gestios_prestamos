import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoPrestamo } from '../models/monto-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/montoPrestamo';
const baseUrlCrudMonto = AppSettings.API_ENDPOINT + '/crudMontoPrestamo';
const baseUrlConsulta = AppSettings.API_ENDPOINT + '/consultaMonto';

@Injectable({
  providedIn: 'root'
})
export class MontoPrestamoService {

  constructor(private http:HttpClient) { }




  public registraMontoPrestamo(MontoPrestamo:MontoPrestamo) :Observable<any>{
    return this.http.post(baseUrlPrueba, MontoPrestamo);
  }




    // metodo validar descripcion al registrar
    validaMontoRegistra(capital: string): Observable<any>{
      console.log('>>> Service >> validaDescripcionRegistra [inicio]' + capital);
      return this.http.get<any>(baseUrlCrudMonto+'/validaMontoPorCapital?capital='+capital);
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









  // PC3 CONSULTA COMPLEJA
  consultaMonto(capital: string, dias: string , monto :number , estado: number): Observable<any>{
    // consola print
    console.log('>>> Service >> consultaEjemplo [inicio]' + capital);

    // "&idPais=" : parametro igual en el back en el @RequestParam
    return this.http.get<any>(baseUrlConsulta+'/consultaComplejoEjemplo?capital='+capital + "&dias="+dias + "&monto="+monto + "&estado="+estado );
  }









}
