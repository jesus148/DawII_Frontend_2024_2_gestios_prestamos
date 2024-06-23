import { Component, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { SolicitudPrestamo } from '../../models/solicitud-prestamo.model';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CrudSolicitudPrestamoAgregarComponent } from '../crud-solicitud-prestamo-agregar/crud-solicitud-prestamo-agregar.component';
import { CrudSolicitudPrestamoActualizarComponent } from '../crud-solicitud-prestamo-actualizar/crud-solicitud-prestamo-actualizar.component';

@Component({
  selector: 'app-crud-solicitud-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-solicitud-prestamo.component.html',
  styleUrl: './crud-solicitud-prestamo.component.css'
})
export class CrudSolicitudPrestamoComponent {

  //Datos para la Grila
  dataSource:any;

  //Clase para la paginacion
  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

  //Cabecera
  displayedColumns = ["idSolicitud","capital","dias","montoPagar","fechaInicioPrestamo","fechaFinPrestamo","estado","acciones"];

  //filtro de la consulta
  filtro: string = "";

  objUsuario: Usuario = {} ;

  constructor(private SolicitudPrestamoService: SolicitudPrestamoService,
    private dialogService: MatDialog, 
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
    this.objUsuario.idUsuario = tokenService.getUserId();
  console.log(">>> constructor  >>> ");
  }

  refreshTable(){
    console.log(">>> refreshTable [ini]");
    var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
    this.SolicitudPrestamoService.consultarCrud(msgFiltro).subscribe(
          x => {
            this.dataSource = new MatTableDataSource<SolicitudPrestamo>(x);
            this.dataSource.paginator = this.paginator
          }
    );

    console.log(">>> refreshTable [fin]");
}

openDialogRegistrar() {
  console.log(">>> openDialogRegistrar [ini]");
  const dialogRef = this.dialogService.open(CrudSolicitudPrestamoAgregarComponent);
  dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
  });
  console.log(">>> openDialogRegistrar [fin]");
}

openDialogActualizar(obj: SolicitudPrestamo) {
  console.log(">>> openDialogActualizar [ini]");
  console.log("obj: ", obj);
  const dialogRef = this.dialogService.open(CrudSolicitudPrestamoActualizarComponent, {data: obj} );
  dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && (result === 1 || result === 2)) {
            this.refreshTable();
      }
  });
  console.log(">>> openDialogActualizar [fin]");
}

updateEstado(obj:SolicitudPrestamo) {
  console.log(">>> updateEstado [ini]");
  console.log("obj: ", obj);
  obj.estado = obj.estado == 1 ? 0 : 1;
  this.SolicitudPrestamoService.actualizarCrud(obj).subscribe(
      x => {
          this.refreshTable();
      }
  );
   console.log(">>> updateEstado [fin]");
}

  delete(obj: SolicitudPrestamo) {
    Swal.fire({
      title: '¿Desea eliminar?',
      text: "Los cambios no se van a revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina',
      cancelButtonText: 'No, cancelar'
      }).then((result) => {
            if (result.isConfirmed) {
                this.SolicitudPrestamoService.eliminarCrud(obj.idSolicitud || 0).subscribe(
                      x => {
                            this.refreshTable();
                            Swal.fire('Mensaje', x.mensaje, 'info');
                      }
                );
            }
      })   
}

}
