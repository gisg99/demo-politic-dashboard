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

      heatLayer = L.heatLayer(safePoints, {
        radius: 25,
        blur: 15,
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
  return (
    <div className="w-full h-[86svh] xl:h-[54svh] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[20.6748, -103.344]}
        zoom={12}
        scrollWheelZoom
        className="w-full h-full z-0"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatmapLayer points={data} />
      </MapContainer>
    </div>
  );
};

export { HeatmapComponent };
