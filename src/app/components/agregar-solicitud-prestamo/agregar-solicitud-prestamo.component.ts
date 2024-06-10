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
import {MontoPrestamo} from '../../models/monto-prestamo.model'
import Swal from 'sweetalert2';  //importando para los mensajes
import { UtilService } from '../../services/util.service';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo.service';


@Component({
  selector: 'app-agregar-solicitud-prestamo',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule ,MatFormFieldModule, MatInputModule, MatDatepickerModule],
  templateUrl: './agregar-solicitud-prestamo.component.html',
  styleUrl: './agregar-solicitud-prestamo.component.css'
})
export class AgregarSolicitudPrestamoComponent {


  // GLOBALES PARA COMBO Y REGISTRAR

// combo Dias prestamo
  lstDias: DataCatalogo[] = [];



// combo capital
  MontoPres: MontoPrestamo[] = [];



  capitaMonto : string[] = [];


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
     idEstadoSolcitud:{
      idDataCatalogo: 12 ,
     },

  // capital
      capital: 0.0,
      montoPagar:0,
      fechaInicioPrestamo: undefined,
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





  formRegistrar = this.formBuilder.group({
    validaPais: ['', [Validators.min(1)]],
    validaCapital: ['', [Validators.min(1)]],
    validaUsuario: ['', [Validators.min(1)]],

});



  // CONSTRUCTOR

  constructor(private solicitudPrestamoService: SolicitudPrestamoService ,private utilService:UtilService,    private tokenService: TokenService,
    private formBuilder: FormBuilder) {

    utilService.listaDiasPrestamo().subscribe(
      x   =>   this.lstDias=x
    )

    utilService.listaCapitalMonto().subscribe(
      x   =>   this.MontoPres=x
    )

          // usuario actual
this.objUsuario.idUsuario = this.tokenService.getUserId();
  }










  registrar(){

  // LLENANDO LA DATA Q FALTA AL OBJETO EJEMPLO PA REGISTRAR
  console.log(">>> registra [inicio]");
    this.objPrestamo.usuarioActualiza = this.objUsuario;
    this.objPrestamo.usuarioRegistro = this.objUsuario;

    console.log(">>> fecha inicio " + this.objPrestamo.fechaInicioPrestamo);
    console.log(">>> fecha inicio " + this.objPrestamo.usuarioActualiza?.idUsuario);


    console.log(" id estado" + this.objPrestamo.idEstadoSolcitud?.idDataCatalogo);
    console.log(this.objPrestamo);
        // ENVIANDO LA DATA CARGADA
        this.solicitudPrestamoService.registrar(this.objPrestamo).subscribe(
          x=>{
                Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
                this.objPrestamo = {
                  // dias
                  dias: {
                    idDataCatalogo: -1,
                   },
                   idEstadoSolcitud:{
                    idDataCatalogo: 12,
                   },

                // capital
                    capital: 0.0,
                    montoPagar:0,
                    fechaInicioPrestamo: undefined,
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

            }
        );

  }









  // LISTAR COMBO CUANDO SELECCIONES OTRO COMBO OSEA RELACIONA SEGUN Q DISTRITO HAYAS SELECCIONADO
  PonerMonto(){
    console.log("PonerMonto>>> " + this.objPrestamo.capital);
    this.utilService.listaMontoSegunCapital(this.objPrestamo?.capital).subscribe(
        x => this.capitaMonto = x
    );
}





  //  AL INCICIO CARGA ESTO
  ngOnInit() {
    console.log(">>> OnInit [inicio]");
        // listando data del usuario inferiror a este
this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
        x => this.lstPrestatarios = x
);
      // usuario actual
this.objUsuario.idUsuario = this.tokenService.getUserId();

console.log(">>> OnInit >>> " + this.lstDias);
console.log(" id del usuario " + this.objUsuario.idUsuario);
console.log(">>> OnInit >>> lista prestatarios " + this.lstPrestatarios);
console.log(">>> OnInit [fin]");
}

















}
