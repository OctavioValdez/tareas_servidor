import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoNoticiasComponent } from './listado-noticias/listado-noticias.component';
import { DetalleNoticiasComponent } from './detalle-noticias/detalle-noticias.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'resultados', component: ListadoNoticiasComponent },
  { path: 'noticias/:titulo', component: DetalleNoticiasComponent },
  { path: '**', redirectTo: '' }
];