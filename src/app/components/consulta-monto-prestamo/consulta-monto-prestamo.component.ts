import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from '../../services/util.service';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';

@Component({
  selector: 'app-consulta-monto-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-monto-prestamo.component.html',
  styleUrl: './consulta-monto-prestamo.component.css'
})
export class ConsultaMontoPrestamoComponent {



    //lista de días
    lstDias : DataCatalogo[] = [];





      // del front se guardara aca
      //filtro de la consulta compleja lo q se envia
  capital: string = "";
  estado: boolean = true; //valor q aparece al iniciar osea marcado el chek
  monto: number = 0;  //valor q aparece en input
  idDias:  string = "-1";




     //Datos para la Grilla donde se guarda toda la data
  dataSource:any;






  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;



      //Cabecera de la tabla
  // en el front en el matColumnDef debe poner igual , son basicamente los header de las columnas
  // recomendable poner igual a los campos de la clase guia , y el front debe poner todo esto o usar todo esto si no te sale error
  displayedColumns = ["idMontoPrestamo","capital","dias","monto","estado"] ;





      // CONSTRUCTOR AL INCIO , solo los service
      constructor(private montoPrestamoService: MontoPrestamoService,
        private utilService: UtilService) {
}





// inicia posterior al constructor
// inicia : recomendable buenas practicas al inicio debe ir aqui osea los metodos de carga
ngOnInit(): void {
  console.log(">>> ngOnInit [ini]");
  this.utilService.listaDiasPrestamo().subscribe(
    data => {this.lstDias = data; }
  );

}











  // METODO COSNULTA COMPLEJA
  consultar() {
    // imprime en consola
    console.log(">>> consultar [ini]");
    console.log("capital: ", this.capital);
    console.log("monto: ", this.monto);
    console.log("estado: ", this.estado);
    console.log("idDias: ", this.idDias);

    // llama al metodo del service y le envia los parametros guardados arriba
    // this.estado?1:0 : ternario si esta marcado vale 1 y si no vale el 0
    // this.longitud.toString() == "" ? -1 : this.longitud: la longitud lo convierte a string si esta vacio valdra -1 y si tiene valor le enviara eso
    //en orden segun el metodo del service
    this.montoPrestamoService.consultaMonto(this.capital,
      this.idDias,
      this.monto.toString() == "" ? -1 : this.monto,
      this.estado ? 1 : 0).subscribe(
      data => {
        // la data lo pone el ahi   dataSource:any;
        this.dataSource = data;
        this.dataSource.paginator = this.paginator;
      }
    );
    console.log(">>> consultar [fin]");
  }













}
