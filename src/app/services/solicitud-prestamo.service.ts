import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SolicitudPrestamo } from '../models/solicitud-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/solicitudPrestamo';
const baseUrlCrudPrueba = AppSettings.API_ENDPOINT+ '/crudSolicitud';
const baseUrlConsultaPrueba = AppSettings.API_ENDPOINT + '/consulta';


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



  //PC3: Consulta de Solicitud
  consultaSolicitudPrestamo(capital:number, dias:number, montoPagar:number, fecIni:string, fecFin:string, estado:number):Observable<any>{
    const params = new HttpParams()
    .set("capital", capital)
    .set("dias", dias)
    .set("montoPagar", montoPagar)
    .set("fecIni", fecIni)
    .set("fecFin", fecFin)
    .set("estado", estado);
   

return this.http.get(baseUrlConsultaPrueba+"/consultaSolicitudPrestamo", {params});
}

  //PC3: Consulta de Solicitud
  consultaSolicitud(capital2:number, dias2:number, montoPagar2:number, estado2:number):Observable<any>{
    const params = new HttpParams()
    .set("capital", capital2)
    .set("dias", dias2)
    .set("montoPagar", montoPagar2)
    .set("estado", estado2);
   

return this.http.get(baseUrlConsultaPrueba+"/consultaSolicitud", {params});
}
}
