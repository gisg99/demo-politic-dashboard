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
    const isMobile = window.innerWidth < 1024;
    const baseSize = isMobile ? 6 : 8; // Más pequeño en móvil
    const multiplier = isMobile ? 0.2 : 0.3; // Menos variación en móvil
    return Math.max(baseSize, porcentaje * multiplier);
  };

  // Detectar si es móvil para ajustar zoom
  const isMobile = window.innerWidth < 1024;

  return (
    <div className="w-full h-full">
      {/* Mapa */}
      <div className="h-4/5 lg:h-5/6 rounded-lg overflow-hidden">
        <MapContainer
          center={[20.7214, -103.3844]} // Centro de Zapopan
          zoom={isMobile ? 11 : 12} // Menos zoom en móvil
          style={{ height: '100%', width: '100%', minHeight: isMobile ? '120px' : '150px' }}
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
              weight={isMobile ? 1 : 2} // Borde más delgado en móvil
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
              <Popup closeButton={false} className="custom-popup" maxWidth={isMobile ? 80 : 100} minWidth={isMobile ? 60 : 10}>
                <div className="text-center flex flex-col gap-0">
                  <h3 className="font-medium text-xs text-gray-800 gap-0">
                    {district.name}
                  </h3>
                  <h1 className="text-sm lg:text-md font-bold text-gray-700">
                    {district.porcentaje}%
                  </h1>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
      
      {/* Leyenda */}
      <div className="p-2 lg:p-4">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-4 text-sm">
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-red-800"></div>
            <span className='text-xs lg:text-sm'>MORENA</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-orange-500"></div>
            <span className='text-xs lg:text-sm'>MC</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-blue-500"></div>
            <span className='text-xs lg:text-sm'>PAN</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-green-700"></div>
            <span className='text-xs lg:text-sm'>PRI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export {ElectoralMap}