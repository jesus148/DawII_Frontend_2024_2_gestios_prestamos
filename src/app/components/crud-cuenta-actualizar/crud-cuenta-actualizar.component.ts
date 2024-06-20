import { Component, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cuenta } from '../../models/cuenta.model';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AppMaterialModule } from '../../app.material.module';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';



@Component({
  selector: 'app-crud-cuenta-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta-actualizar.component.html',
  styleUrl: './crud-cuenta-actualizar.component.css'
})
export class CrudCuentaActualizarComponent {


  constructor(private cuentaService : CuentaService,
    private utilService : UtilService ,
    private tokenService : TokenService,
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta
  ){
    this.cuenta = data;
    console.log(">>> constructor  >>> ");
  
  }

    cuenta : Cuenta ={
    numero: "",
    entidadFinanciera:{
      idEntidadFinanciera :-1
    },
    tipoMoneda:{
    idDataCatalogo:-1
    },
    usuarioRegistro: {
      idUsuario: -1
    },
    usuarioActualiza: {
      idUsuario: -1
    },  
  }

  formRegistrar = this.formBuilder.group({
    validaNumero: ['', [Validators.required, Validators.pattern('^[0-9]{20}$')],
    ],
    validaTipoEntidad: ['', [Validators.min(1)]],
    validaEntidadFinanciera: ['', [Validators.min(1)]],
    validaTipoMoneda: ['', [Validators.min(1)]],
  });

//lista de usuario
objUsuario:Usuario={}
//lista para recuperar el tipo de moneda
lstTipoMoneda : DataCatalogo[] = []
//lista para recuperar el tipo de entidad
lstTipoEntidad : DataCatalogo[]=[]
//lista para recuperar entidades
lstEntidadFinanciera : EntidadFinanciera[] = []
//variable para recuperar el id del tipo de entidad 
selectedTipoEntidad: number = -1; 


ngOnInit(){
  this.utilService.listaTipoMoneda().subscribe(
    x => this.lstTipoMoneda = x
);
this.utilService.listaTipoEntidadBancaria().subscribe(
  x => this.lstTipoEntidad = x
);
this.objUsuario.idUsuario = this.tokenService.getUserId();

}

actualiza() {
  console.log(">>> actualiza [inicio]");
  this.cuenta.usuarioActualiza = this.objUsuario;
  this.cuenta.usuarioRegistro = this.objUsuario;
  console.log(">>> actualiza [inicio] ", this.cuenta);


  this.cuentaService.actualizarCrud(this.cuenta).subscribe(
    x=>{
          Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
          this.cuenta ={
            numero: "",
            entidadFinanciera:{
              idEntidadFinanciera :-1
            },
            tipoMoneda:{
            idDataCatalogo:-1
            },
            usuarioRegistro: {
              idUsuario: -1
            },
            usuarioActualiza: {
              idUsuario: -1
            },  
              }
      }
  );
}

listaEntidades(){
  this.cuentaService.listaEntidades(this.selectedTipoEntidad).subscribe(
      x => this.lstEntidadFinanciera = x
  );
}


validaNumeroCuenta(control: FormControl) {
  console.log(">>> validaNombre [inicio] " + control.value);
  
   return this.cuentaService.validaNumeroCuenta(control.value).pipe(
     map((resp: any) => { 
          return (resp.valid) ? null : {existenumero: false} ;    
        })
    );
}

}
