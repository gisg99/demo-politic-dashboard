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
        const v = Number.isFinite(i) ? Math.min(Math.max(i / 100, 0), 1) : 0;
        return [lat, lng, v];
      })
      .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng));

    if (safePoints.length === 0) {
      map.whenReady(() => setTimeout(() => map.invalidateSize(), 0));
      return;
    }

    let heatLayer;

    map.whenReady(() => {
      setTimeout(() => map.invalidateSize(), 0);

      const isMobile = window.innerWidth < 1024;

      heatLayer = L.heatLayer(safePoints, {
        radius: isMobile ? 20 : 25,
        blur: isMobile ? 10 : 15,
        maxZoom: 17,
      }).addTo(map);
    });

    const onResize = () => map.invalidateSize();
    map.on('resize', onResize);

    return () => {
      map.off('resize', onResize);
      if (heatLayer) map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
};

const HeatmapComponent = ({ 
  data = [], 
  useContainerHeight = false  // Nueva prop para controlar el comportamiento
}) => {
  const isMobile = window.innerWidth < 1024;

  // Si useContainerHeight es true, usa h-full, sino usa las alturas originales
  const heightClass = useContainerHeight 
    ? 'h-full' 
    : `${isMobile ? 'h-[40vh]' : 'h-[86svh] xl:h-[54svh]'}`;

  return (
    <div className={`w-full ${heightClass} rounded-lg overflow-hidden shadow-lg`}>
      <MapContainer
        center={[20.6748, -103.344]}
        zoom={isMobile ? 11 : 12}
        scrollWheelZoom={!isMobile}
        className="w-full h-full z-0"
        zoomControl={!isMobile}
        attributionControl={false}
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