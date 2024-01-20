import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BancosService } from '../../../Services/Bancos.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-nuevo-banco',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nuevo-banco.component.html',
  styleUrl: './nuevo-banco.component.css',
})
export class NuevoBancoComponent {
  title = '';
  id!: number;

  provedor: FormGroup = new FormGroup({
    Nombre: new FormControl('', Validators.required),
    Ciudad: new FormControl('', Validators.required),
    Numero_cuentas: new FormControl('', Validators.required),
  });
  constructor(
    private bancoServicio: BancosService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nuevo Banco';
    } else {
      this.title = 'Actualizar Banco';
      this.bancoServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          Nombre: res.Nombre,
          Ciudad: res.Ciudad,
          Numero_cuentas: res.Numero_cuentas,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  grabar() {
    Swal.fire({
      title: 'Bancos',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.bancoServicio.insertar(this.provedor.value).subscribe((res) => {
            Swal.fire({
              title: 'Bancos',
              text: 'Se insertó con éxito el registro',
              icon: 'success',
            });
            this.rutas.navigate(['/bancos']);
            this.id = 0;
          });
        } else {
          this.bancoServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'Bancos',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/bancos']);
              this.id = 0;
            });
        }
      } else {
        Swal.fire({
          title: 'Bancos',
          text: 'El usuario canceló la acción',
          icon: 'info',
        });
      }
    });
  }
}
