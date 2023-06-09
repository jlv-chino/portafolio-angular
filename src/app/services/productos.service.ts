import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando: boolean = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    this.http.get('https://angular-portfolio-e3e2a-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe((resp: any) => {
        this.productos = resp;

        //Se puede quitar esta función cuando esté en producción
        setTimeout(() => {
          this.cargando = false;
        }, 1000);

      });

  }
}
