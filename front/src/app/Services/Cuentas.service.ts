import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICuentas } from '../Interfaces/icuentas';

@Injectable({
  providedIn: 'root',
})
export class CuentasService {
  private urlBase: string = environment.URL + 'Cuentas.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}

  todos(): Observable<ICuentas[]> {
    return this.clientePhp.get<ICuentas[]>(this.urlBase + 'todos');
  }
  insertar(cuenta: ICuentas): Observable<any> {
    var cu = new FormData();
    cu.append('ID_banco', cuenta.ID_banco.toString());
    cu.append('Tipo_cuenta', cuenta.Tipo_cuenta);
    cu.append('Saldo', cuenta.Saldo.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', cu);
  }
  eliminar(id: number): Observable<any> {
    var cu = new FormData();
    cu.append('ID_cuenta', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', cu);
  }
  uno(id: number): Observable<ICuentas> {
    var cu = new FormData();
    cu.append('ID_cuenta', id.toString());
    return this.clientePhp.post<ICuentas>(this.urlBase + 'uno', cu);
  }
  actualizar(cuenta: ICuentas, id: number): Observable<any> {
    var cu = new FormData();
    cu.append('ID_cuenta', id.toString());
    cu.append('ID_banco', cuenta.ID_banco.toString());
    cu.append('Tipo_cuenta', cuenta.Tipo_cuenta);
    cu.append('Saldo', cuenta.Saldo.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', cu);
  }
}
