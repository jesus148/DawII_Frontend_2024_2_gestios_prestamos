import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  },tipoMoneda:{
  idDataCatalogo:-1
  },
  usuarioRegistro: {
    idUsuario: -1
},
usuarioActualiza: {
    idUsuario: -1
},  
}

lstEntidadFinanciera : EntidadFinanciera[] = []

lstTipoMoneda : DataCatalogo[] = []
lstTipoEntidad : DataCatalogo[]=[]
selectedEntidadFinanciera: number = -1;
selectedTipoEntidad: number = -1; 

objUsuario:Usuario={}

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

onTipoEntidadChange() {
  if (this.selectedTipoEntidad !== -1) { // Verifica si se ha seleccionado un tipo de entidad válido
      this.cuentaService.listaEntidadPorTipo(this.selectedTipoEntidad)
          .subscribe(data => {
              this.lstEntidadFinanciera = data; // Actualiza la lista de entidades financieras
          });
  } else {
      this.lstEntidadFinanciera = []; // Si no se selecciona ningún tipo de entidad, vacía la lista
  }
}

registrar(){
  console.log(">>> registra [inicio]");
        this.cuenta.usuarioActualiza = this.objUsuario;
        this.cuenta.usuarioRegistro = this.objUsuario;
        this.cuenta.entidadFinanciera!.idEntidadFinanciera = 1;
        console.log(">>> registra [inicio] " + this.cuenta);
        console.log(this.cuenta);
       
        
        this.cuentaService.registrar(this.cuenta).subscribe(
          x=>{
                Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
                this.cuenta ={
                  numero: "",
                  entidadFinanciera:{
                    idEntidadFinanciera :-1
                  },tipoMoneda:{
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



}
