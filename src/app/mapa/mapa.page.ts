import {
  AfterViewInit,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy
} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

import { PUNTOS, TipoPunto } from '../data/puntos-interes';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent]
})
export class MapaPage implements AfterViewInit, OnDestroy {
  private map!: L.Map;
  private ubicacionUsuario!: { lat: number; lng: number };
  private rutaActual?: L.Polyline;

  private iconoUsuario = L.divIcon({
    className: 'marker-usuario',
    html: '📍',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28]
  });

  private iconosPorTipo: Record<TipoPunto, L.DivIcon> = {
    educacion: L.divIcon({
      className: 'marker-punto',
      html: '🏫',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    transporte: L.divIcon({
      className: 'marker-punto',
      html: '🚉',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    cultura: L.divIcon({
      className: 'marker-punto',
      html: '🏛️',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    plaza: L.divIcon({
      className: 'marker-punto',
      html: '📌',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    comercio: L.divIcon({
      className: 'marker-punto',
      html: '🛍️',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    religioso: L.divIcon({
      className: 'marker-punto',
      html: '⛪',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    salud: L.divIcon({
      className: 'marker-punto',
      html: '🏥',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    parque: L.divIcon({
      className: 'marker-punto',
      html: '🌳',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    }),
    mercado: L.divIcon({
      className: 'marker-punto',
      html: '🧺',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    })
  };

  ngAfterViewInit(): void {
    void this.inicializarMapa();
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private async inicializarMapa(): Promise<void> {
    try {
      const point = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true
      });

      const { latitude, longitude } = point.coords;
      this.ubicacionUsuario = { lat: latitude, lng: longitude };

      this.map = L.map('map').setView([latitude, longitude], 18);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.marker([latitude, longitude], { icon: this.iconoUsuario })
        .addTo(this.map)
        .bindPopup('Estás aquí!!!')
        .openPopup();

      PUNTOS.forEach(punto => {
        const distancia = this.calcularDistancia(
          latitude,
          longitude,
          punto.lat,
          punto.lng
        );

        const distanciaTexto =
          distancia < 1000
            ? `${distancia.toFixed(0)} m`
            : `${(distancia / 1000).toFixed(2)} km`;

        const marker = L.marker([punto.lat, punto.lng], {
          icon: this.iconosPorTipo[punto.tipo]
        })
          .addTo(this.map)
          .bindPopup(
            `<strong>${punto.nombre}</strong><br>Distancia: ${distanciaTexto}`
          );

        marker.on('click', () => {
          void this.trazarRuta(punto.lat, punto.lng);
        });
      });

      setTimeout(() => this.map.invalidateSize(), 100);
    } catch (error) {
      console.error('No fue posible inicializar el mapa:', error);
    }
  }

  private calcularDistancia(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number {
    const R = 6371e3;
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) ** 2 +
      Math.cos(phi1) *
        Math.cos(phi2) *
        Math.sin(deltaLambda / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  private async obtenerRuta(
    origenLat: number,
    origenLng: number,
    destinoLat: number,
    destinoLng: number
  ): Promise<L.LatLng[]> {
    const url =
      `https://router.project-osrm.org/route/v1/foot/` +
      `${origenLng},${origenLat};${destinoLng},${destinoLat}` +
      '?overview=full&geometries=geojson';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status} consultando la ruta`);
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      throw new Error('No se encontró ruta');
    }

    return data.routes[0].geometry.coordinates.map(
      (coord: [number, number]) => L.latLng(coord[1], coord[0])
    );
  }

  async trazarRuta(destinoLat: number, destinoLng: number): Promise<void> {
    try {
      const coordenadas = await this.obtenerRuta(
        this.ubicacionUsuario.lat,
        this.ubicacionUsuario.lng,
        destinoLat,
        destinoLng
      );

      if (this.rutaActual) {
        this.map.removeLayer(this.rutaActual);
      }

      this.rutaActual = L.polyline(coordenadas, {
        color: '#3388ff',
        weight: 5,
        opacity: 0.8
      }).addTo(this.map);

      this.map.fitBounds(this.rutaActual.getBounds(), {
        padding: [50, 50]
      });
    } catch (error) {
      console.error('Error trazando ruta:', error);
    }
  }
}
