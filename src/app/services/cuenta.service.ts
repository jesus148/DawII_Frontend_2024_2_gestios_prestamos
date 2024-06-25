import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { Observable } from 'rxjs';
import { EntidadFinanciera } from '../models/entidad-financiera.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/cuenta';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudCuenta';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT + '/consultaCuenta';
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
  console.log('>>> Service >> validaNumeroCuenta [inicio]' + numero);
  return this.http.get<any>(baseUrlPrueba+'/validaNumeroCuenta?numero='+numero);
}


validaNumeroCuentaActualiza(numero: string, id:number): Observable<any>{
  console.log('>>> Service >> validaDescripcionActualiza [inicio]' + numero);
  return this.http.get<any>(baseUrlCrudPrueba+'/validaNumeroCuentaActualiza?numero='+numero + "&idCuenta="+id);
}


//PC2 CRUD

registrarCrud(data:Cuenta):Observable<any>{
  return this.http.post(baseUrlCrudPrueba+"/registraCuenta", data);
}
actualizarCrud(data:Cuenta):Observable<any>{
  return this.http.put(baseUrlCrudPrueba+"/actualizaCuenta", data);
}
eliminarCrud(id:number):Observable<any>{
  return this.http.delete(baseUrlCrudPrueba+"/eliminaCuenta/"+id);
}
consultarCrud(filtro:string):Observable<any>{
  return this.http.get(baseUrlCrudPrueba+"/listaCuentaPorNumeroLike/"+ filtro);
}

// Nuevo método para obtener los detalles de una cuenta por su número
obtenerCuentaPorNumero(numero: string): Observable<Cuenta> {
  return this.http.get<Cuenta>(baseUrlCrudPrueba + "/detalleCuenta/" + numero);
}

//consulta cuenta
  consultaCuentaCompleja(numero: string,  entidadFinanciera : number, estado: number, tipoMoneda: number): Observable<any>{
    const params = new HttpParams()
       .set("numero", numero)
       .set("entidadFinanciera", entidadFinanciera)
       .set("estado", estado)
       .set("tipoMoneda", tipoMoneda);
   return this.http.get(baseUrlConsultaPrueba+"/consultaCuentaCompleja",{params});
 }

}
