import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-inicio',
  imports: [CommonModule,FormsModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  busqueda: string = '';

  constructor(private router: Router) { }

  buscar() {
    if (this.busqueda.trim()) {
      this.router.navigate(['/resultados'], { 
        queryParams: { buscar: this.busqueda } 
      });
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
}