import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinancieraService } from '../../services/entidad-financiera.service';
import { UtilService } from '../../services/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';

@Component({
  selector: 'app-consulta-entidad-finaciera',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-entidad-finaciera.component.html',
  styleUrl: './consulta-entidad-finaciera.component.css'
})
export class ConsultaEntidadFinacieraComponent {

  //Datos para la Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idEntidadFinanciera","nombre","gerente","entidad","estado",];

  //lista de días
lstTipoEntidad : DataCatalogo[] = [];

  //filtro de la consulta
  nombre:string = "";
  gerente:string = "";
  tipoEntidad:number = -1;
  estado:boolean = true;

  constructor(private entidadFinancieraService: EntidadFinancieraService,
              private utilService: UtilService ){
              console.log(">>> CONSTRUCTOR [inicio]");
  }

  ngOnInit(){
    console.log(">>> OnInit [inicio]");
    this.utilService.listaTipoEntidadBancaria().subscribe(
      x => this.lstTipoEntidad = x
    );
  }


  consulta(){
    console.log(">>> refreshTable [inicio]");
    console.log(">>> refreshTable >>> nombre: " + this.nombre);
    console.log(">>> refreshTable >>> gerente: "+ this.gerente);
    console.log(">>> refreshTable >>> tipoEntidad: "+ this.tipoEntidad);
    console.log(">>> refreshTable >>> estado: "+ this.estado);
    this.entidadFinancieraService.consultaEntidadFCompleja(this.nombre, this.gerente, this.tipoEntidad, this.estado?1:0).subscribe(
      x => {
        this.dataSource = new MatTableDataSource<EntidadFinanciera>(x);
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> refreshTable [fin]");
  }

}
