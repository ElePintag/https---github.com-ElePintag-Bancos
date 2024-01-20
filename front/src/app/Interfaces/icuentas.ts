export interface ICuentas {
  ID_cuenta: number;
  ID_banco: number;
  Tipo_cuenta: string;
  Saldo: number;
  Fecha_apertura?: Date;
  Nombres: string;
}
