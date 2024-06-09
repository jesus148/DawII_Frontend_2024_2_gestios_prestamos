
import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, FormBuilder, Validators, ReactiveFormsModule, Form, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { UtilService } from '../../services/util.service';
import { MontoPrestamo } from '../../models/monto-prestamo.model';
import { MontoPrestamoService } from '../../services/monto-prestamo.service';
import Swal from 'sweetalert2'
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';

@Component({
  selector: 'app-agregar-monto-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-monto-prestamo.component.html',
  styleUrl: './agregar-monto-prestamo.component.css'
})
export class AgregarMontoPrestamoComponent {

  //lista de días
  lstDias : DataCatalogo[] = [];
  //usuario en sesion
  objUsuario: Usuario = {};

  objMontoPrestamo: MontoPrestamo ={
      capital: 0,
      dias: {
        idDataCatalogo: -1,
      },
      monto: 0,
     
      usuarioRegistro: {
        idUsuario: -1
    },
      usuarioActualizacion: {
        idUsuario: -1
    },
   


  }

  formRegistrar = this.formBuilder.group({
      validaCapital: ['', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
      validaDias: ['', [Validators.min(1)]],
      validaMonto: ['', [Validators.required,Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],
    
  });


  constructor(
    private utilService:UtilService,
    private montoPrestamoService:MontoPrestamoService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
  console.log(">>> constructor  >>> ");
  }

  ngOnInit(): void {
    this.utilService.listaDiasPrestamo().subscribe( data => { 
      this.lstDias = data; 
   } );
   this.objUsuario.idUsuario = this.tokenService.getUserId();

  }

  registraMontoPrestamo(){
    console.log(this.objMontoPrestamo)
    this.objMontoPrestamo.usuarioActualizacion = this.objUsuario;
    this.objMontoPrestamo.usuarioRegistro = this.objUsuario;
    this.montoPrestamoService.registraMontoPrestamo(this.objMontoPrestamo).subscribe( data => {
   
      Swal.fire({
        title: "Resultado",
        text: data.mensaje,
        icon: "info"
        
      });
      this.objMontoPrestamo ={
        capital: 0,
        dias: {
          idDataCatalogo: -1,
        },
        monto: 0,
       
        usuarioRegistro: {
          idUsuario: -1
      },
        usuarioActualizacion: {
          idUsuario: -1
      },
      }

    });
  }
    
}
