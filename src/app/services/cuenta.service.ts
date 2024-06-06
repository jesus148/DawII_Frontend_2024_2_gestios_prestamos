import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Cuenta } from '../models/cuenta.model';
import { Observable } from 'rxjs';
import { EntidadFinanciera } from '../models/entidad-financiera.model';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/cuenta';

@Injectable({
  providedIn: 'root'
})
export class CuentaService {

  constructor(private http:HttpClient) { }

  registrar(data:Cuenta):Observable<any>{
    return this.http.post(baseUrlPrueba, data)
  }

  listaEntidadPorTipo(codigo: number): Observable<EntidadFinanciera[]> {
    return this.http.get<EntidadFinanciera[]>(baseUrlPrueba+'/listaEntidadPorTipo?codigo='+codigo);
}



}
