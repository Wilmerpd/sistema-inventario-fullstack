import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Esta es la URL de tu Spring Boot (verifica que sea la misma que ya tenías)
  private baseURL = "http://localhost:8080/api/inventario/productos";

  constructor(private clienteHttp: HttpClient) { }

  // Función 1: Trae los productos para llenar la tabla
  obtenerListaDeProductos(): Observable<Producto[]> {
    return this.clienteHttp.get<Producto[]>(this.baseURL);
  }

  // Función 2: ¡La que nos faltaba! Envía el nuevo producto al backend
  agregarProducto(producto: Producto): Observable<Object> {
    return this.clienteHttp.post(this.baseURL, producto);
  }
  //Función 3: Fíjate en los ` que envuelven la URL, son súper importantes
  eliminarProducto(id: number): Observable<Object> {
  return this.clienteHttp.delete(`${this.baseURL}/${id}`);
  }
  // Obtener un solo producto
  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.clienteHttp.get<Producto>(`${this.baseURL}/${id}`);
  }

  // Enviar el producto editado
  editarProducto(id: number, producto: Producto): Observable<Object> {
    return this.clienteHttp.put(`${this.baseURL}/${id}`, producto);
  }
}