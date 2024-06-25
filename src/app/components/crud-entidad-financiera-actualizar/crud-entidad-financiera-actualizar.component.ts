import { Component, Inject, inject } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { Ubigeo } from '../../models/ubigeo.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { EntidadFinancieraService } from '../../services/entidad-financiera.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { map } from 'rxjs';

@Component({
  selector: 'app-crud-entidad-financiera-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-entidad-financiera-actualizar.component.html',
  styleUrl: './crud-entidad-financiera-actualizar.component.css'
})
export class CrudEntidadFinancieraActualizarComponent {


  entidadFinanciera: EntidadFinanciera ={
    nombre: "",
    gerente: "",
    tipoEntidad:{
      idDataCatalogo:-1
    },
    ubigeo:{
        idUbigeo:-1,
        departamento:"-1",
        provincia:"-1",
        distrito:"-1",
    },
    usuarioRegistro: {
        idUsuario: -1
    },
    usuarioActualiza: {
        idUsuario: -1
    },
  }

  formRegistrar = this.formBuilder.group({
    validaNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')],
    this.validaNombre.bind(this)],
    validaGerente: ['', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]],
    validaTipoEntidad: ['', [Validators.min(1)]],
    validaDepartamento: ['', [Validators.min(1)]],
    validaProvincia: ['', [Validators.min(1)]],
    validaDistrito: ['', [Validators.min(1)]],
   
});

//listas de ubigeo 
departamentos : string[] = [];
provincias : string[] = [];
distritos: Ubigeo[] = [];

//lista de días
lstTipoEntidad : DataCatalogo[] = [];

objUsuario: Usuario = {};

constructor(private entidadFinancieraService: EntidadFinancieraService,
  private utilService: UtilService,
  private tokenService: TokenService,
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: EntidadFinanciera){
    this.entidadFinanciera = data;
console.log(">>> constructor  >>> ");
}

    ngOnInit() {
      console.log(">>> OnInit [inicio]");
    this.utilService.listaTipoEntidadBancaria().subscribe(
      x => this.lstTipoEntidad = x
    );
    
    this.utilService.listarDepartamento().subscribe(
      x => this.departamentos = x
    );
    //Cargar las provincias y distritos [inicio]
    this.utilService.listaProvincias(this.entidadFinanciera.ubigeo?.departamento).subscribe(
      x => this.provincias = x
    );
    this.utilService.listaDistritos(this.entidadFinanciera.ubigeo?.departamento,this.entidadFinanciera.ubigeo?.provincia).subscribe(
      x => this.distritos = x
    );
    //Cargar las provincias y distritos [fin]

    this.objUsuario.idUsuario = this.tokenService.getUserId();
    console.log(">>> OnInit >>> 1 >> " + this.lstTipoEntidad.length);
    console.log(">>> OnInit >>> " + this.departamentos);
    console.log(">>> OnInit [fin]");      
  }

    actualiza() {
      console.log(">>> actualiza [inicio]");
      this.entidadFinanciera.usuarioActualiza = this.objUsuario;
      this.entidadFinanciera.usuarioRegistro = this.objUsuario;
      console.log(">>> actualiza [inicio] " + this.entidadFinanciera);
      console.log(this.entidadFinanciera);

      this.entidadFinancieraService.actualizarCrud(this.entidadFinanciera).subscribe(
        x => {
          Swal.fire({
            icon: 'success',
            title: 'Resultado de la actualización',
            text: x.mensaje, 
          });


          this.formRegistrar.reset();
          this.formRegistrar.markAsPristine();
        },
      );
    }

    validaNombre(control: FormControl) {
      console.log(">>> validaNombre [inicio] " + control.value);
      
       return this.entidadFinancieraService.validaNombreActualiza(control.value, this.entidadFinanciera.idEntidadFinanciera || 0).pipe(
         map((resp: any) => { 
              console.log(">>> validaNombre [resp] " + resp.valid);
              return (resp.valid) ? null : {existeNombre: true} ;    
            })
        );
    }
    
    listaProvincia(){
      console.log("listaProvincia>>> " + this.entidadFinanciera.ubigeo?.departamento);
      this.utilService.listaProvincias(this.entidadFinanciera.ubigeo?.departamento).subscribe(
          x => this.provincias = x
      );
    }
    
    listaDistrito(){
      console.log("listaDistrito>>> " + this.entidadFinanciera.ubigeo?.departamento);
      console.log("listaDistrito>>> " + this.entidadFinanciera.ubigeo?.provincia);
      this.utilService.listaDistritos(this.entidadFinanciera.ubigeo?.departamento,this.entidadFinanciera.ubigeo?.provincia).subscribe(
          x => this.distritos = x
      );
    }
    
    salir(){}

}
