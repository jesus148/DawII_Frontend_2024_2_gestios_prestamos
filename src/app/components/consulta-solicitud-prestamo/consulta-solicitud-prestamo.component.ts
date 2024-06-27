import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo.service';

@Component({
  selector: 'app-consulta-solicitud-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-solicitud-prestamo.component.html',
  styleUrl: './consulta-solicitud-prestamo.component.css'
})
export class ConsultaSolicitudPrestamoComponent {


    //Datos para la Grila
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;
  
    //Cabecera
    displayedColumns = ["idSolicitud","capital","dias","montoPagar","fechaInicioPrestamo","fechaFinPrestamo","estado"];
  
     // GLOBALES PARA COMBO Y REGISTRAR

    // combo Dias prestamo
      lstDias: DataCatalogo[] = [];
      //Filtro de la consulta
      capital: number = 0;
      dias: number = -1;
      montoPagar: number = 0;
      fechaInicioPrestamo: Date = new Date();
      fechaFinPrestamo: Date = new Date();
      estado: boolean = true;

        //Filtro de la consulta
        capital2: number = 0;
        dias2: number = -1;
        montoPagar2: number = 0;
        estado2: boolean = true;
      
      constructor(private solicitudService : SolicitudPrestamoService,
        private utilService: UtilService) {
    }

          ngOnInit() {
          console.log(">>> ngOnInit [ini]");
        
          this.utilService.listaDiasPrestamo().subscribe(
          data => {this.lstDias = data; }
          );
          console.log(">>> ngOnInit [fin]");
      }

      consultar() {
        console.log(">>> consultar [ini]");
        console.log("capital: ", this.capital);
        console.log("dias: ", this.dias);
        console.log("montoPagar: ", this.montoPagar);
        console.log(">>> fechaInicioPrestamo: "+this.fechaInicioPrestamo.toISOString());
        console.log(">>> fechaFinPrestamo: "+this.fechaFinPrestamo.toISOString());
        console.log("estado: ", this.estado);
        
        
    
        this.solicitudService.consultaSolicitudPrestamo(this.capital,
                                            this.dias,
                                            this.montoPagar,
                                            this.fechaInicioPrestamo.toISOString(), 
                                            this.fechaFinPrestamo.toISOString(), 
                                            this.estado ? 1 : 0).subscribe(
                                            data => {
                                            this.dataSource = data;
                                            this.dataSource.paginator = this.paginator;
          }
        );
        console.log(">>> consultar [fin]");
      }

      consultar2() {
        console.log(">>> consultar [ini]");
        console.log("capital: ", this.capital2);
        console.log("dias: ", this.dias2);
        console.log("montoPagar: ", this.montoPagar2);
        console.log("estado: ", this.estado2);
        
        
    
        this.solicitudService.consultaSolicitud(this.capital2,
                                                this.dias2,
                                                this.montoPagar2,               
                                                this.estado2 ? 1 : 0).subscribe(
                                                data => {
                                                this.dataSource = data;
                                                this.dataSource.paginator = this.paginator;
              }
        );
        console.log(">>> consultar [fin]");
      }
}
