import { Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { BancosComponent } from './views/bancos/bancos.component';
import { CuentasComponent } from './views/cuentas/cuentas.component';
import { NuevoBancoComponent } from './views/bancos/nuevo-banco/nuevo-banco.component';
import { NuevaCuentaComponent } from './views/cuentas/nueva-cuenta/nueva-cuenta.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bancos', component: BancosComponent },
  { path: 'nuevo-banco', component: NuevoBancoComponent },
  { path: 'editar-banco/:id', component: NuevoBancoComponent },
  { path: 'cuentas', component: CuentasComponent },
  { path: 'nueva-cuenta', component: NuevaCuentaComponent },
  { path: 'editar-cuenta/:id', component: NuevaCuentaComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
