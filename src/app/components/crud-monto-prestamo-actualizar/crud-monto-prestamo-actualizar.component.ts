import { Component, Inject, OnInit } from '@angular/core';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-monto-prestamo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-monto-prestamo-actualizar.component.html',
  styleUrl: './crud-monto-prestamo-actualizar.component.css'
})
export class CrudMontoPrestamoActualizarComponent {



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
        validaCapital: ['', [Validators.required, Validators.pattern('^\[0-9]{3,}$')] , this.validaCapital.bind(this)],
        validaDias: ['', [Validators.min(1)]],
        validaMonto: ['', [Validators.required,Validators.pattern('^[0-9]+(\.[0-9]+)?$')]],

    });




    // METODO CONSTRUCTOR
    constructor(
      private utilService:UtilService,
      private montoPrestamoService:MontoPrestamoService,
      private tokenService: TokenService,
      private formBuilder: FormBuilder,
              // del componente principal recibe el obejto solo 1 de la tabla pa actualizar
          // en el metodo   openDialogActualizar del controller
          @Inject(MAT_DIALOG_DATA) public data: MontoPrestamo){

                //Pasar el objeto a la variable
                        // ese obejto traidom del componente padre de su tabla lo pasamos al
                        // objeto ejemplo de mas arriba y con eso en la vista de aca el html lo pega
                        this.objMontoPrestamo = data;
    console.log(">>> constructor  >>> ");
    }






    // METODO CARGA AL INICIO
    ngOnInit(): void {
      this.utilService.listaDiasPrestamo().subscribe( data => {
        this.lstDias = data;
     } );
     this.objUsuario.idUsuario = this.tokenService.getUserId();

    }




    // METODO actualiza
    registraMontoPrestamo(){
      console.log(this.objMontoPrestamo)
      this.objMontoPrestamo.usuarioActualizacion = this.objUsuario;
      this.objMontoPrestamo.usuarioRegistro = this.objUsuario;
      this.montoPrestamoService.actualizarCrud(this.objMontoPrestamo).subscribe( data => {

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





    // METODO VALIDA CAPITAL y el id AL UPDATE
    validaCapital(control: FormControl) {
      console.log(">>> validaDescripcion [inicio] " + control.value);

       return this.montoPrestamoService.validaCapitalActualiza(control.value , this.objMontoPrestamo.idMontoPrestamo || 0 ).pipe(
         map((resp: any) => {
              console.log(">>> validaDescripcion [resp] " + resp.valid);
              // existeCapital : se pone en la vista en el hasError('existeCapital')
              return (resp.valid) ? null : {existeCapital: true} ;
            })
        );
    }




    // METODO PA SALIR
    salir() {

    }


}
