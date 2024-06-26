import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Ubigeo } from '../../models/ubigeo.model';
import { MatPaginator } from '@angular/material/paginator';
import { GrupoService } from '../../services/grupo.service';
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-consulta-grupo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-grupo.component.html',
  styleUrl: './consulta-grupo.component.css'
})
export class ConsultaGrupoComponent {

   //listas de ubigeo 
   departamentos : string[] = [];
   provincias : string[] = [];
   distritos: Ubigeo[] = [];
 
   //lista de Jefe de Prestamistas
   lstJefePrestamista: Usuario[] = [];
     
   //Filtro de la consulta
   descripcion: string = "";
   idprovincia:string = "";
   iddepartamento:string ="";
   idUbigeo: number = -1;
   estado: boolean = true;
   idLiderUsu: number = -1;
  
   //Datos para la Grila
   dataSource:any;
 
   //Clase para la paginacion
   @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
 
   //Cabecera
   displayedColumns = ["idGrupo","descripcion","idUigeo","estado","idLiderUsu"];
 
   constructor(private grupoService: GrupoService,
               private utilService: UtilService) {
   }
   
   ngOnInit() {
       console.log(">>> ngOnInit [ini]");
       this.utilService.listaJefePrestamistaTotales().subscribe(
         data => { this.lstJefePrestamista = data; }
       );
       this.utilService.listarDepartamento().subscribe(
         data => {this.departamentos = data; }
       );
       console.log(">>> ngOnInit [fin]");
   }
 
   consultar() {
  
     this.grupoService.consultarGrupo( 
       this.descripcion,
       this.idUbigeo,
       this.estado ? 1 : 0,
       this.idLiderUsu).subscribe(
       data => {
         this.dataSource = data;
         this.dataSource.paginator = this.paginator;
       }
     );
     console.log(">>> consultar [fin]");
   }
 

   listaProvincia(){
    this.utilService.listaProvincias(this.iddepartamento).subscribe(
        x => this.provincias = x
    );
  }
  
  listaDistrito(){
     this.utilService.listaDistritos(this.iddepartamento,this.idprovincia).subscribe(
        x => this.distritos = x
    );
  }

}
