import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';
import Swal from 'sweetalert2'
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { Cuenta } from '../../models/cuenta.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { Usuario } from '../../models/usuario.model';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import { Data } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'app-agregar-cuenta',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './agregar-cuenta.component.html',
  styleUrl: './agregar-cuenta.component.css'
})
export class AgregarCuentaComponent {
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
  this.validaNumeroCuenta.bind(this)],
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



constructor(private cuentaService : CuentaService,
  private utilService : UtilService,
  private tokenService : TokenService,
  private formBuilder : FormBuilder
){
  console.log(">>> constructor  >>> ");

}

ngOnInit(){
  this.utilService.listaTipoMoneda().subscribe(
    x => this.lstTipoMoneda = x
);
this.utilService.listaTipoEntidadBancaria().subscribe(
  x => this.lstTipoEntidad = x
);
this.objUsuario.idUsuario = this.tokenService.getUserId();
console.log(">>> OnInit >>> 1 >> " + this.lstTipoMoneda);
console.log(">>> OnInit >>> " + this.lstEntidadFinanciera);
console.log(">>> OnInit [fin]");   
}


registrar(){
  console.log(">>> registra [inicio]");
        this.cuenta.usuarioActualiza = this.objUsuario;
        this.cuenta.usuarioRegistro = this.objUsuario;
      
        console.log(">>> registra [inicio] " + this.cuenta);
        console.log(this.cuenta);
        console.log(this.cuenta.tipoMoneda!.idDataCatalogo)
        
        this.cuentaService.registrar(this.cuenta).subscribe(
          x=>{
                Swal.fire({ icon: 'info',title: 'Resultado del Registro',text: x.mensaje,});
                this.cuenta = {
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
                  }  

                }


                this.formRegistrar.reset();
                this.formRegistrar.markAsPristine
            },
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

