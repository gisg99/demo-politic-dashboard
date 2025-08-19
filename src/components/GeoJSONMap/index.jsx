import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from './14_Jalisco.json';

const GeoJSONMap = () => {
  // Detectar si es móvil
  const isMobile = window.innerWidth < 1024;

  const styleFeature = (feature) => {
    const partido = feature.properties.partido_ganador;
    return {
      fillColor: partido === 'morena' ? '#8B0000' : '#FFA500',
      weight: isMobile ? 0.5 : 1, // Borde más delgado en móvil
      opacity: 1,
      color: 'white', // Borde blanco
      fillOpacity: 0.8
    };
  };

  return (
    <div style={{ 
      height: isMobile ? '150px' : '200px', 
      width: '100%', 
      backgroundColor: '#FFFFFF' 
    }}>
      <MapContainer 
        center={[20.6597, -103.3496]} 
        zoom={isMobile ? 5 : 6} // Menos zoom en móvil
        style={{ height: '100%', backgroundColor: 'transparent' }} 
        attributionControl={false}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        touchZoom={false}
        boxZoom={false}
        keyboard={false}
        dragging={false}
        tap={false}
      >
        {/* NO agregues TileLayer */}
        
        {geoData && (
          <GeoJSON 
            data={geoData}
            style={styleFeature}
            onEachFeature={(feature, layer) => {
              // Solo mostrar popup en desktop
              if (!isMobile) {
                layer.bindPopup(`Municipio: ${feature.properties.nombre}`);
              }
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export { GeoJSONMap };