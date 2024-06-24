import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Prestatario } from '../models/prestatario.model';

const baseUrlPrestatario = AppSettings.API_ENDPOINT + '/crudPrestatario';

@Injectable({
  providedIn: 'root'
})

export class PrestatarioService {

  constructor(private http: HttpClient) { }
  registrar(data: Prestatario): Observable<any> {
    return this.http.post(baseUrlPrestatario, data);

  }

  validaDniActualiza(descripcion: string, id:number): Observable<any>{
    console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
    return this.http.get<any>(baseUrlPrestatario+'/validaDdniActualiza?dni='+descripcion + "&idPrestatario="+id);
  }

  validaLoginActualiza(descripcion: string, id:number): Observable<any>{
    console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
    return this.http.get<any>(baseUrlPrestatario+'/validaLoginActualiza?login='+descripcion + "&idPrestatario="+id);
  }
  //PC2: CRUD de Prestatario
  registrarCrud(data:Prestatario):Observable<any>{
    return this.http.post(baseUrlPrestatario+"/registraPrestatario", data);
  }
  actualizarCrud(data:Prestatario):Observable<any>{
    return this.http.put(baseUrlPrestatario+"/actualizaPrestatario", data);
  }
  actualizarEstadoiCrud(data:Prestatario):Observable<any>{
    return this.http.put(baseUrlPrestatario+"/actualizaEstadoPrestatario", data);
  }
  eliminarCrud(id:number):Observable<any>{
    return this.http.delete(baseUrlPrestatario+"/eliminaPrestatario/"+id);
  }
  consultarCrud(filtro:string):Observable<any>{
    return this.http.get(baseUrlPrestatario+"/listaPrestatarioPorNombreLike/"+ filtro);
  }
}
