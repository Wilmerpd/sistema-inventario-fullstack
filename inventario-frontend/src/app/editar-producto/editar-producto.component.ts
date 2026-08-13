import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule es necesario para los inputs
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {
  producto: Producto = new Producto();
  id: number = 0;

  constructor(private productoService: ProductoService,
              private ruta: ActivatedRoute,
              private enrutador: Router) {}

  ngOnInit(): void {
    // 1. Tomamos el ID de la ruta
    this.id = this.ruta.snapshot.params['id'];
    // 2. Buscamos el producto
    this.productoService.obtenerProductoPorId(this.id).subscribe({
      next: (datos) => this.producto = datos,
      error: (errores) => console.log(errores)
    });
  }

  onSubmit() {
    this.productoService.editarProducto(this.id, this.producto).subscribe({
      next: (datos) => this.irListaProductos(),
      error: (errores) => console.log(errores)
    });
  }

  irListaProductos() {
    this.enrutador.navigate(['/productos']);
  }
}