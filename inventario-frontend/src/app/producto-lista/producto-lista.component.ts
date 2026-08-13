import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {

  productos: Producto[] = [];

  // Inyectamos el detector de cambios
  constructor(private productoService: ProductoService, 
              private enrutador: Router,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.obtenerListaDeProductos().subscribe({
      next: (datos) => {
        this.productos = datos;
        // ¡Forzamos a la pantalla a redibujar la tabla inmediatamente!
        this.cdr.detectChanges();
      },
      error: (errores) => {
        console.log("Error al traer los datos:", errores);
      }
    });
  }

  agregarProducto() {
    this.enrutador.navigate(['agregar-producto']);
  }

  editarProducto(id: any) {
    this.enrutador.navigate(['editar-producto', id]);
  }

  eliminarProducto(id: any) {
    if(confirm("¿Estás seguro de que deseas eliminar este producto del inventario?")) {
      this.productoService.eliminarProducto(id).subscribe({
        next: (datos: any) => {
          this.obtenerProductos();
        },
        error: (errores: any) => {
          console.log("Error al intentar eliminar:", errores);
        }
      });
    }
  }
}