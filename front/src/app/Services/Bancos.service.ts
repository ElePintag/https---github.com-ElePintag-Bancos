import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBancos } from '../Interfaces/ibancos';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BancosService {
  private urlBase: string = environment.URL + 'Bancos.Controller.php?op=';
  constructor(private clientePhp: HttpClient) {}
  todos(): Observable<IBancos[]> {
    return this.clientePhp.get<IBancos[]>(this.urlBase + 'todos');
  }

  uno(id: number): Observable<IBancos> {
    var b = new FormData();
    b.append('ID_banco', id.toString());
    return this.clientePhp.post<IBancos>(this.urlBase + 'uno', b);
  }

  insertar(banco: IBancos): Observable<any> {
    var b = new FormData();
    b.append('Nombre', banco.Nombre);
    b.append('Ciudad', banco.Ciudad);
    b.append('Numero_cuentas', banco.Numero_cuentas.toString());
    return this.clientePhp.post(this.urlBase + 'insertar', b);
  }

  actualizar(banco: IBancos, id: number): Observable<any> {
    var b = new FormData();
    b.append('ID_banco', id.toString());
    b.append('Nombre', banco.Nombre);
    b.append('Ciudad', banco.Ciudad);
    b.append('Numero_cuentas', banco.Numero_cuentas.toString());
    return this.clientePhp.post(this.urlBase + 'actualizar', b);
  }

  eliminar(id: number): Observable<any> {
    var b = new FormData();
    b.append('ID_banco', id.toString());
    return this.clientePhp.post(this.urlBase + 'eliminar', b);
  }
}
