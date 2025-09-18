import React, { useState, useEffect, useMemo } from 'react';

const GeoJSONMap = ({ electoralData = [] }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [selectedMunicipality, setSelectedMunicipality] = useState(null);
  const [hoveredMunicipality, setHoveredMunicipality] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para normalizar nombres (quitar acentos y caracteres especiales)
  const normalizeString = (str) => {
    return str
      .toUpperCase()
      .trim()
      .normalize('NFD') // Descomponer caracteres con acentos
      .replace(/[\u0300-\u036f]/g, '') // Quitar diacríticos (acentos)
      .replace(/Ñ/g, 'N') // Ñ -> N
      .replace(/[^\w\s]/g, '') // Quitar caracteres especiales excepto letras y espacios
      .replace(/\s+/g, ' '); // Normalizar espacios múltiples
  };

  // Cargar el archivo GeoJSON
  useEffect(() => {
    const loadGeoJSON = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/jalisco-municipios.geojson');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: No se pudo cargar el archivo GeoJSON`);
        }
        const data = await response.json();
        setGeoJsonData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error cargando GeoJSON:', err);
      } finally {
        setLoading(false);
      }
    };

    loadGeoJSON();
  }, []);

  // Colores para cada partido
  const partyColors = {
    'PAN': '#0066CC',
    'PRI': '#FF0000', 
    'MORENA': '#692325',
    'PRD': '#FFD700',
    'PVEM': '#00B04F',
    'MC': '#FF8C00',
    'default': '#CCCCCC'
  };

  // Crear un mapa de datos electorales por municipio
  const electoralDataMap = useMemo(() => {
    const map = {};
    electoralData.forEach(item => {
      const normalizedName = normalizeString(item.municipio);
      map[normalizedName] = item;
      console.log(`Registrado: "${item.municipio}" -> "${normalizedName}"`); // Debug
    });
    console.log('Total municipios en datos electorales:', Object.keys(map).length); // Debug
    return map;
  }, [electoralData]);

  // Calcular los límites del GeoJSON para centrar el mapa
  const bounds = useMemo(() => {
    if (!geoJsonData || !geoJsonData.features) return null;
    
    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;
    
    geoJsonData.features.forEach(feature => {
      if (feature.geometry.type === 'Polygon') {
        feature.geometry.coordinates[0].forEach(coord => {
          const [lng, lat] = coord;
          minLng = Math.min(minLng, lng);
          maxLng = Math.max(maxLng, lng);
          minLat = Math.min(minLat, lat);
          maxLat = Math.max(maxLat, lat);
        });
      }
    });
    
    return { minLng, maxLng, minLat, maxLat };
  }, [geoJsonData]);

  // Convertir coordenadas geográficas a coordenadas SVG
  const projectCoordinate = (lng, lat) => {
    if (!bounds) return [0, 0];
    
    const width = 400;  // Reducido de 800 a 400
    const height = 300; // Reducido de 600 a 300
    const padding = 20; // Reducido de 40 a 20
    
    const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (width - 2 * padding) + padding;
    const y = height - (((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (height - 2 * padding) + padding);
    
    return [x, y];
  };

  // Obtener el color del municipio basado en el partido predominante
  const getMunicipalityColor = (municipalityName) => {
    const normalizedName = normalizeString(municipalityName);
    const electoralInfo = electoralDataMap[normalizedName];
    
    console.log(`Buscando: "${municipalityName}" -> "${normalizedName}"`, electoralInfo); // Debug
    
    if (!electoralInfo) return partyColors.default;
    
    const party = electoralInfo.partido_predominante.toUpperCase();
    console.log(`Partido encontrado: "${party}", Color: ${partyColors[party]}`); // Debug
    return partyColors[party] || partyColors.default;
  };

  // Obtener información electoral del municipio
  const getMunicipalityInfo = (municipalityName) => {
    const normalizedName = normalizeString(municipalityName);
    return electoralDataMap[normalizedName];
  };

  // Crear el path SVG para un polígono
  const createPolygonPath = (coordinates) => {
    const projectedCoords = coordinates[0].map(coord => 
      projectCoordinate(coord[0], coord[1])
    );
    
    return `M ${projectedCoords.map(coord => coord.join(',')).join(' L ')} Z`;
  };

  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Cargando mapa de Jalisco...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
          <br />
          <small>Asegúrate de que el archivo 'jalisco-municipios.json' esté en la carpeta 'public/data/'</small>
        </div>
      </div>
    );
  }

  if (!geoJsonData || !bounds) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4">
        <div className="text-center text-gray-500">No se pudo cargar el mapa</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      
      {/* Leyenda */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Partidos Predominantes:</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(partyColors).map(([party, color]) => {
            if (party === 'default') return null;
            return (
              <div key={party} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: color }}
                ></div>
                <span className="text-sm font-medium">{party}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Mapa */}
        <div className="flex-1">
          <svg 
            width="400" 
            height="300" 
            className="border border-gray-300 rounded-lg shadow-lg bg-white"
            viewBox="0 0 400 300"
          >
            {geoJsonData.features.map((feature, index) => {
              const municipalityName = feature.properties.NOMGEO;
              const color = getMunicipalityColor(municipalityName);
              const isHovered = hoveredMunicipality === municipalityName;
              const isSelected = selectedMunicipality === municipalityName;
              
              return (
                <path
                  key={index}
                  d={createPolygonPath(feature.geometry.coordinates)}
                  fill={color}
                  stroke="#333"
                  strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                  opacity={isHovered || isSelected ? 0.8 : 0.7}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredMunicipality(municipalityName)}
                  onMouseLeave={() => setHoveredMunicipality(null)}
                  onClick={() => setSelectedMunicipality(municipalityName)}
                />
              );
            })}
          </svg>
        </div>

        {/* Panel de información */}
        <div className="w-80 bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Información Municipal</h3>
          
          {selectedMunicipality ? (
            <div className="space-y-3">
              <h4 className="font-bold text-blue-800">{selectedMunicipality}</h4>
              
              {getMunicipalityInfo(selectedMunicipality) ? (
                <div className="space-y-2">
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Total de Votos</p>
                    <p className="text-xl font-bold">
                      {parseInt(getMunicipalityInfo(selectedMunicipality).total_votos).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600">Partido Predominante</p>
                    <p className="text-lg font-bold" style={{
                      color: partyColors[getMunicipalityInfo(selectedMunicipality).partido_predominante.toUpperCase()]
                    }}>
                      {getMunicipalityInfo(selectedMunicipality).partido_predominante}
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded shadow-sm">
                    <p className="text-sm text-gray-600 mb-2">Resultados por Partido</p>
                    <div className="space-y-1 text-sm">
                      {Object.entries(getMunicipalityInfo(selectedMunicipality))
                        .filter(([key]) => ['pan', 'pri', 'morena', 'prd', 'pvem', 'mc'].includes(key))
                        .map(([party, votes]) => (
                          <div key={party} className="flex justify-between">
                            <span className="font-medium">{party.toUpperCase()}:</span>
                            <span>{parseInt(votes).toLocaleString()}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No hay datos electorales disponibles para este municipio.
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Haz clic en un municipio para ver su información electoral.
            </p>
          )}
        </div>
      </div>

      {/* Tooltip para hover */}
      {hoveredMunicipality && (
        <div className="fixed pointer-events-none bg-black text-white px-2 py-1 rounded text-sm z-10"
             style={{ 
               left: '50%', 
               top: '50%',
               transform: 'translate(-50%, -50%)'
             }}>
          {hoveredMunicipality}
        </div>
      )}
    </div>
  );
};

export { GeoJSONMap };