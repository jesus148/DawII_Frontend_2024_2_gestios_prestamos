import { Component, ViewChild } from '@angular/core';
import { Grupo } from '../../models/grupo.model';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { GrupoService } from '../../services/grupo.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from '../../models/usuario.model';
import { MatDialog } from '@angular/material/dialog';
import { CrudGrupoActualizarComponent } from '../crud-grupo-actualizar/crud-grupo-actualizar.component';
import { CrudGrupoAgregarComponent } from '../crud-grupo-agregar/crud-grupo-agregar.component';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-grupo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-grupo.component.html',
  styleUrl: './crud-grupo.component.css'
})
export class CrudGrupoComponent {

  dataSource:any;

  @ViewChild (MatPaginator, { static: true }) paginator!: MatPaginator;

 
  displayedColumns = ["idGrupo","descripcion","ubigeo","usuarioLider","estado","acciones"];

  filtro: string = "";

  objUsuario: Usuario = {} ;

  constructor(
    private dialogService: MatDialog, 
    private grupoService: GrupoService,
    private tokenService: TokenService,
    ) {
console.log(">>> constructor  >>> ");
}

openDialogRegistrar() {
  console.log(">>> openDialogRegistrar [ini]");
  const dialogRef = this.dialogService.open(CrudGrupoAgregarComponent);
  dialogRef.afterClosed().subscribe(result => {
        console.log('Dialog closed with result:', result);
        if (result != null && result === 1) {
          this.refreshTable();
        }
  });
  console.log(">>> openDialogRegistrar [fin]");
}

openDialogActualizar(obj: Grupo) {
  console.log(">>> openDialogActualizar [ini]");
  console.log("obj: ", obj);
  const dialogRef = this.dialogService.open(CrudGrupoActualizarComponent, {data: obj} );
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
  this.grupoService.consultarCrud(msgFiltro).subscribe(
        x => {
          this.dataSource = new MatTableDataSource<Grupo>(x);
          this.dataSource.paginator = this.paginator
        }
  );

  console.log(">>> refreshTable [fin]");
}

updateEstado(obj:Grupo) {
  console.log(">>> updateEstado [ini]");
  console.log("obj: ", obj);
  obj.estado = obj.estado == 1 ? 0 : 1;
  this.grupoService.actualizarCrud(obj).subscribe(
      x => {
          this.refreshTable();
      }
  );
   console.log(">>> updateEstado [fin]");
}

delete(obj: Grupo) {
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
              this.grupoService.eliminarCrud(obj.idGrupo || 0).subscribe(
                    x => {
                          this.refreshTable();
                          Swal.fire('Mensaje', x.mensaje, 'info');
                    }
              );
          }
    })   
}

}
