import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../../menu/menu.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app.material.module';
import { map } from 'rxjs';
import { Cuenta } from '../../models/cuenta.model';
import { Usuario } from '../../models/usuario.model';
import { DataCatalogo } from '../../models/dataCatalogo.model';
import { EntidadFinanciera } from '../../models/entidad-financiera.model';
import { CuentaService } from '../../services/cuenta.service';
import { UtilService } from '../../services/util.service';
import { TokenService } from '../../security/token.service';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-crud-cuenta-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-cuenta-actualizar.component.html',
  styleUrl: './crud-cuenta-actualizar.component.css'
})
export class CrudCuentaActualizarComponent {
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
    validaNumero: ['', [Validators.required, Validators.pattern('^[0-9]{20}$')], this.validaNumeroCuentaActualiza.bind(this)],
    validaTipoEntidad: ['', [Validators.min(1)]],
    validaEntidadFinanciera: ['', [Validators.min(1)]],
    validaNombreEntidad: [{ value: '', disabled: true }], // Campo para mostrar el nombre de la entidad
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
    private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Cuenta) {

    console.log(">>> constructor  >>> ");
  //Pasar el objeto a la variable
            this.cuenta = data;

            this.formRegistrar.patchValue({
              validaNumero: this.cuenta.numero,
              validaTipoEntidad: this.cuenta.entidadFinanciera?.tipoEntidad?.idDataCatalogo?.toString() || null,
              validaEntidadFinanciera: this.cuenta.entidadFinanciera?.idEntidadFinanciera?.toString() || null,
              validaTipoMoneda: this.cuenta.tipoMoneda?.idDataCatalogo?.toString() || null
            });}

            ngOnInit(){
              this.utilService.listaTipoMoneda().subscribe(
                x => this.lstTipoMoneda = x
            );
            this.utilService.listaTipoEntidadBancaria().subscribe(
              x => this.lstTipoEntidad = x
            );

            // Si ya hay un tipo de entidad seleccionado, llamar listaEntidades() para llenar las entidades correspondientes
            if (this.cuenta.entidadFinanciera?.tipoEntidad?.idDataCatalogo) {
              this.selectedTipoEntidad = this.cuenta.entidadFinanciera.tipoEntidad.idDataCatalogo;
              this.listaEntidades();
            }
          
        

            this.objUsuario.idUsuario = this.tokenService.getUserId();
            console.log(">>> OnInit >>> 1 >> " + this.lstTipoMoneda);
            console.log(">>> OnInit >>> " + this.lstEntidadFinanciera);
            console.log(">>> OnInit [fin]");   
            }
            
            
            actualiza(){
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



  
 validaNumeroCuentaActualiza(control: FormControl) {
  console.log(">>> validaDescripcion [inicio] " + control.value);
  return this.cuentaService.validaNumeroCuentaActualiza(control.value, this.cuenta.idCuenta || 0).pipe(
     map((resp: any) => { 
          console.log(">>> validaNumero [resp] " + resp.valid);
          return (resp.valid) ? null : {existenNumero: true} ;    
        })
    );
}
  salir() {
    
  }
  
}