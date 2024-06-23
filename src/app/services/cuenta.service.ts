import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { Observable } from 'rxjs';
import { EntidadFinanciera } from '../models/entidad-financiera.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/cuenta';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT + '/crudCuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }

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

}
