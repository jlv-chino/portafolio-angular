import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];
  tituloLower?: string;

  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-portfolio-e3e2a-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: any) => {
          this.productos = resp;

          //Se puede quitar esta función cuando esté en producción
          setTimeout(() => {
            this.cargando = false;
            resolve(this.productos);
          }, 1000);

        });
    });

  }

  getProducto(id: string) {
    return this.http.get(`https://angular-portfolio-e3e2a-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if(this.productos.length === 0){
      this.cargarProductos().then(() => {
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {
      this.tituloLower = prod.titulo.toLowerCase();

      if(prod.categoria.indexOf(termino) >= 0 || this.tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }
    });
  }

}
