import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';
import { PrestatarioService } from '../../services/prestatario.service';


@Component({
  selector: 'app-agregar-prestatario',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-prestatario.component.html',
  styleUrl: './agregar-prestatario.component.css'
})
export class AgregarPrestatarioComponent {

  formsRegistra = this.formBuilder.group({
    validaNombres: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaApellidos: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaLogin: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaDirec: ['', [Validators.required, Validators.pattern('[a-zA-Zá-úÁ-ÚñÑ ]{3,20}')]],
    validaFechaNacimiento: ['', Validators.required],
    validaDNI: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
    validaCorreo: ['', [Validators.required, Validators.email]],

  });

  objPrestatario: Usuario = {
    idUsuario: 0,
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
    private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    this.objUsuario.idUsuario = Number(this.tokenService.getUserId());
  }

  registra() {
    console.log(">>> OnInit [fin]" + this.objUsuario.idUsuario);
    this.objPrestatario.usuarioActualiza = this.objUsuario;
    this.objPrestatario.usuarioRegistro = this.objUsuario;
    this.objPrestatario.usuarioSuperior = this.objUsuario;
    console.log(">>> usuarioactualiza :" + this.objPrestatario.usuarioActualiza);
    this.objPrestatario.idUsuario = Number(this.tokenService.getUserId())
    this.prestatarioService.registrar(this.objPrestatario).subscribe(
      response => {
        Swal.fire({
          icon: 'info',
          title: 'Resultado del Registro',
          text: response.msg,
        });
        this.formsRegistra.reset();

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
            text: error.error.msg || 'Hubo un problema al registrar el prestatario. Por favor, inténtalo de nuevo más tarde.',
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

}
