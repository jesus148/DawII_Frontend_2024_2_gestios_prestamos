import { Component } from '@angular/core';
import { AppMaterialModule } from '../../app.material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-crud-solicitud-prestamo-actualizar',
  standalone: true,
  imports: [AppMaterialModule, FormsModule, CommonModule, MenuComponent, ReactiveFormsModule],
  templateUrl: './crud-solicitud-prestamo-actualizar.component.html',
  styleUrl: './crud-solicitud-prestamo-actualizar.component.css'
})
export class CrudSolicitudPrestamoActualizarComponent {

}
