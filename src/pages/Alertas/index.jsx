import React from 'react'
import { Layout, Card } from '../../components';
import { BiSolidBellRing } from "react-icons/bi";
import { AlertCard } from './AlertCard';

function Alertas() {

  const alertas = [
    {
      type: "media",
      alerts: ["Percepción de inseguridad aumentó 18% en la zona norte en los últimos 5 días.",
      "Salud pública recibió calificaciones menores a 3 (de 5) en el 72% de las encuestas recientes.",
      "Educación cae al 4° lugar en prioridad ciudadana, desplazada por 'economía'.",
      "Reputación de PL vinculada negativamente con servicios de transporte público en zona centro.",
      "Brote de conversación crítica hacia el sistema de salud coincide con baja en percepción positiva."]
    },
    {
      type: "alta",
      alerts: ["Concentración de menciones negativas hacia PL detectada en Sección 2045.",
      "Aumento del 22% en visitas a zona históricamente opositora en últimos 3 días."]
    },
    {
      type: "media",
      alerts: ["Picos de conexión a redes sociales entre 7:00 y 9:00 am en zonas populares: ideal para mensajes cortos.",
      "Desplazamiento masivo hacia mitin de MC detectado por pings de WiFi en zona centro.",
      "Disminución de conexión en zona sur podría reflejar baja exposición digital de campaña."]
    },
    {
      type: "alta",
      alerts: ["Concentración de menciones negativas hacia PL detectada en Sección 2045.",
      "Aumento del 22% en visitas a zona históricamente opositora en últimos 3 días."]
    },
    {
      type: "baja",
      alerts: ["Intención de voto por PL cayó 3.5% en distrito 09 esta semana.",
      "Alta volatilidad: 40% de indecisos en zona 3 sin preferencia partidista clara."]
    },
    {
      type: "baja",
      alerts: ["Eventos de alta movilidad sin cobertura de PL en zonas clave de oposición.",
      "Discurso crítico en redes coincide con caída de intención de voto en jóvenes (18–29).",
      "Zona con aumento en visitas físicas pero nula interacción digital: oportunidad para contacto territorial."]
    },
  ]

  return (
    <Layout>
      <div className='flex flex-col w-full h-full items-center py-2 sm:py-4 px-3 sm:px-6 md:px-8 lg:px-12 gap-3 sm:gap-4'>
        {/* Header con leyenda de prioridades */}
        <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0'>
          {/* Leyenda de prioridades - Responsive */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-6 md:gap-8 w-full sm:w-auto'>
            <div className='flex gap-2 sm:gap-4 items-center'>
              <BiSolidBellRing className='text-white text-2xl sm:text-3xl bg-amber-500 p-1 sm:p-1.5 rounded-full flex-shrink-0'/>
              <p className='text-sm sm:text-base'>Prioridad Alta</p>
            </div>
            <div className='flex gap-2 sm:gap-4 items-center'>
              <BiSolidBellRing className='text-white text-2xl sm:text-3xl bg-yellow-400 p-1 sm:p-1.5 rounded-full flex-shrink-0'/>
              <p className='text-sm sm:text-base'>Prioridad Media</p>
            </div>
            <div className='flex gap-2 sm:gap-4 items-center'>
              <BiSolidBellRing className='text-white text-2xl sm:text-3xl bg-gray-400 p-1 sm:p-1.5 rounded-full flex-shrink-0'/>
              <p className='text-sm sm:text-base'>Prioridad Baja</p>
            </div>
          </div>
          
          {/* Botón de descarga responsive */}
          <button className='w-full sm:w-auto bg-[#acb8bf] px-3 sm:px-4 py-1.5 sm:py-0.5 cursor-pointer text-white font-medium rounded-full hover:bg-tertiary transition-colors text-sm sm:text-base'>
            Descargar
          </button>
        </div>

        {/* Grid de alertas responsive */}
        <div className='flex-1 flex flex-col gap-3 sm:gap-4 w-full'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4'>
            {alertas.map((alert, index) => (
              <AlertCard 
                key={index} 
                type={alert.type} 
                double={index <= 3 ? index % 2 === 0 : index % 2 === 1}
                index={index}
              >
                  {alert.alerts.map((item, i) => (
                    <li key={i} className='mb-2 sm:mb-1 last:mb-0'>{item}</li>
                  ))}
              </AlertCard>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Alertas