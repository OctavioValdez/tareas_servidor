import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService, Noticia } from '../services/noticias.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-listado-noticias',
  templateUrl: './listado-noticias.component.html',
  styleUrls: ['./listado-noticias.component.css']
})
export class ListadoNoticiasComponent implements OnInit {
  noticias: Noticia[] = [];
  terminoBusqueda: string = '';
  cargando: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticiasService: NoticiasService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const buscar = params['buscar'];
      
      if (buscar) {
        this.terminoBusqueda = buscar;
        this.buscarNoticias(buscar);
      } else {
        const resultados = this.noticiasService.getResultados();
        if (resultados && resultados.length > 0) {
          this.noticias = resultados;
          this.terminoBusqueda = this.noticiasService.getUltimaBusqueda();
        } else {
          this.router.navigate(['/']);
        }
      }
    });
  }

  buscarNoticias(query: string): void {
    this.cargando = true;
    this.error = null;
    
    this.noticiasService.buscarNoticias(query).subscribe({
      next: (data) => {
        this.noticias = data.articles;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al buscar noticias:', err);
        this.error = 'Error al buscar noticias. Por favor intenta de nuevo más tarde.';
        this.cargando = false;
      }
    });
  }

  verNoticia(noticia: Noticia): void {
    this.noticiasService.guardarNoticia(noticia);
    this.router.navigate(['/noticias', this.noticiasService.normalizarTitulo(noticia.title)]);
  }

  volverAInicio(): void {
    this.router.navigate(['/']);
  }
  
  nuevaBusqueda: string = '';
  
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
  
  buscar() {
    if (this.nuevaBusqueda.trim()) {
      this.router.navigate(['/resultados'], { 
        queryParams: { buscar: this.nuevaBusqueda } 
      });
    }
  }
}