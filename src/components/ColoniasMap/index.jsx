import React, { useEffect, useRef, useState } from 'react';

// Datos de ejemplo expandidos para simular más puntos
const generateSampleData = () => {
  const baseData = [
    {
      "municipio": "AHUALULCO DE MERCADO",
      "colonia": "CENTRO",
      "TOTAL_VOTOS": 416,
      "latitud": "20.5373",
      "longitud": "-104.0146",
      "partido_predominante": "MC"
    },
    {
      "municipio": "GUADALAJARA",
      "colonia": "CENTRO",
      "TOTAL_VOTOS": 1200,
      "latitud": "20.6597",
      "longitud": "-103.3496",
      "partido_predominante": "MORENA"
    },
    {
      "municipio": "ZAPOPAN",
      "colonia": "CENTRO",
      "TOTAL_VOTOS": 980,
      "latitud": "20.7214",
      "longitud": "-103.3844",
      "partido_predominante": "PAN"
    },
    {
      "municipio": "TLAQUEPAQUE",
      "colonia": "CENTRO",
      "TOTAL_VOTOS": 750,
      "latitud": "20.6401",
      "longitud": "-103.3135",
      "partido_predominante": "PRI"
    }
  ];

  const partidos = ['PAN', 'PRI', 'MORENA', 'MC', 'PVEM', 'PRD'];
  const municipios = ['GUADALAJARA', 'ZAPOPAN', 'TLAQUEPAQUE', 'TONALA', 'TLAJOMULCO'];
  const data = [];

  // Generar puntos distribuidos en un área más amplia
  for (let i = 0; i < 200; i++) {
    const lat = 20.5 + (Math.random() * 0.5);
    const lng = -104.2 + (Math.random() * 0.8);
    
    data.push({
      municipio: municipios[Math.floor(Math.random() * municipios.length)],
      colonia: `COLONIA_${i}`,
      TOTAL_VOTOS: Math.floor(Math.random() * 2000),
      latitud: lat.toString(),
      longitud: lng.toString(),
      partido_predominante: partidos[Math.floor(Math.random() * partidos.length)]
    });
  }

  return data;
};

const ColoniasMap = ({ data = generateSampleData() }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const clusterGroupRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(10);
  const [showClustering, setShowClustering] = useState(true);

  // Colores para cada partido
  const partyColors = {
    'PAN': '#0066CC',
    'PRI': '#E60026', 
    'PRD': '#FFD700',
    'MC': '#FF6600',
    'MORENA': '#8B4513',
    'PVEM': '#00AA00',
    'PT': '#DC143C',
    'PANAL': '#4169E1',
    'PES': '#800080',
    'default': '#808080'
  };

  const getPartyColor = (partido) => {
    return partyColors[partido] || partyColors['default'];
  };

  useEffect(() => {
    const loadLeaflet = async () => {
      // Cargar CSS de Leaflet
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);
      }

      // Cargar CSS de MarkerCluster
      if (!document.querySelector('link[href*="MarkerCluster"]')) {
        const clusterCSS = document.createElement('link');
        clusterCSS.rel = 'stylesheet';
        clusterCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.css';
        document.head.appendChild(clusterCSS);

        const clusterDefaultCSS = document.createElement('link');
        clusterDefaultCSS.rel = 'stylesheet';
        clusterDefaultCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/MarkerCluster.Default.css';
        document.head.appendChild(clusterDefaultCSS);
      }

      // Cargar JS de Leaflet
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.onload = loadMarkerCluster;
        document.body.appendChild(script);
      } else if (!window.L.markerClusterGroup) {
        loadMarkerCluster();
      } else {
        setIsLoaded(true);
      }
    };

    const loadMarkerCluster = () => {
      if (!window.L.markerClusterGroup) {
        const clusterScript = document.createElement('script');
        clusterScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet.markercluster/1.5.3/leaflet.markercluster.js';
        clusterScript.onload = () => setIsLoaded(true);
        document.body.appendChild(clusterScript);
      } else {
        setIsLoaded(true);
      }
    };

    loadLeaflet();
  }, []);

  // Función para crear marcadores optimizados
  const createOptimizedMarker = (point) => {
    const L = window.L;
    const lat = parseFloat(point.latitud);
    const lng = parseFloat(point.longitud);
    
    if (isNaN(lat) || isNaN(lng)) return null;

    const color = getPartyColor(point.partido_predominante);
    
    // Usar CircleMarker para mejor rendimiento
    const marker = L.circleMarker([lat, lng], {
      radius: 6,
      fillColor: color,
      color: '#ffffff',
      weight: 1,
      opacity: 0.9,
      fillOpacity: 0.7,
      // Optimizaciones para rendimiento
      interactive: true,
      bubblingMouseEvents: false
    });

    // Popup más liviano
    const popupContent = `
      <div style="font-size: 12px; max-width: 200px;">
        <strong>${point.municipio}</strong><br>
        <em>${point.colonia}</em><br>
        <span style="color: ${color};">${point.partido_predominante}</span> - ${point.TOTAL_VOTOS.toLocaleString()} votos
      </div>
    `;

    marker.bindPopup(popupContent, {
      maxWidth: 200,
      closeButton: false,
      autoPan: false
    });

    // Tooltip simplificado
    marker.bindTooltip(`${point.partido_predominante}<br>${point.colonia}`, {
      permanent: false,
      direction: 'top',
      offset: [0, -8],
      opacity: 0.9
    });

    return marker;
  };

  // Función para crear clusters por partido
  const createClusterIcon = (cluster) => {
    const L = window.L;
    const markers = cluster.getAllChildMarkers();
    
    // Contar votos por partido
    const partyVotes = {};
    markers.forEach(marker => {
      const popup = marker.getPopup();
      if (popup) {
        const content = popup.getContent();
        const partyMatch = content.match(/color: (#[0-9A-Fa-f]{6});">([^<]+)</);
        if (partyMatch) {
          const party = partyMatch[2];
          partyVotes[party] = (partyVotes[party] || 0) + 1;
        }
      }
    });

    // Encontrar partido predominante
    const predominantParty = Object.keys(partyVotes).reduce((a, b) => 
      partyVotes[a] > partyVotes[b] ? a : b
    );

    const color = getPartyColor(predominantParty);
    const count = cluster.getChildCount();

    return L.divIcon({
      html: `<div style="
        background-color: ${color};
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">${count}</div>`,
      className: 'custom-cluster-icon',
      iconSize: L.point(40, 40),
      iconAnchor: L.point(20, 20)
    });
  };

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return;

    const L = window.L;

    // Crear el mapa con opciones optimizadas
    const map = L.map(mapRef.current, {
      center: [20.6, -103.5],
      zoom: 10,
      zoomControl: true,
      preferCanvas: true, // Usar Canvas para mejor rendimiento
      maxZoom: 18,
      minZoom: 6
    });

    // Agregar capa de tiles optimizada
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
      updateWhenIdle: true,
      keepBuffer: 2
    }).addTo(map);

    mapInstanceRef.current = map;

    // Crear grupo de clusters
    const markerClusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      chunkProgress: (processed, total) => {
        console.log(`Procesando marcadores: ${processed}/${total}`);
      },
      iconCreateFunction: createClusterIcon,
      maxClusterRadius: 50,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      disableClusteringAtZoom: 15 // Desactivar clustering en zoom alto
    });

    clusterGroupRef.current = markerClusterGroup;

    // Procesar marcadores en lotes para no bloquear la UI
    const processBatch = (startIndex, batchSize = 100) => {
      const endIndex = Math.min(startIndex + batchSize, data.length);
      const batch = [];

      for (let i = startIndex; i < endIndex; i++) {
        const marker = createOptimizedMarker(data[i]);
        if (marker) {
          batch.push(marker);
        }
      }

      markerClusterGroup.addLayers(batch);

      if (endIndex < data.length) {
        // Procesar siguiente lote de forma asíncrona
        setTimeout(() => processBatch(endIndex, batchSize), 10);
      } else {
        // Todos los marcadores procesados
        map.addLayer(markerClusterGroup);
        
        // Ajustar vista
        if (markerClusterGroup.getLayers().length > 0) {
          map.fitBounds(markerClusterGroup.getBounds().pad(0.05));
        }
      }
    };

    // Iniciar procesamiento
    processBatch(0);

    // Listener para zoom
    map.on('zoomend', () => {
      setCurrentZoom(map.getZoom());
    });

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isLoaded, data, showClustering]);

  const toggleClustering = () => {
    if (!mapInstanceRef.current || !clusterGroupRef.current) return;

    const map = mapInstanceRef.current;
    const clusterGroup = clusterGroupRef.current;

    if (showClustering) {
      // Desactivar clustering - mostrar marcadores individuales
      map.removeLayer(clusterGroup);
      const markers = clusterGroup.getLayers();
      markers.forEach(marker => marker.addTo(map));
    } else {
      // Activar clustering
      const layers = [];
      map.eachLayer(layer => {
        if (layer instanceof window.L.CircleMarker) {
          layers.push(layer);
          map.removeLayer(layer);
        }
      });
      clusterGroup.clearLayers();
      clusterGroup.addLayers(layers);
      map.addLayer(clusterGroup);
    }

    setShowClustering(!showClustering);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando mapa y plugins...</p>
          <p className="text-xs text-gray-500 mt-2">Preparando {data.length} puntos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Controles */}
      <div className="mb-4 flex gap-4 items-center bg-white p-3 rounded-lg shadow">
        <button
          onClick={toggleClustering}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            showClustering 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showClustering ? 'Desactivar Clustering' : 'Activar Clustering'}
        </button>
        
        <div className="text-sm text-gray-600">
          <span className="font-medium">Zoom actual:</span> {currentZoom} | 
          <span className="font-medium"> Puntos:</span> {data.length.toLocaleString()}
        </div>
      </div>

      {/* Mapa */}
      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <div ref={mapRef} className="w-full h-full" />
      </div>
      
      {/* Leyenda optimizada */}
      <div className="mt-4 p-3 bg-white rounded-lg shadow">
        <h4 className="text-sm font-semibold mb-2 text-gray-700">Leyenda de Partidos:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
          {Object.entries(partyColors).filter(([party]) => party !== 'default').map(([party, color]) => (
            <div key={party} className="flex items-center gap-1">
              <div 
                className="w-3 h-3 rounded-full border border-white shadow-sm" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="text-gray-600">{party}</span>
            </div>
          ))}
        </div>
        
        {showClustering && (
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              💡 Los clusters agrupan puntos cercanos. El color indica el partido predominante en el grupo.
              Zoom &gt; 15 desactiva clustering automáticamente.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { ColoniasMap };