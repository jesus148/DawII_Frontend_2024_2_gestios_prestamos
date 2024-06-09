import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontoPrestamo } from '../models/monto-prestamo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/montoPrestamo';

@Injectable({
  providedIn: 'root'
})
export class MontoPrestamoService {

  constructor(private http:HttpClient) { }

  public registraMontoPrestamo(MontoPrestamo:MontoPrestamo) :Observable<any>{
    return this.http.post(baseUrlPrueba, MontoPrestamo);
  }
}
