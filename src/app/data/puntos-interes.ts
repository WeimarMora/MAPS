export type TipoPunto =
  | 'educacion'
  | 'transporte'
  | 'cultura'
  | 'plaza'
  | 'comercio'
  | 'religioso'
  | 'salud'
  | 'parque'
  | 'mercado';

export interface PuntoInteres {
  nombre: string;
  tipo: TipoPunto;
  lat: number;
  lng: number;
}

export const PUNTOS: PuntoInteres[] = [
  {
    nombre: 'Escuela Tecnológica Instituto Técnico Central',
    tipo: 'educacion',
    lat: 4.60641,
    lng: -74.08132
  },
  {
    nombre: 'Estación de La Sabana',
    tipo: 'transporte',
    lat: 4.60724,
    lng: -74.08325
  },
  {
    nombre: 'Teatro San Jorge',
    tipo: 'cultura',
    lat: 4.60490,
    lng: -74.08034
  },
  {
    nombre: 'Plaza España',
    tipo: 'plaza',
    lat: 4.60464,
    lng: -74.08560
  },
  {
    nombre: 'Centro Comercial Parque España',
    tipo: 'comercio',
    lat: 4.60470,
    lng: -74.08390
  },
  {
    nombre: 'Basílica del Voto Nacional',
    tipo: 'religioso',
    lat: 4.60233,
    lng: -74.08241
  },
  {
    nombre: 'Hospital de San José',
    tipo: 'salud',
    lat: 4.60332,
    lng: -74.08640
  },
  {
    nombre: 'Parque Tercer Milenio',
    tipo: 'parque',
    lat: 4.59766,
    lng: -74.08170
  },
  {
    nombre: 'Plaza de Paloquemao',
    tipo: 'mercado',
    lat: 4.61629,
    lng: -74.08405
  },
  {
    nombre: 'Centro de Memoria, Paz y Reconciliación',
    tipo: 'cultura',
    lat: 4.61880,
    lng: -74.07674
  }
];
