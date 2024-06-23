import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CuentaService } from '../../services/cuenta.service';
import { TokenService } from '../../security/token.service';
import { CrudCuentaAgregarComponent } from '../crud-cuenta-agregar/crud-cuenta-agregar.component';
import { Cuenta } from '../../models/cuenta.model';
import { CrudEjemploActualizarComponent } from '../crud-ejemplo-actualizar/crud-ejemplo-actualizar.component';
import { MatTableDataSource } from '@angular/material/table';
import { CrudCuentaActualizarComponent } from '../crud-cuenta-actualizar/crud-cuenta-actualizar.component';



@Component({
  selector: 'app-crud-cuenta',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta.component.html',
  styleUrl: './crud-cuenta.component.css'
})
export class CrudCuentaComponent {


 //Datos para la Grila
 dataSource:any;

 //Clase para la paginacion
 @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

 //Cabecera
 displayedColumns = ["idCuenta", "numero", "entidadFinanciera", "tipoMoneda", "estado", "acciones"];

 //filtro de la consulta
 filtro: string = "";

 objUsuario: Usuario = {} ;
 
 constructor(private dialogService: MatDialog, 
             private cuentaService: CuentaService,
             private tokenService: TokenService ){
     this.objUsuario.idUsuario = tokenService.getUserId();
 }

 openDialogRegistrar() {
  console.log(">>> openDialogRegistrar [ini]");
  const dialogRef = this.dialogService.open(CrudCuentaAgregarComponent);
  dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
  });
  console.log(">>> openDialogRegistrar [fin]");
}

openDialogActualizar(obj: Cuenta) {
  console.log(">>> openDialogActualizar [ini]");
  console.log("obj: ", obj);
  const dialogRef = this.dialogService.open(CrudCuentaActualizarComponent, {data: obj} );
  dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
      if (result != null && (result === 1 || result === 2)) {
            this.refreshTable();
      }
  });
  console.log(">>> openDialogActualizar [fin]");
}

refreshTable(){
  console.log(">>> refreshTable [ini]");
  var msgFiltro = this.filtro == "" ? "todos":  this.filtro;
  this.cuentaService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Cuenta>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}

updateEstado(obj:Cuenta) {
  console.log(">>> updateEstado [ini]");
  console.log("obj: ", obj);
  obj.estado = obj.estado == 1 ? 0 : 1;
  this.cuentaService.actualizarCrud(obj).subscribe(
      x => {
          this.refreshTable();
      }
  );
   console.log(">>> updateEstado [fin]");
}

delete(obj: Cuenta) {
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
              this.cuentaService.eliminarCrud(obj.idCuenta || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })   
}

}
