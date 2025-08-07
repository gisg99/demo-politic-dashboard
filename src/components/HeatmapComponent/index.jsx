import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import L from 'leaflet';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  React.useEffect(() => {
    const heatLayer = L.heatLayer(
      points.map(([lat, lng, intensity]) => [lat, lng, parseFloat(intensity) / 100]),
      { radius: 25, blur: 15, maxZoom: 17 }
    ).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [points, map]);

  return null;
};

const HeatmapComponent = ({ data }) => {
  return (
    <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={[20.6748, -103.344]}
        zoom={12}
        scrollWheelZoom={true}
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

export {HeatmapComponent};
