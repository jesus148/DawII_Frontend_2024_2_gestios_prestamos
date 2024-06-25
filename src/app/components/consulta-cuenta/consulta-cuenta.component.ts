import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { MatTableDataSource } from '@angular/material/table';
import { Cuenta } from '../../models/cuenta.model';

@Component({
  selector: 'app-consulta-cuenta',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-cuenta.component.html',
  styleUrl: './consulta-cuenta.component.css'
})
export class ConsultaCuentaComponent {

   //Datos para la Grila
   dataSource:any;

   //Clase para la paginacion
   @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

   //Cabecera
   displayedColumns = ["idCuenta","numero","entidadFinanciera","tipoMoneda","estado"];

   lstTipoMoneda : DataCatalogo[] = []
   //lista para recuperar el tipo de entidad
   lstTipoEntidad : DataCatalogo[]=[]
   //lista para recuperar entidades
   lstEntidadFinanciera : EntidadFinanciera[] = []
   selectedTipoEntidad: number = -1; 

   //filtro de la consulta
   numero: string = "";
   entidadFianciera: number = -1;
   estado: boolean = true;
   tipoMoneda: number = -1;


   constructor(private cuentaService: CuentaService,
          private utilService: UtilService) {
      console.log(">>> constructor  >>> ");
  }
  ngOnInit(){
    this.utilService.listaTipoMoneda().subscribe(
      x => this.lstTipoMoneda = x
  );
  this.utilService.listaTipoEntidadBancaria().subscribe(
    x => this.lstTipoEntidad = x
  );

  }

  consulta(){
    console.log(">>> refreshTable [ini]");
    console.log(">>> refreshTable >>> this.dias  >> " + this.tipoMoneda);
    console.log(">>> refreshTable >>> this.estado  >> " + this.estado);
    console.log(">>> refreshTable >>> this.pais  >> " + this.entidadFianciera);
    console.log(">>> refreshTable >>> this.nombre  >> " + this.numero);

     this.cuentaService.consultaCuentaCompleja(this.numero,
                                    this.entidadFianciera, this.estado?1:0, this.tipoMoneda).subscribe(
              x => {
                this.dataSource = new MatTableDataSource<Cuenta>(x);
                this.dataSource.paginator = this.paginator
              }
        );

        console.log(">>> refreshTable [fin]");
    }

    listaEntidades(){
      this.cuentaService.listaEntidades(this.selectedTipoEntidad).subscribe(
          x => this.lstEntidadFinanciera = x
      );
    }

  }
