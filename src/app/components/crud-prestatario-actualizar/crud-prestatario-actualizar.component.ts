import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';

import { AbstractControl, FormBuilder, FormControl, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';
import { PrestatarioService } from '../../services/prestatario.service';
@Component({
  selector: 'app-crud-prestatario-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-prestatario-actualizar.component.html',
  styleUrl: './crud-prestatario-actualizar.component.css'
})
export class CrudPrestatarioActualizarComponent {

  formsRegistra = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaLogin: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')],this.validaLogin.bind(this)],
    validaDirec: ['', [Validators.required]],
    validaFechaNacimiento: ['', [Validators.required, validateAge(18)]],
    validaDNI: ['', [Validators.required, Validators.pattern('[0-9]{8}')],this.validaDni.bind(this)],
    validaCorreo: ['', [Validators.required, Validators.email]],

  });

  objPrestatario: Usuario = {
    nombres: "",
    apellidos: "",
    dni: "",
    login: "",
    correo: "",
    direccion: "",
    fechaNacimiento: undefined,
    usuarioSuperior: {
      idUsuario: -1
    },
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    },
  }

  objUsuario: Usuario = {}

  constructor(
    private tokenService: TokenService,
    private prestatarioService: PrestatarioService,
    private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: Usuario) {

    //Pasar el objeto a la variable
    this.objPrestatario = data;

  }


  ngOnInit() {
    this.objPrestatario.estado = Number(this.tokenService.getUserId());
  }

  registra() {
    console.log(">>> OnInit [fin]" + this.objUsuario.idUsuario);
    this.objPrestatario.usuarioActualiza = this.objUsuario;
    console.log(">>> usuarioactualiza :" + this.objPrestatario);
    this.prestatarioService.actualizarCrud(this.objPrestatario).subscribe(
      response => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: response.mensaje,
        });

        Object.keys(this.formsRegistra.controls).forEach(key => {
          this.formsRegistra.get(key)?.setErrors(null);
        })

      },
      error => {
        // Manejo de la respuesta de error
        if (error.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error en el Registro',
            text: error.error.mensaje || 'Hubo un problema al registrar el prestatario. Por favor, inténtalo de nuevo más tarde.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    );
  }

  validaDni(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);
    return this.prestatarioService.validaDniActualiza(control.value, this.objPrestatario.idUsuario || 0).pipe(
      map((resp: any) => {
        console.log(">>> validaDescripcion [resp] " + resp.valid);
        return (resp.valid) ? null : { existeDni: true };
      })
    );
  }
  validaLogin(control: FormControl) {
    console.log(">>> validaDescripcion [inicio] " + control.value);
    return this.prestatarioService.validaLoginActualiza(control.value, this.objPrestatario.idUsuario || 0).pipe(
      map((resp: any) => {
        console.log(">>> validaDescripcion [resp] " + resp.valid);
        return (resp.valid) ? null : { existeLogin: true };
      })
    );
  }
}

export function validateAge(minAge: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null; // Si no se proporciona ninguna fecha, la validación pasa.
    }

    const today = new Date();
    const birthDate = new Date(control.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Restar 1 si aún no ha pasado el cumpleaños de este año.
    }

    return age >= minAge ? null : { 'minAge': true };
  };


}
