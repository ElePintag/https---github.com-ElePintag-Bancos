import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CuentasService } from '../../../Services/Cuentas.service';
import Swal from 'sweetalert2';
import { IBancos } from '../../../Interfaces/ibancos';
import { BancosService } from '../../../Services/Bancos.service';
@Component({
  selector: 'app-nueva-cuenta',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './nueva-cuenta.component.html',
  styleUrl: './nueva-cuenta.component.css',
})
export class NuevaCuentaComponent {
  title = '';
  id!: number;
  listaBancos: IBancos[] = [];

  provedor: FormGroup = new FormGroup({
    ID_banco: new FormControl('', Validators.required),
    Tipo_cuenta: new FormControl('', Validators.required),
    Saldo: new FormControl('', Validators.required),
  });
  constructor(
    private cuentasServicio: CuentasService,
    private bancosteServicio: BancosService,
    private rutas: Router,
    private parametros: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.id = this.parametros.snapshot.params['id'];
    await this.cargaCuentas();
    console.log(this.id);
    if (this.id == 0 || this.id == undefined) {
      this.title = 'Nueva Asignatura';
    } else {
      this.title = 'Actualizar Asignatura';
      this.cuentasServicio.uno(this.id).subscribe((res) => {
        console.log(res);
        this.provedor.patchValue({
          ID_banco: res.ID_banco,
          Tipo_cuenta: res.Tipo_cuenta,
          Saldo: res.Saldo,
        });
      });
    }
  }
  get f() {
    return this.provedor.controls;
  }

  cargaCuentas() {
    this.bancosteServicio.todos().subscribe((res) => {
      this.listaBancos = res;
    });
  }

  grabar() {
    Swal.fire({
      title: 'cuentas',
      text: 'Esta seguro que desea guardar el registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Guardar',
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.id == 0 || this.id == undefined) {
          this.cuentasServicio
            .insertar(this.provedor.value)
            .subscribe((res) => {
              Swal.fire({
                title: 'cuentas',
                text: 'Se insertó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/cuentas']);
              this.id = 0;
            });
        } else {
          this.cuentasServicio
            .actualizar(this.provedor.value, this.id)
            .subscribe((res) => {
              Swal.fire({
                title: 'cuentas',
                text: 'Se actualizó con éxito el registro',
                icon: 'success',
              });
              this.rutas.navigate(['/cuentas']);
              this.id = 0;
            });
        }
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
