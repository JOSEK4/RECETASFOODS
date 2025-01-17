import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  categorias = [
    { nombre: 'Desayunos', icono: 'cafe' },
    { nombre: 'Almuerzos', icono: 'restaurant' },
    { nombre: 'Cenas', icono: 'moon' },
    { nombre: 'Postres', icono: 'ice-cream' },
  ];

  recetas = [
    {
      nombre: 'Pancakes',
      descripcion: 'Deliciosos pancakes con miel y frutas.',
      imagen: 'assets/img/pancakes.jpg',
      categoria: 'Desayunos',
    },
    {
      nombre: 'Ensalada César',
      descripcion: 'Una ensalada fresca y saludable.',
      imagen: 'assets/img/ensalada-cesar.jpg',
      categoria: 'Almuerzos',
    },
    {
      nombre: 'Brownies',
      descripcion: 'Brownies de chocolate con nueces.',
      imagen: 'assets/img/brownies.jpg',
      categoria: 'Postres',
    },
  ];

  recetasFiltradas = [...this.recetas];

  constructor() {}

  buscarRecetas(event: any) {
    const query = event.target.value.toLowerCase();
    this.recetasFiltradas = this.recetas.filter((receta) =>
      receta.nombre.toLowerCase().includes(query)
    );
  }

  filtrarPorCategoria(categoria: any) {
    this.recetasFiltradas = this.recetas.filter(
      (receta) => receta.categoria === categoria.nombre
    );
  }

  agregarReceta() {
    console.log('Agregar receta clickeado');
    // Aquí podrías redirigir a una página para agregar recetas
  }
}
