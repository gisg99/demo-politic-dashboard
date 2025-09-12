import React from 'react';
import { MapContainer, TileLayer, useMap, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';

const HeatmapLayer = ({ points = [] }) => {
  const map = useMap();

  React.useEffect(() => {
    if (!map) return;

    const safePoints = (Array.isArray(points) ? points : [])
      .map(([est, lat, lng, intensity = 0]) => {
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
        radius: isMobile ? 30 : 40,  // Aumentado para mayor visibilidad
        blur: isMobile ? 8 : 12,     // Reducido para más definición
        maxZoom: 17,
        minOpacity: 0.3,             // Opacidad mínima para mejor visibilidad
        gradient: {                  // Gradiente personalizado más vibrante
          0.0: '#0000ff',
          0.2: '#00ffff', 
          0.4: '#00ff00',
          0.6: '#ffff00',
          0.8: '#ff8000',
          1.0: '#ff0000'
        }
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

// Componente para mostrar puntos individuales con tooltip
const InteractivePoints = ({ points = [] }) => {
  const safePoints = (Array.isArray(points) ? points : [])
    .map(([est, lat, lng, intensity = 0]) => {
      const i = Number.parseFloat(intensity);
      const v = Number.isFinite(i) ? Math.min(Math.max(i / 100, 0), 1) : 0;
      return { lat, lng, intensity: v };
    })
    .filter(({ lat, lng }) => Number.isFinite(lat) && Number.isFinite(lng));

  return (
    <>
      {safePoints.map((point, index) => (
        <CircleMarker
          key={index}
          center={[point.lat, point.lng]}
          radius={4}
          pathOptions={{
            fillColor: getColorByIntensity(point.intensity),
            color: '#000',
            weight: 1,
            opacity: 0.8,
            fillOpacity: 0.7
          }}
          eventHandlers={{
            mouseover: (e) => {
              e.target.setStyle({
                radius: 6,
                weight: 2,
                fillOpacity: 1
              });
            },
            mouseout: (e) => {
              e.target.setStyle({
                radius: 4,
                weight: 1,
                fillOpacity: 0.7
              });
            }
          }}
        >
          <Popup>
            <div className="text-sm">
              <div><strong>Estación:</strong> {point.estacion}</div>
              <div><strong>Latitud:</strong> {point.lat.toFixed(6)}</div>
              <div><strong>Longitud:</strong> {point.lng.toFixed(6)}</div>
              <div><strong>Intensidad:</strong> {(point.intensity * 100).toFixed(1)}%</div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </>
  );
};

// Función para obtener color basado en intensidad
const getColorByIntensity = (intensity) => {
  if (intensity < 0.2) return '#0000ff';
  if (intensity < 0.4) return '#00ffff';
  if (intensity < 0.6) return '#00ff00';
  if (intensity < 0.8) return '#ffff00';
  if (intensity < 1.0) return '#ff8000';
  return '#ff0000';
};

const HeatmapComponent = ({ 
  data = [], 
  useContainerHeight = false,
  showInteractivePoints = true  // Nueva prop para controlar puntos interactivos
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
        {showInteractivePoints && <InteractivePoints points={data} />}
      </MapContainer>
    </div>
  );
}; 

export { HeatmapComponent };