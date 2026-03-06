export function parseFuelData(jsonData: any) {
  // 1. Límites globales de la flota
  const globalFirstStr = jsonData.metadata?.data_period?.first_refuel;
  const globalLastStr = jsonData.metadata?.data_period?.last_refuel;
  
  const gFirstDate = new Date(globalFirstStr).getTime();
  const gLastDate = new Date(globalLastStr).getTime();

  // Años globales para el Dashboard
  const globalYears = parseFloat(((gLastDate - gFirstDate) / (1000 * 3600 * 24 * 365.25)).toFixed(1));

  const processedVehicles = jsonData.vehicles.map((v: any) => {
    const stats = v.total_statistics;
    
    // 2. Fechas exactas y deterministas desde el JSON
    const vFirstStr = stats.first_refuel_date;
    const vLastStr = stats.last_refuel_date;
    
    const vFirstDate = new Date(vFirstStr).getTime();
    const vLastDate = new Date(vLastStr).getTime();

    // 3. Cálculo de años (1 Decimal) basado EXACTAMENTE en sus fechas de repostaje
    let vYearsOfData = (vLastDate - vFirstDate) / (1000 * 3600 * 24 * 365.25);
    vYearsOfData = parseFloat(vYearsOfData.toFixed(1));
    
    // Seguridad matemática por si un coche tiene un solo repostaje el mismo día
    if (vYearsOfData <= 0) vYearsOfData = 0.1; 

    // 4. Velocidad media directa (si no existe, será undefined/null)
    const realAvgSpeed = stats.lifetime_average_speed_km_per_h || null;

    return {
      ...v,
      speedRanges: [ // Datos visuales por defecto para el gráfico
        { range: '0-30', avg: 10.5 }, { range: '30-60', avg: 7.2 },
        { range: '60-90', avg: 5.8 }, { range: '90-120', avg: 6.5 }, { range: '120+', avg: 8.2 },
      ],
      total_statistics: {
        ...stats,
        yearsOfData: vYearsOfData,
        average_speed_km_per_h: realAvgSpeed
        // first_refuel_date y last_refuel_date ya vienen en el objeto, no hace falta tocarlos
      }
    };
  });

  return {
    metadata: { 
      ...jsonData.metadata, 
      firstRefuel: globalFirstStr, 
      lastRefuel: globalLastStr, 
      yearsOfData: globalYears 
    },
    globalStats: jsonData.global_statistics.all_vehicles,
    vehicles: processedVehicles
  };
}