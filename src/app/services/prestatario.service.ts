import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Prestatario } from '../models/prestatario.model';

const baseUrlPrestatario = AppSettings.API_ENDPOINT + '/prestatario';

@Injectable({
  providedIn: 'root'
})

export class PrestatarioService {

  constructor(private http: HttpClient) { }
  registrar(data: Prestatario): Observable<any> {
    return this.http.post(baseUrlPrestatario, data);

  }
}
