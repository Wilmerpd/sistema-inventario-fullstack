package com.sistema.inventario.controlador;

import com.sistema.inventario.modelo.Producto;
import com.sistema.inventario.servicio.IProductoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventario")
@CrossOrigin(origins = "http://localhost:4200") // Aquí le daremos permiso a Angular
public class ProductoControlador {

    @Autowired
    private IProductoServicio productoServicio;

    @GetMapping("/productos")
    public List<Producto> obtenerProductos() {
        return productoServicio.listarProductos();
    }

    @PostMapping("/productos")
    public Producto agregarProducto(@RequestBody Producto producto) {
        return productoServicio.guardarProducto(producto);
    }

    @DeleteMapping("/productos/{id}")
    public void eliminarProducto(@PathVariable Integer id) {
        productoServicio.eliminarProducto(id);
    }
    // Buscar un producto por ID (Para que Angular llene el formulario)
    @GetMapping("/productos/{id}")
    public Producto obtenerProductoPorId(@PathVariable Integer id) {
        return productoServicio.buscarProductoPorId(id);
    }

    // Guardar los cambios del producto editado
    @PutMapping("/productos/{id}")
    public Producto actualizarProducto(@PathVariable Integer id, @RequestBody Producto productoRecibido) {
        Producto producto = productoServicio.buscarProductoPorId(id);
        producto.setDescripcion(productoRecibido.getDescripcion());
        producto.setPrecio(productoRecibido.getPrecio());
        producto.setExistencias(productoRecibido.getExistencias());
        return productoServicio.guardarProducto(producto);
    }
}
