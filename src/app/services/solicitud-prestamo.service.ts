import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SolicitudPrestamo } from '../models/solicitud-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/solicitudPrestamo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPrestamoService {

  constructor(private http:HttpClient) { }


  registrar(data:SolicitudPrestamo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }





}
