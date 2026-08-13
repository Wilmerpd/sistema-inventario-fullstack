export class Producto {
  idProducto?: number; // El signo '?' indica que al crearlo no tiene ID, Spring Boot se lo dará.
  descripcion: string = '';
  precio: number = 0;
  existencias: number = 0;
}