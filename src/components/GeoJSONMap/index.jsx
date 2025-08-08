import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from './14_Jalisco.json';

const GeoJSONMap = () => {
  // ... tu código de carga del GeoJSON

  const styleFeature = (feature) => {
    const partido = feature.properties.partido_ganador;
    return {
      fillColor: partido === 'morena' ? '#8B0000' : '#FFA500',
      weight: 1,
      opacity: 1,
      color: 'white', // Borde blanco
      fillOpacity: 0.8
    };
  };

  return (
    <div style={{ height: '200px', width: '100%', backgroundColor: '#FFFFFF' }}>
      <MapContainer 
        center={[20.6597, -103.3496]} 
        zoom={6}
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
              layer.bindPopup(`Municipio: ${feature.properties.nombre}`);
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};

export { GeoJSONMap };