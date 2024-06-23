import { Component , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import { MatTableDataSource } from '@angular/material/table';
import { TokenService } from '../../security/token.service';
import { MontoPrestamo } from '../../models/monto-prestamo.model';
// importancion para los mensajes de confirmacion o eliminacion
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crud-monto-prestamo',
  standalone: true,
      //agegamos esto de los imports , recordar poner arriba sus imports
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-monto-prestamo.component.html',
  styleUrl: './crud-monto-prestamo.component.css'
})



export class CrudMontoPrestamoComponent {





  //Datos para la Grila
  // cuando importes importa el 1

  // la data se pondra aca para listar todo en la tabla
    dataSource:any;

    //Clase para la paginacion
    @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

    //Cabecera de la tabla
  // en el front en el matColumnDef debe poner igual , son basicamente los header de las columnas
  // recomendable poner igual a los campos de la clase guia , y el front debe poner todo esto o usar todo esto si no te sale error
    displayedColumns = ["idMontoPrestamo","capital","dias","monto","estado"];

    //filtro de la consulta pa listar
    filtro: string = "";


    // usuario logueado
    objUsuario: Usuario = {} ;

    // Contructor se usa al inciar
    constructor(private dialogService: MatDialog, //importar esto para los modales
                private montoPrestamoService: MontoPrestamoService,
                private tokenService: TokenService ){
                  // usuariologueado
        this.objUsuario.idUsuario = tokenService.getUserId();
    }









    // METODO PA REGISTRAR muestra el modal registrar
      // los modales son componentes
      openDialogRegistrar() {
        console.log(">>> openDialogRegistrar [ini]");


        console.log(">>> openDialogRegistrar [fin]");
      }













          // METODO PA ACTUALIZAR y mostral el modal actulizar
          // los modales son componentes
          openDialogActualizar(obj: MontoPrestamo) {
            console.log(">>> openDialogActualizar [ini]");
            console.log("obj: ", obj);


            console.log(">>> openDialogActualizar [fin]");
          }









      // METODO LISTAR TODO

    refreshTable(){
      console.log(">>> refreshTable [ini]");
      // verificando parametro de envio pa listar
        // filtro : si el filtro del front pa listar esta vacio tendra valor "todos"(pa listar todo)
  // y si no se agrega la data osea el parametro del front
      var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
      this.montoPrestamoService.consultarCrud(msgFiltro).subscribe(
            // data de regreso pa listar y poner en la tabla
            x => {
              // guarda la data en el dataSource
                // dataSource : donde pondra toda la data
          // le pasamos la data a listar y lo ponemos en el dataSource pa llevarlo al front
              this.dataSource = new MatTableDataSource<MontoPrestamo>(x);
              this.dataSource.paginator = this.paginator
            }
      );

      console.log(">>> refreshTable [fin]");
  }









    // METODO CAMBIAR EL ESTADO
    // recibe un objeto de la grilla del html solo 1
    updateEstado(obj:MontoPrestamo) {
      console.log(">>> updateEstado [ini]");
      console.log("obj: ", obj);
      // desde el front se cambia el valor , si es 1 valdra 0 y si es 0 valdra 1 en la bd
      obj.estado = obj.estado == 1 ? 0 : 1;
      // metodo del serivice envia el objeto modificado
      this.montoPrestamoService.actualizarCrud(obj).subscribe(
        // refrescando la tabla osea listado de nuevo
          x => {
              this.refreshTable();
          }
      );
       console.log(">>> updateEstado [fin]");
  }











// METODO PARA ELIMINAR UN OJETO DE LA TABLA
// import Swal from 'sweetalert2'; recordar importar esto
// los metodos siempore poner al final
delete(obj: MontoPrestamo) {
  // Mensaje q aparecera al dar en el icono delete en la lista de la tabla
  Swal.fire({
    // estos son los estilos del modal del mensaje eliminar
    title: '¿Desea eliminar?',
    text: "Los cambios no se van a revertir",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, elimina',
    cancelButtonText: 'No, cancelar'
    }).then((result) => {
      // si apretas el ok
          if (result.isConfirmed) {
            // metodo del service elimina el objeto a partir de su id le envias el id
            //||
              this.montoPrestamoService.eliminarCrud(obj.idMontoPrestamo || 0).subscribe(
                    x => {
                      // refrescas la tabla pa listar todo
                          this.refreshTable();
                          // el metodo de eliminar en el back devuelve un mensaje aca lo muestra
                          // x.mensaje : = en el back
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })
}






}
