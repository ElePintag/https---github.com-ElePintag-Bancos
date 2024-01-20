import { Component } from '@angular/core';
import { ICuentas } from '../../Interfaces/icuentas';
import { CuentasService } from '../../Services/Cuentas.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './cuentas.component.html',
  styleUrl: './cuentas.component.css',
})
export class CuentasComponent {
  title = 'Cuentas';
  cuentas: ICuentas[] = [];

  constructor(private cuentaservice: CuentasService) {}

  ngOnInit() {
    this.cargaTabla();
  }
  cargaTabla() {
    this.cuentaservice.todos().subscribe((listacuentas) => {
      this.cuentas = listacuentas;
      console.log(listacuentas);
    });
  }
  alerta() {
    Swal.fire('cuentas', 'Mensaje en cuentas', 'success');
  }

  eliminar(ID_cuenta: number) {
    Swal.fire({
      title: 'cuentas',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cuentaservice.eliminar(ID_cuenta).subscribe((datos) => {
          this.cargaTabla();
          Swal.fire({
            title: 'cuentas',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'cuentas',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
