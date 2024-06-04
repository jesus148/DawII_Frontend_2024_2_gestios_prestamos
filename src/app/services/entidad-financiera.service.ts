import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { EntidadFinanciera } from '../models/entidad-financiera.model';
import { Observable } from 'rxjs';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/entidadFinanciera';

@Injectable({
  providedIn: 'root'
})
export class EntidadFinancieraService {

  constructor(private http:HttpClient) { }

  registrar(data:EntidadFinanciera):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

  validaNombreRegistra(nombre: string): Observable<any>{
    console.log('>>> Service >> validaNombreRegistra [inicio]' + nombre);
    return this.http.get<any>(baseUrlPrueba+'/validaNombreRegistra?nombre='+nombre);
  }

}
