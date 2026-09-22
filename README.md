# MAPS

Proyecto académico de **Electiva Técnica II (Móviles)**.

Primera etapa: aplicación de mapas construida con Ionic + Angular + Capacitor + Leaflet.

## Objetivo inicial

- Obtener la ubicación actual con `@capacitor/geolocation`.
- Mostrar un mapa de OpenStreetMap con Leaflet.
- Cargar **10 puntos de interés desde un archivo TypeScript independiente**.
- Mostrar la distancia entre el usuario y cada punto.
- Trazar una ruta al hacer clic en un marcador.

## Estructura principal

```text
src/app/
├── app.component.ts
├── app.routes.ts
├── data/
│   └── puntos-interes.ts
└── mapa/
    ├── mapa.page.ts
    ├── mapa.page.html
    └── mapa.page.scss
```

## Ejecutar

```bash
npm install
npm start
```

La ruta principal redirige automáticamente a `/mapa`.

> Los 10 puntos incluidos son de ejemplo para la primera entrega y pueden reemplazarse después por los puntos definitivos indicados por el profesor.
