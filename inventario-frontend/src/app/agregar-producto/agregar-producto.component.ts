import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-agregar-producto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent {
  
  producto: Producto = new Producto();

  constructor(private productoService: ProductoService, private enrutador: Router) {}

  guardarProducto() {
    this.productoService.agregarProducto(this.producto).subscribe({
      // ¡Aquí está la corrección! Le pusimos ": any" a datos
      next: (datos: any) => {
        this.enrutador.navigate(['/productos']);
      },
      error: (errores: any) => {
        console.log("Ocurrió un error al guardar:", errores);
      }
    });
  }
}