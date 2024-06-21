import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, Form, FormControl } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import {DataCatalogo} from '../../models/dataCatalogo.model';
import {SolicitudPrestamo} from '../../models/solicitud-prestamo.model'
import { MontoPrestamo } from '../../models/monto-prestamo.model';
import Swal from 'sweetalert2';  //importando para los mensajes
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo.service';



@Component({
  selector: 'app-crud-solicitud-prestamo-agregar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-solicitud-prestamo-agregar.component.html',
  styleUrl: './crud-solicitud-prestamo-agregar.component.css'
})
export class CrudSolicitudPrestamoAgregarComponent {
  
  // GLOBALES PARA COMBO Y REGISTRAR
// combo Dias prestamo
lstDias: DataCatalogo[] = [];
// combo capital
  capital: MontoPrestamo[] = [];
  // combo monto
  monto: MontoPrestamo[] = [];
  //lista de usuarios prestarios
  lstPrestatarios: Usuario[] = [];
  //usuario en sesion
  objUsuario: Usuario = {};

  // CARGANDO DATA PARA REGISTRAR
  objPrestamo: SolicitudPrestamo = {
    // dias
    dias: {
      idDataCatalogo: -1,
     },
  // capital
      capital: 0.0,
      montoPagar:0,
      // data string desde el front conertimos a date
      fechaInicioPrestamo: " ",
      fechaFinPrestamo: " ",
      usuarioPrestatario: {
          idUsuario: -1
      },
      usuarioRegistro: {
          idUsuario: -1
      },
      usuarioActualiza: {
          idUsuario: -1
      },

   };

  // VALIDACIONES
/*
   formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required]],
    validaDescripcion1: ['', [Validators.required]],
    validaDescripcion2: ['', [Validators.required]],
    validaPais: ['', [Validators.min(1)]],
    validaCapital: ['', [Validators.min(1)]],
    validaUsuario: ['', [Validators.min(1)]],

});
*/


}
