import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiasService, Noticia } from '../services/noticias.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticias.component.html',
  styleUrls: ['./detalle-noticias.component.css']
})
export class DetalleNoticiasComponent implements OnInit {
  noticia: Noticia | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private noticiasService: NoticiasService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const titulo = params['titulo'];

      this.noticia = this.noticiasService.getNoticiaActual();

      if (!this.noticia && titulo) {
        const noticiaEncontrada = this.noticiasService.getNoticiaByTitulo(titulo);
        if (noticiaEncontrada) {
          this.noticia = noticiaEncontrada;
        } else {
          this.error = 'No se pudo encontrar la noticia solicitada';
        }
      }

      if (!this.noticia && !this.error) {
        this.router.navigate(['/']);
      }
    });
  }

  volverAResultados(): void {
    this.location.back();
  }

  volverAInicio(): void {
    this.router.navigate(['/']);
  }

  visitarNoticia(): void {
    if (this.noticia && this.noticia.url) {
      window.open(this.noticia.url, '_blank');
    }
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}