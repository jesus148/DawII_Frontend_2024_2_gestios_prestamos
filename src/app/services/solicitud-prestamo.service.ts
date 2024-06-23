import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SolicitudPrestamo } from '../models/solicitud-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/solicitudPrestamo';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT+ '/crudSolicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPrestamoService {

  constructor(private http:HttpClient) { }


  //PC1
  registrar(data:SolicitudPrestamo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  //PC2
  registrarCrud(data:SolicitudPrestamo):Observable<any>{
    return this.http.post(baseUrlCrudPrueba+"/registraSolicitud", data);
  }
  actualizarCrud(data:SolicitudPrestamo):Observable<any>{
    return this.http.put(baseUrlCrudPrueba+"/actualizaSolicitud", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlCrudPrueba+"/eliminaSolicitud/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlCrudPrueba+"/listaSolicitudPorCapital/"+ filtro);
  }





}
