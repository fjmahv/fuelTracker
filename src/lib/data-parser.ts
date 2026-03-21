export function parseFuelData(jsonData: any) {
  const globalFirstStr = jsonData.metadata?.data_period?.first_refuel;
  const globalLastStr = jsonData.metadata?.data_period?.last_refuel;
  
  const gFirstDate = new Date(globalFirstStr).getTime();
  const gLastDate = new Date(globalLastStr).getTime();
  const globalYears = parseFloat(((gLastDate - gFirstDate) / (1000 * 3600 * 24 * 365.25)).toFixed(1));

  const processedVehicles = jsonData.vehicles.map((v: any) => {
    const stats = v.total_statistics;
    const comparison = stats.recent_refuels_comparison || [];
    
    // 1. Cálculos para el Widget de Comparativa Reciente
    const latest = comparison[comparison.length - 1] || {};
    const last3 = comparison.slice(-3);
    
    const avg3 = {
      consumption: last3.length > 0 ? parseFloat((last3.reduce((a: any, b: any) => a + b.consumption, 0) / last3.length).toFixed(2)) : 0,
      speed: last3.length > 0 ? parseFloat((last3.reduce((a: any, b: any) => a + b.speed, 0) / last3.length).toFixed(1)) : 0
    };

    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const lastMonthName = latest.date ? monthNames[new Date(latest.date).getMonth()] : "Mes";

    // 2. Fechas y años deterministas
    const vFirstDate = new Date(stats.first_refuel_date).getTime();
    const vLastDate = new Date(stats.last_refuel_date).getTime();
    let vYearsOfData = parseFloat(((vLastDate - vFirstDate) / (1000 * 3600 * 24 * 365.25)).toFixed(1)) || 0.1;

    const speedData = stats.consumption_by_speed_range
      ?.filter((item: any) => item.average_consumption > 0) || [];

    return {
      ...v,
      speedData,
      // Inyectamos el objeto procesado para la UI
      recentComparison: {
        latest: { 
          consumption: latest.consumption, 
          speed: latest.speed,
          date: latest.date 
        },
        avg3,
        historical: {
          consumption: latest.historical_month_avg_consumption,
          speed: latest.historical_month_avg_speed,
          monthName: lastMonthName
        }
      },
      total_statistics: {
        ...stats,
        yearsOfData: vYearsOfData,
        average_speed_km_per_h: stats.lifetime_average_speed_km_per_h || null
      }
    };
  });

  return {
    metadata: { ...jsonData.metadata, firstRefuel: globalFirstStr, lastRefuel: globalLastStr, yearsOfData: globalYears },
    globalStats: jsonData.global_statistics.all_vehicles,
    vehicles: processedVehicles
  };
}