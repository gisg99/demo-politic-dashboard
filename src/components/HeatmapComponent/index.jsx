import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';

const HeatmapLayer = ({ points = [] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const safePoints = (Array.isArray(points) ? points : [])
      .map(([lat, lng, intensity = 0]) => {
        const i = Number.parseFloat(intensity);
        // normalizar a [0,1] y evitar NaN
        const v = Number.isFinite(i) ? Math.min(Math.max(i / 100, 0), 1) : 0;
        return [lat, lng, v];
      })
      .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng));

    // si no hay puntos válidos, no intentes dibujar
    if (safePoints.length === 0) {
      // igual invalida tamaño por si el contenedor acaba de hacerse visible
      map.whenReady(() => setTimeout(() => map.invalidateSize(), 0));
      return;
    }

    let heatLayer;

    map.whenReady(() => {
      // por si el contenedor cambió de tamaño al mostrarse
      setTimeout(() => map.invalidateSize(), 0);

      // Detectar si es móvil para ajustar configuración del heatmap
      const isMobile = window.innerWidth < 1024;

      heatLayer = L.heatLayer(safePoints, {
        radius: isMobile ? 20 : 25, // Radio más pequeño en móvil
        blur: isMobile ? 10 : 15,   // Menos blur en móvil
        maxZoom: 17,
      }).addTo(map);
    });

    // refrescar tamaño en resize (opcional pero útil)
    const onResize = () => map.invalidateSize();
    map.on('resize', onResize);

    return () => {
      map.off('resize', onResize);
      if (heatLayer) map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const HeatmapComponent = ({ data = [] }) => {
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

  return (
    <div className={`w-full ${isMobile ? 'h-[40vh]' : 'h-[86svh] xl:h-[54svh]'} rounded-lg overflow-hidden shadow-lg`}>
      <MapContainer
        center={[20.6748, -103.344]}
        zoom={isMobile ? 11 : 12} // Menos zoom en móvil
        scrollWheelZoom={!isMobile} // Deshabilitar scroll zoom en móvil
        className="w-full h-full z-0"
        zoomControl={!isMobile} // Ocultar controles de zoom en móvil
        attributionControl={false} // Ocultar atribución en móvil
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={!isMobile ? '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' : ''}
        />
        <HeatmapLayer points={data} />
      </MapContainer>
    </div>
  );
}; 
 
export { HeatmapComponent };