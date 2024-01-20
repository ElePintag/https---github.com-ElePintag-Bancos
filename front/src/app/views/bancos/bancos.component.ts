import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IBancos } from '../../Interfaces/ibancos';
import { BancosService } from '../../Services/Bancos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bancos',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './bancos.component.html',
  styleUrl: './bancos.component.css',
})
export class BancosComponent {
  title = 'Bancos';
  bancos: IBancos[];

  constructor(private bancoService: BancosService) {}

  ngOnInit() {
    this.cargaTablabancos();
  }

  cargaTablabancos() {
    this.bancoService.todos().subscribe((listabancos) => {
      this.bancos = listabancos;
      console.log(listabancos);
    });
  }

  alerta() {
    Swal.fire('bancos', 'Mensaje en bancos', 'success');
  }

  eliminar(ID_banco: number) {
    Swal.fire({
      title: 'bancos',
      text: 'Esta seguro que desea eliminar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bancoService.eliminar(ID_banco).subscribe((datos) => {
          this.cargaTablabancos();
          Swal.fire({
            title: 'bancos',
            text: 'Se eliminó con éxito el registro',
            icon: 'success',
          });
        });
      } else {
        Swal.fire({
          title: 'bancos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
