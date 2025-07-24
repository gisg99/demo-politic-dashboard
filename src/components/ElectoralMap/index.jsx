import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Data de ejemplo para distritos electorales de Zapopan
const districtData = [
  {
    name: "Centro Histórico",
    lat: 20.7214,
    lng: -103.3844,
    partidoGanador: "MC",
    porcentaje: 38.5,
    color: "#ff7f00"
  },
  {
    name: "Providencia",
    lat: 20.7067,
    lng: -103.3903,
    partidoGanador: "PAN",
    porcentaje: 42.3,
    color: "#4285f4"
  },
  {
    name: "Zapopan Norte",
    lat: 20.7500,
    lng: -103.3700,
    partidoGanador: "MORENA",
    porcentaje: 45.7,
    color: "#8b0000"
  },
  {
    name: "Santa Margarita",
    lat: 20.6950,
    lng: -103.4100,
    partidoGanador: "MC",
    porcentaje: 35.2,
    color: "#ff7f00"
  },
  {
    name: "Ciudad Granja",
    lat: 20.7150,
    lng: -103.4200,
    partidoGanador: "PRI",
    porcentaje: 33.8,
    color: "#228b22"
  },
  {
    name: "Tesistán",
    lat: 20.7800,
    lng: -103.4500,
    partidoGanador: "MORENA",
    porcentaje: 48.1,
    color: "#8b0000"
  },
  {
    name: "Las Águilas",
    lat: 20.6800,
    lng: -103.3600,
    partidoGanador: "PAN",
    porcentaje: 40.9,
    color: "#4285f4"
  },
  {
    name: "Nextipac",
    lat: 20.7600,
    lng: -103.3200,
    partidoGanador: "MC",
    porcentaje: 41.2,
    color: "#ff7f00"
  },
  {
    name: "La Venta del Astillero",
    lat: 20.6600,
    lng: -103.4300,
    partidoGanador: "MORENA",
    porcentaje: 52.3,
    color: "#8b0000"
  },
  {
    name: "Lomas de Zapopan",
    lat: 20.7300,
    lng: -103.4000,
    partidoGanador: "PAN",
    porcentaje: 46.7,
    color: "#4285f4"
  },
  {
    name: "El Colli",
    lat: 20.6700,
    lng: -103.3800,
    partidoGanador: "PRI",
    porcentaje: 37.4,
    color: "#228b22"
  },
  {
    name: "Constitución",
    lat: 20.7400,
    lng: -103.3500,
    partidoGanador: "MC",
    porcentaje: 39.6,
    color: "#ff7f00"
  }
];

const ElectoralMap = () => {
  // Función para obtener el tamaño del marcador basado en el porcentaje
  const getMarkerSize = (porcentaje) => {
    return Math.max(8, porcentaje * 0.3); // Tamaño mínimo 8, máximo basado en porcentaje
  };

  return (
    <div className="w-full h-full">
      {/* Header - Solo Leyenda */}
      <div className="p-4">
        {/* Leyenda */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-800"></div>
            <span>MORENA</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>MC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>PAN</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-700"></div>
            <span>PRI</span>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="h-5/6 rounded-lg overflow-hidden ">
        <MapContainer
          center={[20.7214, -103.3844]} // Centro de Zapopan
          zoom={12}
          style={{ height: '100%', width: '100%', minHeight: '300px' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {districtData.map((district, index) => (
            <CircleMarker
              key={index}
              center={[district.lat, district.lng]}
              radius={getMarkerSize(district.porcentaje)}
              fillColor={district.color}
              color="white"
              weight={2}
              opacity={1}
              fillOpacity={0.8}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  e.target.closePopup();
                }
              }}
            >
              <Popup closeButton={false} className="custom-popup" maxWidth={100} minWidth={10}>
                <div className="text-center px-1">
                  <h3 className="font-medium text-xs text-gray-800">
                    {district.name}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <div 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: district.color }}
                    ></div>
                    <span className="font-medium text-xs">{district.partidoGanador}</span>
                  </div>
                  <p className="text-md font-bold text-gray-700">
                    {district.porcentaje}%
                  </p>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export {ElectoralMap}