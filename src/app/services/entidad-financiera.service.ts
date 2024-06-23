import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { EntidadFinanciera } from '../models/entidad-financiera.model';
import { Observable } from 'rxjs';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/entidadFinanciera';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT+ '/crudEntidadFinanciera';

@Injectable({
  providedIn: 'root'
})
export class EntidadFinancieraService {

  constructor(private http:HttpClient) { }

  registrar(data:EntidadFinanciera):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  //Validaciones 
  validaNombreRegistra(nombre: string): Observable<any>{
    console.log('>>> Service >> validaNombreRegistra [inicio]' + nombre);
    return this.http.get<any>(baseUrlPrueba+'/validaNombreRegistra?nombre='+nombre);
  }

  validaNombreActualiza(nombre: string, id:number): Observable<any>{
    console.log('>>> Service >> validaNombreActualiza [inicio]' + nombre);
    return this.http.get<any>(baseUrlCrudPrueba+'/validaNombreActualiza?nombre='+nombre + "&idEntidadFinanciera= " + id);
  }

  //CRUD
  registrarCrud(data:EntidadFinanciera):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraEntidadFinanciera", data);
  }
  actualizarCrud(data:EntidadFinanciera):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaEntidadFinanciera", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaEntidadFinanciera/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaEntidadFinancieraPorNombreLike/"+ filtro);
  }

}
