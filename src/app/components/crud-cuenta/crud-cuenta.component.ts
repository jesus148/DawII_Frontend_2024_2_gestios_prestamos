import { Component, Inject, ViewChild } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Cuenta } from '../../models/cuenta.model';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { CrudCuentaAgregarComponent } from '../crud-cuenta-agregar/crud-cuenta-agregar.component';
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


}
