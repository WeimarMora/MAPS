import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mapa',
    pathMatch: 'full'
  },
  {
    path: 'mapa',
    loadComponent: () =>
      import('./mapa/mapa.page').then(m => m.MapaPage)
  },
  {
    path: '**',
    redirectTo: 'mapa'
  }
];
