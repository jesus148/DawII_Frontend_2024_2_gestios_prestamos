
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Grupo } from '../models/grupo.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const baseUrlPrueba = AppSettings.API_ENDPOINT+ '/grupo';
const baseUrlPruebaCrud = AppSettings.API_ENDPOINT+ '/crudGrupo';

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  constructor(private http:HttpClient) { }

  registrarGrupo(data:Grupo):Observable<any>{
    return this.http.post(baseUrlPrueba, data);
  }

validaDescripcionRegistra(descripcion: string): Observable<any>{
console.log('>>> Service >> validaDescripcionRegistra [inicio]' + descripcion);
return this.http.get<any>(baseUrlPrueba+'/validaDescripcionRegistra?descripcion='+descripcion);
}

validaDescripcionActualiza(descripcion: string, id:number): Observable<any>{
  console.log('>>> Service >> validaDescripcionActualiza [inicio]' + descripcion);
  return this.http.get<any>(baseUrlPruebaCrud+'/validaDescripcionActualiza?descripcion='+descripcion + "&idGrupo="+id);
}

//PC2: CRUD de Ejemplo
registrarCrud(data:Grupo):Observable<any>{
  return this.http.post(baseUrlPruebaCrud+"/registraGrupo", data);
}
actualizarCrud(data:Grupo):Observable<any>{
  return this.http.put(baseUrlPruebaCrud+"/actualizaGrupo", data);
}
eliminarCrud(id:number):Observable<any>{
  return this.http.delete(baseUrlPruebaCrud+"/eliminaGrupo/"+id);
}
consultarCrud(filtro:string):Observable<any>{
  return this.http.get(baseUrlPruebaCrud+"/listaGrupoPorDescripcionLike/"+ filtro);
}





}
