export type TipoPunto = 'cafeteria' | 'biblioteca' | 'bano';

export interface PuntoInteres {
  nombre: string;
  tipo: TipoPunto;
  lat: number;
  lng: number;
}

export const PUNTOS: PuntoInteres[] = [
  { nombre: 'Punto 1 - Cafetería', tipo: 'cafeteria', lat: 4.6016861, lng: -74.0644734 },
  { nombre: 'Punto 2 - Biblioteca', tipo: 'biblioteca', lat: 4.6025000, lng: -74.0652000 },
  { nombre: 'Punto 3 - Baño', tipo: 'bano', lat: 4.6032000, lng: -74.0661000 },
  { nombre: 'Punto 4 - Cafetería', tipo: 'cafeteria', lat: 4.6009000, lng: -74.0633000 },
  { nombre: 'Punto 5 - Biblioteca', tipo: 'biblioteca', lat: 4.5998000, lng: -74.0648000 },
  { nombre: 'Punto 6 - Baño', tipo: 'bano', lat: 4.6040000, lng: -74.0629000 },
  { nombre: 'Punto 7 - Cafetería', tipo: 'cafeteria', lat: 4.6052000, lng: -74.0640000 },
  { nombre: 'Punto 8 - Biblioteca', tipo: 'biblioteca', lat: 4.6002000, lng: -74.0665000 },
  { nombre: 'Punto 9 - Baño', tipo: 'bano', lat: 4.6021000, lng: -74.0626000 },
  { nombre: 'Punto 10 - Cafetería', tipo: 'cafeteria', lat: 4.6035000, lng: -74.0649000 }
];
