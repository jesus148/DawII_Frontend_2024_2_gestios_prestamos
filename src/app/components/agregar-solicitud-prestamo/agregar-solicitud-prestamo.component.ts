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
import { MontoPrestamo } from '../../models/monto-prestamo.model';
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
  capital: MontoPrestamo[] = [];


  // combo monto
  monto: MontoPrestamo[] = [];






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


  // capital
      capital: 0.0,
      montoPagar:0,
      // data string desde el front conertimos a date
      fechaInicioPrestamo: " ",
      fechaFinPrestamo: " ",
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






  // VALIDACIONES

  formRegistrar = this.formBuilder.group({
    validaDescripcion: ['', [Validators.required]],
    validaDescripcion1: ['', [Validators.required]],
    validaDescripcion2: ['', [Validators.required]],
    validaPais: ['', [Validators.min(1)]],
    validaCapital: ['', [Validators.min(1)]],
    validaUsuario: ['', [Validators.min(1)]],

});



  // CONSTRUCTOR

  constructor(private solicitudPrestamoService: SolicitudPrestamoService,
    private utilService: UtilService,
    private tokenService: TokenService,
    private formBuilder: FormBuilder) {
console.log(">>> constructor  >>> ");
}

// INICIA CON EL COMPONENTE
ngOnInit() {
      console.log(">>> OnInit [inicio]");


      // DIAS
this.utilService.listaDiasPrestamo().subscribe(
      x => this.lstDias = x
);
// PRESTATARIOS INFERIRORES DEL PRESTAMISTA
this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
  x => this.lstPrestatarios = x
);
      // usuario actual
this.objUsuario.idUsuario = this.tokenService.getUserId();
// console.log(">>> OnInit >>> 1 >> " + this.lstEstadoSolicitud.length);
console.log(">>> OnInit >>> 1 >> " + this.lstDias.length);
console.log(">>> OnInit >>> 2 >> " + this.lstPrestatarios.length);
console.log(">>> OnInit [fin]");      
    }





























// METODO REGISTRAR
registra() {
  console.log(">>> registra [inicio]");
  // SETEANDO LA DATA AGREGANDO USUAIROS
  this.objPrestamo.usuarioActualiza = this.objUsuario;
  this.objPrestamo.usuarioRegistro = this.objUsuario;
  console.log(">>> registra [inicio] " + this.objPrestamo);
  console.log(this.objPrestamo);

  this.solicitudPrestamoService.registrar(this.objPrestamo).subscribe(
    x => {
      Swal.fire({
        icon: 'info',
        title: 'Resultado del Registro',
        text: x.mensaje,
      });
      this.formRegistrar.reset();
      this.formRegistrar.markAsPristine();
    }
  );
}





// LISTA CAPITALES DEL MONTOPRESTAMO SEGUN DIAS(IDATACATALOGO)


listaCapitalesPorDias() {
  console.log("listaCapitalesPorDias>>> ", this.objPrestamo.dias);
  if (this.objPrestamo.dias?.idDataCatalogo !== undefined && this.objPrestamo.dias.idDataCatalogo !== -1) {
    this.utilService.listaCapitalesPorDias(this.objPrestamo.dias.idDataCatalogo).subscribe(
      (data: MontoPrestamo[]) => {
        this.capital = data;
        console.log(data);
      },
      error => {
        console.error('Error al obtener los capitales por días', error);
      }
    );
  } else {
    console.error('Días no seleccionado');
  }
}







// obteniendo montos segundo el capital
obtenerMontosPagar() {
  console.log("obtenerMontosPagar>>> ", this.objPrestamo.capital);
  if (this.objPrestamo.capital && this.objPrestamo.capital > 0) {
      // item => item.capital  : data todo el monto prestamo hace un reccorido buscando con el find en el col capital
      // this.objPrestamo.capital : capital valor solo guardado desde el front

      const montoSeleccionado = this.capital.find(item => item.capital === this.objPrestamo.capital);
      if (montoSeleccionado) {
          // Asigna el monto al campo montoPagar de solicitudPrestamo
          this.objPrestamo.montoPagar = montoSeleccionado.monto;
      } else {
          console.error('No se encontró el monto correspondiente al capital seleccionado');
      }
  } else {
      console.error('Capital no válido');
  }
}






// OBTENIEDNO LAFECHA FIN
calcularFechaFin() {
if (this.objPrestamo.fechaInicioPrestamo && this.objPrestamo.dias?.idDataCatalogo) {
  // conertimos a date pq la fecha del front viene en string
  const fechaInicio = new Date(this.objPrestamo.fechaInicioPrestamo);

  // Obtener el número de días como entero , lo relaciones ver la tabla
  const dias = this.lstDias.find(item => item.idDataCatalogo === this.objPrestamo.dias!.idDataCatalogo)?.descripcion;
  if (dias) {
    // Convertir la descripción a número, pq es string
    const diasInt = parseInt(dias);

    // Crear una nueva fecha para la fecha final  y lo suma mas los dias
    const fechaFin = new Date(fechaInicio);
    fechaFin.setDate(fechaInicio.getDate() + diasInt);

    // Formatear la fecha final como YYYY-MM-DD sin convertirla a UTC , con el formato de la bd
    const year = fechaFin.getFullYear();
    const month = ('0' + (fechaFin.getMonth() + 1)).slice(-2);  // Meses van de 0 a 11, se agrega 1 y se formatea con dos dígitos
    const day = ('0' + fechaFin.getDate()).slice(-2);  // Días de 1 a 31, se formatea con dos dígitos

    // Asignar la fecha final formateada al modelo
    this.objPrestamo.fechaFinPrestamo = `${year}-${month}-${day}`;
  } else {
    console.error('Número de días no válido');
  }
} else {
  console.error('Fecha de inicio o número de días no seleccionados');
}
}}











































  // registrar(){

  // // LLENANDO LA DATA Q FALTA AL OBJETO EJEMPLO PA REGISTRAR
  // console.log(">>> registra [inicio]");
  //   this.objPrestamo.usuarioActualiza = this.objUsuario;
  //   this.objPrestamo.usuarioRegistro = this.objUsuario;

  //   console.log(">>> fecha inicio " + this.objPrestamo.fechaInicioPrestamo);
  //   console.log(">>> fecha inicio " + this.objPrestamo.usuarioActualiza?.idUsuario);


  //   console.log(" id estado" + this.objPrestamo.idEstadoSolcitud?.idDataCatalogo);
  //   console.log(this.objPrestamo);
  //       // ENVIANDO LA DATA CARGADA
  //       this.solicitudPrestamoService.registrar(this.objPrestamo).subscribe(
  //         x=>{
  //               Swal.fire({ icon: 'info', title: 'Resultado del Registro', text: x.mensaje, });
  //               this.objPrestamo = {
  //                 // dias
  //                 dias: {
  //                   idDataCatalogo: -1,
  //                  },
  //                  idEstadoSolcitud:{
  //                   idDataCatalogo: 12,
  //                  },

  //               // capital
  //                   capital: 0.0,
  //                   montoPagar:0,
  //                   fechaInicioPrestamo: undefined,
  //                   usuarioPrestatario: {
  //                       idUsuario: -1
  //                   },
  //                   usuarioRegistro: {
  //                       idUsuario: -1
  //                   },
  //                   usuarioActualiza: {
  //                       idUsuario: -1
  //                   },

  //                 };

  //           }
  //       );

  // }

















































  // LISTAR COMBO CUANDO SELECCIONES OTRO COMBO OSEA RELACIONA SEGUN Q DISTRITO HAYAS SELECCIONADO
//   PonerMonto(){
//     console.log("PonerMonto>>> " + this.objPrestamo.capital);
//     this.utilService.listaMontoSegunCapital(this.objPrestamo?.capital).subscribe(
//         x => this.capitaMonto = x
//     );
// }





//   //  AL INCICIO CARGA ESTO
//   ngOnInit() {
//     console.log(">>> OnInit [inicio]");
//         // listando data del usuario inferiror a este
// this.utilService.listaPrestamistariosDeUnPrestamista(this.tokenService.getUserId()).subscribe(
//         x => this.lstPrestatarios = x
// );
//       // usuario actual
// this.objUsuario.idUsuario = this.tokenService.getUserId();

// console.log(">>> OnInit >>> " + this.lstDias);
// console.log(" id del usuario " + this.objUsuario.idUsuario);
// console.log(">>> OnInit >>> lista prestatarios " + this.lstPrestatarios);
// console.log(">>> OnInit [fin]");
// }


















