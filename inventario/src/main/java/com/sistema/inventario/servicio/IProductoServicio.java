package com.sistema.inventario.servicio;

import com.sistema.inventario.modelo.Producto;
import java.util.List;

public interface IProductoServicio {
    public List<Producto> listarProductos();
    public Producto guardarProducto(Producto producto);
    public Producto buscarProductoPorId(Integer id);
    
    // ¡Agrega esta línea aquí!
    public void eliminarProducto(Integer id);
}