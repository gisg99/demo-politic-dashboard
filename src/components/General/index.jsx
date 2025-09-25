import React from 'react'
import { Card, DonutChart2, ElectoralMap, SimpleFunnelChart, HeatmapComponent } from '../../components'

/** Paleta fija para los buckets de edad */
const EDAD_COLORS = {
  '18-25': '#E0E0E0',
  '26-34': '#BDBDBD',
  '35-44': '#FFC107',
  '45-54': '#FFB74D',
  '55-64': '#FF9800',
  '65+':   '#FF6B35',
}

/** Orden canónico de buckets */
const EDAD_ORDER = ['18-25', '26-34', '35-44', '45-54', '55-64', '65+']

/** "25.00%" -> 25 (number) */
function parsePercent(val) {
  if (typeof val === 'number') return val
  if (typeof val === 'string') {
    const n = Number(val.replace('%', '').trim())
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

/**
 * Normaliza datos de edad a la forma esperada por DonutChart2.
 * Soporta:
 *   - [{ rango:'18-25', porcentaje:'25.00%' }, ...]  (API)
 *   - [{ range:'18-25', value: 25 }, ...]
 *   - [{ label:'18-25', value: 25 }, ...]
 */
function normalizeEdad(edadesRaw) {
  const items = Array.isArray(edadesRaw) ? edadesRaw : []
  const byBucket = {}
  for (const it of items) {
    const key = it?.range ?? it?.label ?? it?.rango
    const rawVal = it?.value ?? it?.porcentaje
    const val = parsePercent(rawVal) // convierte "25.00%" -> 25
    if (key && EDAD_ORDER.includes(key)) {
      byBucket[key] = (byBucket[key] || 0) + val
    }
  }
  const hasAny = Object.values(byBucket).some(v => v > 0)
  if (!hasAny) return null

  return EDAD_ORDER.map(k => {
    const value = byBucket[k] || 0 // ya es porcentaje
    const pct = Math.round(value)
    return { label: `${k} (${pct}%)`, value, color: EDAD_COLORS[k] }
  })
}

/** Barras de intereses (usa 0 si falta) */
function makeIntereses(dataGeneral) {
  const getProm = idx => {
    const v = Number(dataGeneral?.[idx]?.promedio)
    return Number.isFinite(v) ? Math.max(0, Math.min(100, v * 20)) : 0
  }
  return [
    { label: 'Salud',           count: getProm(0) },
    { label: 'Seguridad',       count: getProm(1) },
    { label: 'Educación',       count: getProm(2) },
    { label: 'Transporte',      count: getProm(3) },
    { label: 'Economía',        count: getProm(4) },
    { label: 'Medio ambiente',  count: getProm(5) },
  ]
}

function General({
  data,                         // percepcion.filter(... "General")
  edades,                       // vendrá del IndicadoresContext (API o normalizado)
  genero,                       // opcional desde context
  nivelSocioeconomico,          // opcional desde context
  heatmapData: heatmapFromCtx,  // opcional desde context
  loadingEdades,                // opcional
  errorEdades,                  // opcional
}) {
  // ===== Fallbacks (mock) =====
  const fallbackHeatmap = [
    [20.6748, -103.344, '100'],
    [20.6782, -103.340, '85'],
    [20.6711, -103.350, '70'],
    [20.6699, -103.346, '60'],
    [20.6711, -103.350, '70'],
    [20.6699, -103.346, '60'],
    [20.6760, -103.349, '50'],
    [20.6752, -103.341, '45'],
    [20.6730, -103.343, '30'],
  ]

  const fallbackNSE = [
    { label: 'A/B', value: 10, color: '#9CA3AF' },
    { label: 'C+',  value: 25, color: '#FED7AA' },
    { label: 'C',   value: 30, color: '#FDBA74' },
    { label: 'C-',  value: 20, color: '#FB923C' },
    { label: 'D/E', value: 15, color: '#F97316' },
  ]

  const fallbackGenero = [
    { label: 'Masculino', value: 64.6, color: '#FFB74D' },
    { label: 'Femenino',  value: 35.4, color: '#FF8A65' },
  ]

  const fallbackEdadRaw = [
    { label: '18-25', value: 12, color: EDAD_COLORS['18-25'] },
    { label: '26-34', value: 18, color: EDAD_COLORS['26-34'] },
    { label: '35-44', value: 25, color: EDAD_COLORS['35-44'] },
    { label: '45-54', value: 20, color: EDAD_COLORS['45-54'] },
    { label: '55-64', value: 15, color: EDAD_COLORS['55-64'] },
    { label: '65+',   value: 10, color: EDAD_COLORS['65+'] },
  ]
  const fallbackEdad = (() => {
    const total = fallbackEdadRaw.reduce((s, it) => s + it.value, 0) || 1
    return fallbackEdadRaw.map(it => ({
      ...it,
      label: `${it.label} (${Math.round((it.value / total) * 100)}%)`,
    }))
  })()

  // ===== Datos efectivos (context -> si no, fallback) =====
  const heatmapData = Array.isArray(heatmapFromCtx) && heatmapFromCtx.length ? heatmapFromCtx : fallbackHeatmap
  const generoData  = Array.isArray(genero) && genero.length ? genero : fallbackGenero
  const nivelSocioeconomicoData = Array.isArray(nivelSocioeconomico) && nivelSocioeconomico.length
    ? nivelSocioeconomico
    : fallbackNSE

  // edades puede venir ya normalizado o crudo del API; funciona en ambos casos
  const edadDataFromApi = normalizeEdad(edades)
  const edadData = edadDataFromApi && edadDataFromApi.length ? edadDataFromApi : fallbackEdad

  const intereses = makeIntereses(data)

  return (
    <div className='flex flex-col w-full gap-2 lg:gap-4'>
      {/* Primera fila - Total General */}
      <div className='flex gap-2 lg:gap-3 w-full'>
        <div className='w-full'>
          <Card title="Total General">
            <div className='flex flex-col w-full items-end'>
              <div className='w-[79%] pr-2 lg:pr-4 flex justify-between'>
                <h1 className='border-0 p-0.5 shadow-gray-500 hidden sm:block shadow-sm text-xs lg:text-base'>Positivo</h1>
                <h1 className='border-0 p-0.5 shadow-gray-500 hidden sm:block shadow-sm text-xs lg:text-base'>Negativo</h1>
              </div>
              {intereses.map((tema, index) => (
                <div key={index} className='w-full flex flex-col mb-3'>
                  {/* Móvil */}
                  <div className='block lg:hidden'>
                    <div className='flex justify-between items-center mb-1 px-2'>
                      <h1 className='text-gray-500 text-sm'>{tema.label}</h1>
                      <span className='text-gray-400 text-xs font-semibold'>{Math.round(tema.count)}%</span>
                    </div>
                    <div className='w-full h-3 rounded-xs px-2'>
                      <div
                        className='w-full h-full rounded-xs'
                        style={{
                          background: `linear-gradient(90deg,
                            rgb(255,145,77) 0%,
                            rgb(255,196,160) ${tema.count}%,
                            rgba(215,215,215,0.8) ${tema.count}%,
                            rgba(215,215,215,0.8) 100%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Desktop */}
                  <div className='hidden lg:block'>
                    <div className='flex group gap-2 w-full items-center justify-end px-3'>
                      <h1 className='text-gray-500 mr-12 text-lg'>{tema.label}</h1>
                      <div
                        className='w-[75%] h-4 rounded-xs'
                        style={{
                          background: `linear-gradient(90deg,
                            rgb(255,145,77) 0%,
                            rgb(255,196,160) ${tema.count}%,
                            rgba(215,215,215,0.8) ${tema.count}%,
                            rgba(215,215,215,0.8) 100%)`,
                        }}
                      >
                        <div className='text-gray-400 text-sm font-semibold w-min relative -top-0.5 -left-13 px-2 rounded-lg group-hover:block'>
                          {Math.round(tema.count)}%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Segunda fila - Demográficos y Mapa */}
      <div className='flex flex-col lg:flex-row gap-2 lg:gap-3 w-full'>
        <div className='w-full lg:w-[60%] flex flex-col gap-2 lg:gap-3'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3'>
            <Card title="Edad">
              {/* puedes usar loading/error si los pasas */}
              {/* {loadingEdades ? <div className="p-4">Cargando...</div> : null}
                  {errorEdades ? <div className="p-4 text-red-500">{errorEdades}</div> : null} */}
              <DonutChart2 title="Edad" data={edadData} type="default" />
            </Card>
            <Card title="Género">
              <DonutChart2 title="Género" data={generoData} type="gender" />
            </Card>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3'>
            <Card title="Sección electoral">
              <ElectoralMap />
            </Card>
            <Card title="Nivel Socioeconómico">
              <SimpleFunnelChart
                data={nivelSocioeconomicoData}
                showPercentage={true}
                sortData={true}
                maintainColorOrder={true}
              />
            </Card>
          </div>
        </div>
        <div className='w-full lg:w-[40%]'>
          <Card title="Mapa de calor">
            <HeatmapComponent data={heatmapData} />
          </Card>
        </div>
      </div>
    </div>
  )
}

export { General }
