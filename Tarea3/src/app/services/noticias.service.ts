import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export interface Noticia {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NoticiaResponse {
  status: string;
  totalResults: number;
  articles: Noticia[];
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  private apiKey = '665b99cc82754b3f98d9f596c398da48';
  private apiUrl = 'https://newsapi.org/v2/everything';
  private noticiaActual: Noticia | null = null;
  private ultimaBusqueda: string = '';
  private resultados: Noticia[] = [];

  constructor(private http: HttpClient) { }

  buscarNoticias(query: string): Observable<NoticiaResponse> {
    this.ultimaBusqueda = query;
    return this.http.get<NoticiaResponse>(`${this.apiUrl}?q=${query}&apiKey=${this.apiKey}`)
      .pipe(
        tap(response => {
          this.resultados = response.articles;
        })
      );
  }

  getUltimaBusqueda(): string {
    return this.ultimaBusqueda;
  }

  getResultados(): Noticia[] {
    return this.resultados;
  }

  guardarNoticia(noticia: Noticia): void {
    this.noticiaActual = noticia;
  }

  getNoticiaByTitulo(titulo: string): Noticia | undefined {
    return this.resultados.find(noticia => 
      this.normalizarTitulo(noticia.title) === titulo
    );
  }

  getNoticiaActual(): Noticia | null {
    return this.noticiaActual;
  }

  normalizarTitulo(titulo: string): string {
    return titulo.toLowerCase()
      .replace(/\s+/g, '+')
      .replace(/[^\w+]/g, '');
  }
}