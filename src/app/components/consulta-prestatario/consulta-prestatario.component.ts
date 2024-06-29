import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppMaterialModule } from '../../app.material.module';
import { MenuComponent } from '../../menu/menu.component';
import { Prestatario } from '../../models/prestatario.model';
import { Usuario } from '../../models/usuario.model';
import { TokenService } from '../../security/token.service';
import { PrestatarioService } from '../../services/prestatario.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-consulta-prestatario',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './consulta-prestatario.component.html',
  styleUrl: './consulta-prestatario.component.css'
})
export class ConsultaPrestatarioComponent {

  dataSource: any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  displayedColumns = ["idUsuario", "nombres", "apellidos", "dni", "login", "estado"];

  dni: string = "";
  nombres: string = "";
  apellidos: string = "";
  estado: boolean = true;
  login: string = "";

  objUsuario: Usuario = {};

  constructor(private prestatarioService: PrestatarioService, private utilService: UtilService, private tokenService: TokenService) {
    this.objUsuario.idUsuario = tokenService.getUserId();
  }

  consultaPrestatario() {
    this.prestatarioService.consultaPrestatarioLikeComplejasa(this.login, this.nombres, this.apellidos, this.dni, this.estado ? 1 : 0).subscribe(
      data => {
        this.dataSource = new MatTableDataSource<Prestatario>(data);
        this.dataSource.paginator = this.paginator
      }
    );
  }

}