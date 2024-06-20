import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { Observable } from 'rxjs';
import { EntidadFinanciera } from '../models/entidad-financiera.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/cuenta';
const baseUrlPruebaCrud = AppSettings.API_ENDPOINT+ '/crudCuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }

  //PC1 
  registrar(data:Cuenta):Observable<any>{
    return this.http.post(baseUrlPrueba, data)
  }


listaEntidades(id:any): Observable<EntidadFinanciera[]>{
  return this.http.get<EntidadFinanciera[]>(baseUrlPrueba+"/listaEntidadPorTipo/"+id);
}

validaNumeroCuenta(numero: string): Observable<any>{
  return this.http.get<any>(baseUrlPrueba+'/validaNumeroCuenta?numero='+numero);
}

//PC2 CRUD

registrarCrud(data:Cuenta):Observable<any>{
  return this.http.post(baseUrlPruebaCrud+"/registraCuenta", data);
}
actualizarCrud(data:Cuenta):Observable<any>{
  return this.http.put(baseUrlPruebaCrud+"/actualizaCuenta", data);
}
eliminarCrud(id:number):Observable<any>{
  return this.http.delete(baseUrlPruebaCrud+"/eliminaCuenta/"+id);
}
consultarCrud(filtro:string):Observable<any>{
  return this.http.get(baseUrlPruebaCrud+"/listaCuentaPorNumeroLike/"+ filtro);
}


}
